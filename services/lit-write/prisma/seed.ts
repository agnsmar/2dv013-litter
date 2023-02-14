import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user_id = 1_234_567
  const id = 1_234_567
  const lit = await prisma.lit.upsert({
    where: {
      id
    },
    update: {},
    create: {
      content: 'test content',
      user_id,
      id: 1_234_567
    }
  })
  console.log({ lit })
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
