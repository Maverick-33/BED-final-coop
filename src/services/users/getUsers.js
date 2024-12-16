import { PrismaClient } from '@prisma/client'

const getUsers =  async (username, email) => {
    const prisma = new PrismaClient({
        omit: {
          user: {
            password: true,
          },
        },
      });
  const usersWithoutPasswords = await prisma.user.findMany({
    where: {
      ...(username && { username: { contains: username } }),
      ...(email && { email: { contains: email } }),
  }
  });
  return usersWithoutPasswords;
    
};

export default getUsers;