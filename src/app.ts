import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import { userSchema } from "./modules/user/user.schema";
import userRoutes from "./modules/user/user.route";
import { productSchemas } from "./modules/product/product.schema";
import productsRoutes from "./modules/product/product.route";
import fastifyJwt, { FastifyJWT } from "@fastify/jwt";

export const server = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}
server.register(fastifyJwt, {
  secret: "superset", // random charaters for secret
  //register the plug in
});

server.get("/heathcheck", async function () {
  return { status: "OK" };
});

async function main() {
  for (const schema of [...userSchema, ...productSchemas]) {
    server.addSchema(schema); // adding before we register the rputes
  }
  server.register(userRoutes, { prefix: "api/users" });
  server.register(userRoutes, { prefix: "api/products" });
  try {
    await server.listen(3000, "0.0.0.0");
    console.log("Server ready at http://localhost:3000");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
