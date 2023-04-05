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
const CreateUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

export const { schemas: userSchema, $ref } = buildJsonSchemas({
  createUserSchema,
  CreateUserResponseSchema,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
