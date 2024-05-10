const express = require("express")
const cors = require('cors');
const route = require("./src/routes")

const app = express()
const PORT =  3100
const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200,    
    methods: 'GET,PUT,POST,DELETE', 
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] 
  };
  
  app.use(cors(corsOptions)); 
  
  app.use(cors());
  
app.use(route)
app.listen(PORT, () => {
console.log(`Express app is running on ${PORT}`)
})




