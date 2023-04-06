import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);
  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash }, // we have to specify a type on the inputs when we create them
  });

  return user;
}

export async function findUserByEmail(email: String) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
