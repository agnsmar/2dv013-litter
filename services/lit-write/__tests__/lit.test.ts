import { prisma } from "../src/config/prisma"
import { deleteLit } from "../src/db"

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