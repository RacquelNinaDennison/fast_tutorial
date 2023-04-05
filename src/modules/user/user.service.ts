import prisma from "../../utils/prisma";

export async function createUser(input){
    const user = await prisma.user.create{
        data: input, // we have to specify a type on the inputs when we create them
    }
}