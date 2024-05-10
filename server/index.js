const express = require("express")
const route = require("./src/routes")

const app = express()
const PORT =  3100

app.use(route)
app.listen(PORT, () => {
console.log(`Express app is running on ${PORT}`)
})


