import pika, sys, os

def main():
  credentials = pika.PlainCredentials(
    username = os.environ['RABBIT_USER'],
    password = os.environ['RABBIT_PASSWORD']
  )

  connection = pika.BlockingConnection(
    pika.ConnectionParameters(
      host = "sphynx-queue-rabbitmq",
      port = 5672,
      virtual_host = "/",
      credentials = credentials
  ))

  channel = connection.channel()

  channel.queue_declare('lit-create')
  channel.queue_declare('lit-delete')

  def create(ch, method, properties, body):
        print(" [x] Received %r" % body)

  def delete(ch, method, properties, body):
        print(" [x] Received %r" % body)

  channel.basic_consume(queue='lit-create', on_message_callback=create, auto_ack=True)
  channel.basic_consume(queue='lit-delete', on_message_callback=delete, auto_ack=True)

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
