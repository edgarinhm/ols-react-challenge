export interface EnvironmentModel {
  code: string;
  name: string;
  type: "development" | "staging" | "production";
}

/**
 * Key value pair of environment information
 * KEY: matches the env part of the app url https://{env}.oldev.ol.com
 * VALUE: contains information specific to the environment
 */
export const Environments = {
  localhost: {
    code: "localhost",
    name: "Local",
    type: "development",
  },
  edgarinhm: {
    code: "github",
    name: "Staging-edgarinhm",
    type: "staging",
  },
  github: {
    code: "github",
    name: "Staging-Github",
    type: "staging",
  },
  prod: {
    code: "prod",
    name: "Ol",
    type: "production",
  },
  uat: {
    code: "uat",
    name: "UAT",
    type: "staging",
  },
} as const;
