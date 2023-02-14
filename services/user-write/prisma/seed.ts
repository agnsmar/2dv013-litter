import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const username = 'dinkleberg2452'
  const user = await prisma.user.upsert({
    where: {
      username
    },
    update: {},
    create: {
      email: username + '@example.com',
      password: username,
      username,
      id: 1_234_567
    }
  })
  console.log({ user })

  const profile = await prisma.profile.upsert({
    where: {
      user_id: user.id
    },
    update: {},
    create: {
      user_id: user.id,
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
