import { prisma } from './config/prisma'
import amqplib from 'amqplib'
import { createLit, deleteLit } from './db'

const main = async () => {
  let connection: amqplib.Connection

  try {
    connection = await amqplib.connect(`amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PASSWORD}@sphynx-queue-rabbitmq:5672?heartbeat=10`);
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  const channel = await connection.createChannel()
  await channel.assertQueue('lit-create', { durable: false })
  await channel.assertQueue('lit-delete', { durable: false })

  channel.consume('lit-create', async (message) => {
    if(message !== null) {
      channel.ack(message)
      const lit = JSON.parse(message.content.toString())
      await createLit(lit.content, lit.user_id)
    }
  })

  channel.consume('lit-delete', async (message) => {
    if(message !== null) {
      channel.ack(message)
      const lit = JSON.parse(message.content.toString())
      await deleteLit(lit.lit_id, lit.user_id)
    }
  })

}

main().catch(console.error)