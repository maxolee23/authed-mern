const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config();


const {MONGO_URI, PORT} = process.env

const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");


//middleware

app.use(morgan("dev"));
app.use(express.json())
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

//connect to db
mongoose.connect(MONGO_URI, {
    useCreateIndex: true, 
    useFindAndModify: true, 
    useUnifiedTopology: true, 
    useNewUrlParser: true
}, () => {
    console.log("connected to MongoDB")
})


app.listen(PORT, () => {
    console.log("Connected to server")
})