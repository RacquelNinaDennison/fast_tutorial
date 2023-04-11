import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductInput } from "./product.schema";
import { createProduct } from "./product.sevice";

export async function createProductHandler(
  request: FastifyRequest<{
    Body: CreateProductInput;
  }>,
  reply: FastifyReply
) {
  const product = await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });

  return product;
}
