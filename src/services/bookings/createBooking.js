import { PrismaClient } from '@prisma/client'
import BadRequest from '../../errors/badRequest.js'

const createBooking = async (userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus) => {
  const prisma = new PrismaClient()
  if (!userId || !propertyId || !checkinDate || !checkoutDate || !numberOfGuests || !totalPrice || !bookingStatus) {
    throw new BadRequest()
  }
  
  return prisma.booking.create({
    data: {
        userId, 
        propertyId, 
        checkinDate, 
        checkoutDate, 
        numberOfGuests, 
        totalPrice, 
        bookingStatus
    }
  })
}

export default createBooking;