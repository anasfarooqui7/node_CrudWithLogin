const express = require("express");
const app = express();

// require cookie
const cookieParser = require("cookie-parser");

// require routes file
const urlRoutes = require("./app/routers/url.js");
const staticUrls = require("./app/routers/staticRouter.js");
const userRoute = require('./app/routers/userRoute.js');
const path = require("path");

// set view templete
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

// dot import
const dotenv =  require('dotenv');
dotenv.config();


/**
 * use express,json() for body parameters & 
 * use express,urlencoded() for body parameters
 */
app.use(express.json());
/**
 * we use express.urlencoded for form data
 */
app.use(express.urlencoded({ extended: true }));
// use cookies to store uid
app.use(cookieParser());

// middleware
const AuthMiddleware = require("./app/middlewares/auth.js");
const authMiddleware = new AuthMiddleware();
const loggedInUserOnly = authMiddleware.handleLoginUserOnly.bind(authMiddleware);
const checkUserIsLogin = authMiddleware.checkAuth.bind(authMiddleware);

// route use
app.use("/url", loggedInUserOnly, urlRoutes);
app.use("/", checkUserIsLogin,staticUrls);
app.use("/user", userRoute);

// test route
// app.get('/test', async (req, res) => {
//   return res.render('index');
// });

/**
 * for use env file we call process.env
 * after dotenv package intall
 * here we call the port
 */
const PORT = process.env.PORT;
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
}); 