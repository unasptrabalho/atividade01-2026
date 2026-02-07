const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  return response.json({ message: 'Olá mundo!' })
})

app.listen(3333, () => {
  console.log('Server started on port http://localhost:3333')
})