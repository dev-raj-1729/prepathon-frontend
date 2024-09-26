import { AUTH_DOMAIN } from "@/config/endpoints";
import { AppUser } from "@/types/user";
import axios from "axios";

export interface AppAuth {
  currentUser: null | AppUser;
  access_token: null | string;
}

export const appAuth: AppAuth = {
  currentUser: null,
  access_token: null,
};

let onChangeCallback: null | (() => void) = null;

export function updateApp(newAppAuth: AppAuth) {
  appAuth.access_token = newAppAuth.access_token;
  appAuth.currentUser = newAppAuth.currentUser;

  onChangeCallback?.();
  if (localStorage) {
    localStorage.setItem("appAuth", JSON.stringify(appAuth));
  }
}
export async function AppAuthInit() {
  if (localStorage) {
    const authJson = localStorage.getItem("appAuth");
    if (authJson) {
      const persistedAppAuth: AppAuth = JSON.parse(authJson);
      appAuth.access_token = persistedAppAuth.access_token;
      appAuth.currentUser = persistedAppAuth.currentUser;
    }
  }
}

export async function signInWithTOTP(totp: string): Promise<string> {
  const access_token = (
    await axios.get<{ access_token: string }>(AUTH_DOMAIN + "/verify_2fa", {
      headers: { totp_token: totp },
    })
  ).data.access_token;
  const payload = access_token.split(".")[1];
  const token_json = JSON.parse(window.atob(payload));

  updateApp({ currentUser: token_json.app_user, access_token: access_token });

  return access_token;
}

export function appAuthSignOut() {
  updateApp({ currentUser: null, access_token: null });
  if (localStorage) {
    localStorage.removeItem("appAuth");
  }
}

export function getAccessToken() {
  return appAuth.access_token ?? "";
}

export function onAppAuthStateChange(callback: () => void) {
  onChangeCallback = callback;
}

AppAuthInit();
