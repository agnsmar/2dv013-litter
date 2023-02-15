import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const username1 = 'dinkleberg2452'
  const user1 = await prisma.user.upsert({
    where: {
      username: username1
    },
    update: {},
    create: {
      email: username1 + '@example.com',
      password: username1,
      username: username1,
      id: 1_234_567
    }
  })
  console.log({ user1 })

  const username2 = 'dinkleberg2453'
  const user2 = await prisma.user.upsert({
    where: {
      username: username2
    },
    update: {},
    create: {
      email: username2 + '@example.com',
      password: username2,
      username: username2,
      id: 1_234_568
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
