import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productInput = {
  title: z.string(),
  price: z.string(),
  content: z.string().optional(),
};

const productGenerated = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const createProductSchema = z.object({
  ...productInput,
});
const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});
//const productResponseSchema = z.object({}); // single point end point
const productsResponseSchema = z.array(productResponseSchema);
export type CreateProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchemas } = buildJsonSchemas({
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
});
