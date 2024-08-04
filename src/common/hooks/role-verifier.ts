import { useEffect, useState } from "react";
import { UserRoleType } from "common/enums/user-roles";
import { useSharedStorage } from "common/state-management/shared-storage";

/**
 * Expands the provided set of authorized roles to include parent roles.
 *
 * @example // returns [UserRoleType.DivisionVicePresident, UserRoleType.OperationsCoordinator , UserRoleType.Administrator, UserRoleType.PropertyAccountant]
 * expandRolesUpward(UserRoleType.DivisionVicePresident, UserRoleType.PropertyAccountant)
 */
const expandRolesUpward = (...initialRoles: UserRoleType[]): UserRoleType[] => {
  const set = new Set<UserRoleType>();
  for (const role of initialRoles) {
    const ancestorRoles = parentRoleMapping[role];
    ancestorRoles.forEach((role) => set.add(role));
    set.add(role);
  }

  return [...set];
};

/**
 * Expands the provided roles to include child roles
 *
 * @example // returns [UserRoleType.DistrictTeamLead, UserRoleType.StoreManager]
 * expandRolesDownward(UserRoleType.DistrictTeamLead)
 */
const expandRolesDownward = (...initialRoles: UserRoleType[]): UserRoleType[] => {
  const set = new Set<UserRoleType>();

  for (const role of initialRoles) {
    const descendantRoles = Object.entries(parentRoleMapping)
      .filter(([, ancestorRoles]) => ancestorRoles.includes(role))
      .map(([roleKey]) => roleKey) as UserRoleType[];
    descendantRoles.forEach((role) => set.add(role));
    set.add(role);
  }

  return [...set];
};

const getAllRolesWithExclusions = (
  rolesToExclude: UserRoleType[] = [],
  excludeChildRoles = false
): UserRoleType[] => {
  const allRoles = Object.keys(parentRoleMapping) as UserRoleType[];

  const allExcludedRoles = excludeChildRoles
    ? expandRolesDownward(...rolesToExclude)
    : rolesToExclude;

  return allRoles.filter((role) => !allExcludedRoles.includes(role));
};

// maps role to parent roles
const parentRoleMapping: Record<UserRoleType, UserRoleType[]> = {
  [UserRoleType.Administrator]: [],
  [UserRoleType.Developer]: [],
  [UserRoleType.ReadOnly]: [UserRoleType.Administrator],
};

export enum RoleSet {
  Administrator = "administrator",
  AdminPages = "adminPages",
  Developer = "Developer",
  ReadOnly = "ReadOnly",
  CanCreateProject = "CanCreateProject",
  CanUpdateProject = "CanUpdateProject",
  CanRemoveProject = "CanRemoveProject",
  CanCreateUser = "CanCreateUser",
  CanUpdateUser = "CanUpdateUser",
  CanRemoveUser = "CanRemoveUser",
}

// expand the role set to include all roles that are technically authorized
const roleSets = {
  [RoleSet.AdminPages]: expandRolesUpward(UserRoleType.ReadOnly),
  [RoleSet.Administrator]: [UserRoleType.Administrator],
  [RoleSet.ReadOnly]: [UserRoleType.ReadOnly],
  [RoleSet.CanCreateProject]: getAllRolesWithExclusions([UserRoleType.ReadOnly]),
  [RoleSet.CanUpdateProject]: getAllRolesWithExclusions([UserRoleType.ReadOnly]),
  [RoleSet.CanRemoveProject]: getAllRolesWithExclusions([UserRoleType.ReadOnly]),
  [RoleSet.CanCreateUser]: getAllRolesWithExclusions([UserRoleType.ReadOnly]),
  [RoleSet.CanUpdateUser]: getAllRolesWithExclusions([UserRoleType.ReadOnly]),
  [RoleSet.CanRemoveUser]: getAllRolesWithExclusions([UserRoleType.ReadOnly]),
};

/**
 * Use to check if the currently logged in user has a certain role or has access to certain features
 * @param roleSet the roleSet to check against
 * @returns true if the user's role is in the roleSet, false otherwise
 */
export const useRoleVerifier = (roleSet: RoleSet): boolean => {
  const user = useSharedStorage((state) => state.user);

  const authorizedRoles = roleSets[roleSet as keyof typeof roleSets];

  const [isInRole, setIsInRole] = useState(
    authorizedRoles?.some((role) => user?.rol.includes(role))
  );

  useEffect(() => {
    const isAuthorized = authorizedRoles.some((role) => user?.rol.includes(role));
    setIsInRole(isAuthorized);
  }, [user, authorizedRoles]);

  return isInRole;
};
