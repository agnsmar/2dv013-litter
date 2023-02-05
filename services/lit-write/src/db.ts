import { prisma } from './config/prisma'

export const createLit = async (content: string, user_id: number) => {
  await prisma.lit.create({
    data: {
      content,
      user_id
    }
  })
}

export const deleteLit = async (id: number, user_id: number) => {
  await prisma.lit.deleteMany({
    where: {
      id,
      user_id
    }
  })
}