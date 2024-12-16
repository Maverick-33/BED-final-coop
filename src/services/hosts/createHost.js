import { PrismaClient } from '@prisma/client'
import BadRequest from '../../errors/badRequest.js'

const createHost = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
  const prisma = new PrismaClient()
  if (!username || !password || !name || !email || !phoneNumber || !profilePicture || !aboutMe) {
    throw new BadRequest()
  }

  return prisma.host.create({
    data: {
        username, 
        password, 
        name, 
        email, 
        phoneNumber, 
        profilePicture, 
        aboutMe
    }
  })
}

export default createHost;