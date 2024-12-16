import { PrismaClient } from '@prisma/client'
import NotFoundError from '../../errors/NotFoundError.js'

const updateAmenityById = async (id, name) => {
  const prisma = new PrismaClient();
  const existingAmenity = await prisma.amenity.findUnique({ where: { id } });
  if (!existingAmenity || existingAmenity.count === 0) {
    throw new NotFoundError('Amenity', id)
  } 
  console.log("name:", name)
  const amenity = await prisma.amenity.updateMany({ 
    where: {
      id
    },
    data: {
      name,
    }
  });



  return {
    message: `Amenity with id ${id} was updated!` 
  }
};

export default updateAmenityById;