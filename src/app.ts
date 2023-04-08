import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import { userSchema } from "./modules/user/user.schema";
import userRoutes from "./modules/user/user.route";
import { productSchemas } from "./modules/product/product.schema";

export const server = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}
server.register(require("@fastify/jwt"), {
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
  try {
    await server.listen(3000, "0.0.0.0");
    console.log("Server ready at http://localhost:3000");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
