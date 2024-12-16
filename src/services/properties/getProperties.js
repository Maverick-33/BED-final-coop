import { PrismaClient } from '@prisma/client'

const getProperties =  async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient()
  const priceFloat = parseFloat(pricePerNight)

  return prisma.property.findMany({
    
        where: {
            ...(location && { location: { contains: location } }),
            ...(pricePerNight && { pricePerNight: { equals: priceFloat } }),
            ...(amenities && { amenities: {contains: amenities} })
          }
        });
  }


export default getProperties