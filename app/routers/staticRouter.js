const express = require("express");
const router = express.Router();
const urlController = require("../controllers/url");  // require Controller to show all data
const { route } = require("./url");
const { render } = require("ejs");

// router.get("/", async(req, res) => {
//     return res.render('index');
// });
router.get('/', urlController.getAllurlsData);

// signUp form
router.get('/signup', (req, res) =>{
   return res.render('signup');
});

// Login form
router.get('/login', (req, res) =>{
    return res.render('login');
 });

module.exports = router;