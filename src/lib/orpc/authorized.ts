import { base } from "./orpc.headers";
import { authMiddleware } from "./orpc.middleware";

export const authorized = base.use(authMiddleware);
