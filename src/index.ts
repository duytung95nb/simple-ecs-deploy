import express from 'express'

const app = express()
const port = 3000

const createdTimeStamp = Date.now();
app.get('/', (req, res) => {
  res.send("Welcome to the app version " + process.env.VERSION
    + " - Created timestamp: " + createdTimeStamp);
})

app.get('/hello', (req, res) => {
  res.send("Hello bro!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})