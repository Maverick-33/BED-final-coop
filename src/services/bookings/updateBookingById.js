import { PrismaClient } from '@prisma/client'
import NotFoundError from '../../errors/NotFoundError.js'

const updateBookingById = async (id, updatedBooking) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.updateMany({ 
    where: {
      id
    },
    data: updatedBooking
  });

  if (!booking || booking.count === 0) {
    throw new NotFoundError('Booking', id)
  }

  return {
    message: `Booking with id ${id} was updated!` 
  }
};

export default updateBookingById;