export const UserValidator = {
  name: (userName: string): string[] => {
    const errors: string[] = [];
    if (!userName) errors.push("Username is required");
    if (userName.length > 50) errors.push("Username limited to 50 characters");
    return errors;
  },
  lastName: (lastName: string): string[] => {
    const errors: string[] = [];
    if (!lastName) errors.push("Lastname is required");
    if (lastName.length > 50) errors.push("Lastname limited to 50 characters");
    return errors;
  },
  rol: (rol: string): string[] => {
    const errors: string[] = [];
    if (!rol) errors.push("Role is required");
    return errors;
  },
  technologies: (technologies: string): string[] => {
    const errors: string[] = [];
    if (!technologies) errors.push("Technologies are required");
    return errors;
  },
  division: (division: string): string[] => {
    const errors: string[] = [];
    if (!division) errors.push("Division is required");
    return errors;
  },
};
