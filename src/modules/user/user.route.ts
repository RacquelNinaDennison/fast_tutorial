import { FastifyInstance } from "fastify";
import { registerUserHandler } from "./user.controller";

async function userRoutes(server: FastifyInstance) {
  server.post("/", registerUserHandler); //listening on the / route
}

export default userRoutes;
