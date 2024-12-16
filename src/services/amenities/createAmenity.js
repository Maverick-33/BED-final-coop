import { PrismaClient } from '@prisma/client'
import BadRequest from '../../errors/badRequest.js'

const createAmenity = async (name) => {
  const prisma = new PrismaClient()

  if (!name || name.count === 0) {
    throw new BadRequest()
  }

  return prisma.amenity.create({
    data: {
      name
    }
  })
}

export default createAmenity;