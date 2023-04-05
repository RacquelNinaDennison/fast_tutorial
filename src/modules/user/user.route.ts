import { FastifyInstance } from "fastify";
import { registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("CreateUserResponseSchema"),
        },
      },
    },
    registerUserHandler
  ); //listening on the / route
}

export default userRoutes;
