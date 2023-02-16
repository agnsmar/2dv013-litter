import { prisma } from "../src/config/prisma"
import { createLit, deleteLit } from "../src/db"

describe('Create Lit', () => {
  const userID = 1_234_567
  const content = 'test content'

  it('Should create a lit', async () => {
    await createLit(content, userID)
    const lit = await prisma.lit.findFirst({
      where: { 
        user_id: userID,
        content: content 
      }
    })

    expect(lit?.content).toBe(content)
  })

  afterAll(async () => {
    await prisma.lit.deleteMany({
      where: {
        user_id: userID,
        content: content
      }
    })
  })
})


describe('Delete Lit', () => {
  const litID = 987_654_321
  const userID = 1_234_567

  beforeAll(async () => {
    await prisma.lit.create({
      data: {
        content: 'test',
        user_id: userID,
        id: litID
      }
    })
  })

  it('Should delete a lit', async () => {
    await deleteLit(litID, userID)

    const lit = await prisma.lit.findFirst({ where: { id: litID }})
    expect(lit).toBeNull()
  })
})