import { EnvironmentModel, Environments } from "common/constants/environment-constants";

/**
 * Wrapper for the getEnvironmentFromUrlString method used to provide the
 * current browser url to the method.
 * @see GetEnvironmentFromUrlString
 */
export const GetEnvironmentFromLocationUrl = (): EnvironmentModel => {
  return GetEnvironmentFromUrlString(window?.location?.href);
};

/**
 * Returns an environment using the url by attempting to find it within a url string
 * matching the format https://{env}.oldev.ol.com
 *
 * If no match is found it will return Localhost as the environment
 */
export const GetEnvironmentFromUrlString = (url: string): EnvironmentModel => {
  const subdomain = url.substring(url.indexOf("//") + 2, url.indexOf(".")); // Get the subdomain from the URL
  const environment =
    Environments[subdomain as keyof typeof Environments] || Environments.localhost;
  return environment;
};

export const GetOlsScopeFromWindows = (): string => {
  const { OlsScope, Environment } = window["environment-config" as keyof typeof window] ?? {};

  if (Environment === "dev" || Environment === "local") {
    const olsEnvironment = window.location.origin.split("//")[1].split(".")[0];
    const scopeMap = JSON.parse(OlsScope ?? "");
    const olsScope = scopeMap[olsEnvironment] ?? scopeMap["default"];
    return olsScope;
  }

  return OlsScope;
};
