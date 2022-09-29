const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const usersRouter = require('./routes/users.route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/user', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})