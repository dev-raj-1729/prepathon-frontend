export const publicRoutes = ["/login", "/signup"];
export const unverifiedEmailRoutes = [...publicRoutes, "/verify-email"];
export const non2faRoutes = [
  ...unverifiedEmailRoutes,
  "/twoFactor/login",
  "/twoFactor/register",
];
