const express = require("express");
const cors = require("cors");
const mongooseConnect = require("mongoose").connect;
const dotenvConfig = require("dotenv").config;
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
dotenvConfig();

const userRoutes = require("./Routes/user");

app.use("/user", userRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    mongooseConnect("mongodb://localhost:27017/ansrone");
});
