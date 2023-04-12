import * as z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productInput = {
  title: z.string(),
  price: z.number(),
  content: z.string().optional(),
};

const productGenerated = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
};
export const createProductSchema = z
  .object({
    title: z.string(),
    price: z.number(),
    content: z.string().optional(),
  })
  .required()
  .refine((data) => Object.keys(data).length === 3, {
    message: "All fields are required",
  });
export const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchemas } = buildJsonSchemas(
  {
    createProductSchema,
    productResponseSchema,
  },
  { $id: "ProductsSchema" }
);
