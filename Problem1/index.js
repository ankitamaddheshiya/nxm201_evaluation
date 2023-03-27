const express = require("express")
const { connection } = require("./config/db")
const {redisClient} = require("./config/redis")
const {userRouter} = require("./ruoter/userRouter")

const app = express()


app.use(express.json())
app.use(userRouter)

app.get("/", (req, res) => {
    res.send("Home page")
})



//const PORT = process.env.port

app.listen(process.env.port, async (req, res) => {
    try {
       // await connection
        console.log("Connected to the db")
    } catch (err) {
        console.log({ "msg": "Not connected to the DB", "error": err.message })


    }
    console.log(`Server is running at ${process.env.port} successfully`)
})
