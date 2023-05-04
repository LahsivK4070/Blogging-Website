const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const postsRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const cors = require('cors');
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => {
	console.log('connected to database');
})
.catch((e)=>{
	console.log("Something went wrong", e);
})

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	}
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	res.status(200).json("File uploaded");
})

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoryRoute);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port`);
})