import * as z from "zod";

export const LoginScheme = z.object({
  email: z.string().email({ message: "Email is Required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
