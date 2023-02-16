import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const username1 = 'dinkleberg2452'
  const id1 = 1_234_567
  const user1 = await prisma.user.upsert({
    where: {
      id: id1
    },
    update: {},
    create: {
      email: username1 + '@example.com',
      password: username1,
      username: username1,
      id: id1
    }
  })
  console.log({ user1 })

  const username2 = 'dinkleberg2453'
  const id2 = 1_234_568
  const user2 = await prisma.user.upsert({
    where: {
      id: id2
    },
    update: {},
    create: {
      email: username2 + '@example.com',
      password: username2,
      username: username2,
      id: id2
    }
  })
  console.log({ user2 })

  const profile = await prisma.profile.upsert({
    where: {
      user_id: user1.id
    },
    update: {},
    create: {
      user_id: user1.id,
      content: 'test content'
    }
  })
  console.log({ profile })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
