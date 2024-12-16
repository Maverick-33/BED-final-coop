import { PrismaClient } from '@prisma/client'
import BadRequest from '../../errors/badRequest.js'

const createProperty = async (title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating) => {
  const prisma = new PrismaClient()
  if (!title || !description || !location || !pricePerNight || !bedroomCount || !bathRoomCount || !maxGuestCount || !hostId || !rating) {
    throw new BadRequest()
  }
  

  return prisma.property.create({
    data: {
        title, 
        description, 
        location, 
        pricePerNight, 
        bedroomCount, 
        bathRoomCount, 
        maxGuestCount, 
        hostId, 
        rating
    }
  })
}

export default createProperty;