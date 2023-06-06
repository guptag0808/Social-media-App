const express = require('express');
const {connection} = require('./config/db');
const {userRouter} = require("./routes/userRoutes");

const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api",userRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
})



app.listen(3000, async () => {
    try {
        await connection;
        console.log('Database connected');
    } catch (error) {
        console.log('Error connecting to database');
    }
    console.log('Server listening on port 3000');
});