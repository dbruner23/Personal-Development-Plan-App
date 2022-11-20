// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { useractionRouter } from "./useraction";
import { overallfeedbackRouter } from "./overallfeedback";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  useraction: useractionRouter,
  overallfeedback: overallfeedbackRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
