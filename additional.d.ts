import * as IronSession from "iron-session";
import { TelegramUser } from "types/User";

declare module "iron-session" {
  interface IronSessionData {
    user?: TelegramUser;
  }
}

declare global {
  interface Window {
    TelegramNameSpace: {
      onAuth: (user) => void;
    };
  }
}
