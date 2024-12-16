import { PrismaClient } from '@prisma/client'
import BadRequest from '../../errors/badRequest.js'

const createUser = async (username, password, name, email, phoneNumber, profilePicture) => {
  const prisma = new PrismaClient()
  if (!username || !password || !name || !email || !phoneNumber || !profilePicture) {
    throw new BadRequest()
  }

  return prisma.user.create({
    data: {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture
    }
  })
}

export default createUser;