const {v4: uuid4} = require('uuid');
const userModel = require('../models/user.js');
const Auth_userSession = require('../service/auth.js');
const bcrypt = require('bcrypt');

async function handleUserSignup(req, res){
    try {
        // console.log(req.body);
        // process.exit('form details');
        const { username, email, password } = req.body;
        const existingUser = await userModel.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, email, password: hashedPassword });
        return res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' });
    }            
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const existingUser = await userModel.findOne({ where: { email: email } });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        // Generate a new session ID by Createing the obj of AuthService Class
        const auth_service = new Auth_userSession();

        // Create Session Id
        const sessionId = uuid4();
        auth_service.setUser(sessionId, existingUser)

        res.cookie("uid", sessionId);
        // If password matches, redirect to index
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to login user' });
    }
}


module.exports= {
    handleUserSignup,
    handleUserLogin
};