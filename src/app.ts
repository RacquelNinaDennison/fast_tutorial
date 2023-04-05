import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyJwt from "fastify-jwt";
import { userSchema } from "./modules/user/user.schema";
import userRoutes from "./modules/user/user.route";

const server = Fastify();
server.register(fastifyJwt, {
  secret: "ghshshhsbhdbyajalsndvbhaj",
});
// server.decorate(
//   "authenticate",
//   async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//       await request.jwtVerify();
//     } catch (e) {
//       return reply.send(e);
//     }
//   }
// );
server.get("/heathcheck", async function () {
  return { status: "OK" };
});

async function main() {
  for (const schema of userSchema) {
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
