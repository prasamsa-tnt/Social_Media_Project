const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require('./routes/conversations')
const messageRoute = require('./routes/messages')

const multer = require("multer")
const path = require("path")

const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const passportSetup = require("./passport");
app.use(cookieSession(
  {
    name: "session",
    keys: ["Doe"],
    maxAge: 24 * 60 * 60 * 100
  }
)
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);



dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
// app.use((req, res, next) => {
//   res.setHeader('Permissions-Policy', '');
//   next();
// });
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// app.get("/",(req,res)=>{
//     res.send("welcome")
// })
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded successfully");
  } catch (err) {
    console.log(err)
  }
})


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


app.listen(8800, () => {
  console.log("backendcnd server is running");
})