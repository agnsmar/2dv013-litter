#!/usr/bin/env python
import pika, sys, os
import requests, json

def main():
  credentials = pika.PlainCredentials(
    username = os.environ['RABBIT_USER'],
    password = os.environ['RABBIT_PASSWORD']
  )

  connection = pika.BlockingConnection(
    pika.ConnectionParameters(
      host = 'sphynx-queue-rabbitmq',
      port = 5672,
      virtual_host = "/",
      credentials = credentials
  ))
  channel = connection.channel()

  channel.queue_declare(queue='lit-create', durable=False)
  channel.queue_declare(queue='lit-delete', durable=False)
  
  def create(ch, method, properties, body):
    requests.post(
      'https://c9b2-78-67-120-69.ngrok.io',
      json="create"
    )

  def delete(ch, method, properties, body):
    requests.post(
      'https://c9b2-78-67-120-69.ngrok.io',
      json="delete"
    )


  channel.basic_consume(queue='lit-create', on_message_callback=create, auto_ack=True)
  channel.basic_consume(queue='lit-delete', on_message_callback=delete, auto_ack=True)

  print(' [*] Waiting for messages. To exit press CTRL+C')
  channel.start_consuming()

if __name__ == '__main__':
  try:
    main()
  except KeyboardInterrupt:
    print('Interrupted')
    try:
      sys.exit(0)
    except SystemExit:
      os._exit(0)