import { PrismaClient } from '@prisma/client'

const getHosts =  async (name) => {
    const prisma = new PrismaClient({
        omit: {
          host: {
            password: true,
          },
        },
      });
  const hostsWithoutPasswords = await prisma.host.findMany({
    where: {
        name
    }
  });
  return hostsWithoutPasswords;
    
};

export default getHosts;