const { ReactRouteId } = window["environment-config" as keyof typeof window] ?? {};
export const basename = `${ReactRouteId ? "/" + ReactRouteId + "/" : import.meta.env?.BASE_URL ?? "/"}`;
