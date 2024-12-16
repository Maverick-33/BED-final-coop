import { PrismaClient } from '@prisma/client'
import BadRequest from '../../errors/badRequest.js'

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient()
  if (!userId || !propertyId || !rating || !comment) {
    throw new BadRequest()
  }

  return prisma.review.create({
    data: {
        userId, 
        propertyId, 
        rating, 
        comment
    }
  })
}

export default createReview;