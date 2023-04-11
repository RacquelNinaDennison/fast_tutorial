import { create } from "domain";
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  name: z.string(),
};
const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});
// the response that the user gets
export const CreateUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});
export const { schemas: userSchema, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    CreateUserResponseSchema,
    loginSchema,
    loginResponseSchema,
  },
  { $id: "UserSchema" }
);

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
