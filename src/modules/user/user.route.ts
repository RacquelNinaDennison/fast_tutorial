import { FastifyInstance } from "fastify";
import { registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";
import { loginHandler } from "../user/user.controller";

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

  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          201: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );
}

export default userRoutes;
