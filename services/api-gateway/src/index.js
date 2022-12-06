import express from 'express'
import dotenv from 'dotenv'

try {
  dotenv.config()
  const app = express()

  app.get('/api/example', (req, res) => {
    res.send('Hello World')
  })

  app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
} catch (err) {
  console.error(err)
}
