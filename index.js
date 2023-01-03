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

const userRoutes = require("./Routes/user" );
const adminRoutes = require("./Routes/admin");
const courseRoutes = require("./Routes/course");
const registerRoute = require("./Routes/register");
const demoClassRoute = require("./Routes/demoClass");
const liveClassRoute = require("./Routes/liveClass");
const courseFeatureRoute = require("./Routes/courseFeature");
const courseSyllabusRoute = require("./Routes/courseSyllabus");
const cohortRoutes = require("./Routes/cohort");
const cohortSubjectRoutes = require("./Routes/cohortSubject");
const cohortTopicRoutes = require("./Routes/cohortTopic");
const cohortFAQRoutes = require("./Routes/cohortFAQ");
const videoRoutes = require("./Routes/video");
const lastWatchedRoutes = require("./Routes/lastWatched");
const mobileRoutes = require('./Routes/mobileAuth');
const home = require('./Routes/home');
const blogsRoutes = require("./Routes/blogs");


app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/course", courseRoutes);
app.use("/course/price/demo", demoClassRoute);
app.use("/course/price/live", liveClassRoute);
app.use("/course/feature", courseFeatureRoute);
app.use("/course/syllabus", courseSyllabusRoute);
app.use("/register", registerRoute);
app.use("/cohort", cohortRoutes);
app.use("/cohort/subject", cohortSubjectRoutes);
app.use("/cohort/topic", cohortTopicRoutes);
app.use("/cohort/faq", cohortFAQRoutes);
app.use("/video", videoRoutes);
app.use("/last-watched", lastWatchedRoutes);
app.use("/mobileAuth", mobileRoutes);
app.use("/home", home);
app.use("/blogs",blogsRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    mongooseConnect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB on port " + PORT);
});
