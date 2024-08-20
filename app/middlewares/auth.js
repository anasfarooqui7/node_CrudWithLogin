const Auth_userSession = require('../service/auth.js');

class restrictToLoggin {
    handleLoginUserOnly(req, res, next) {
        // get user uid from cookies
        const userUid = req.cookies.uid;
        try {
            if (!userUid) {
                return res.redirect("/login");
            }

            // To check if the uid is present so the user is exist or not
            const user = new Auth_userSession;
            const loginUser = user.getUser(userUid);

            if (!loginUser) {
                return res.redirect("/login");
            }

            req.user = loginUser;
            next();
        } catch {
            res.status(500).json({ message: 'Failed to Login' });
        }
    }

    async checkAuth(req, res, next){
        // get user uid from cookies
        const userUid = req.cookies.uid;
        try {

            // To check if the uid is present so the user is exist or not
            const user = new Auth_userSession;
            const loginUser = user.getUser(userUid);

            req.user = loginUser;
            next();
        } catch {
            res.status(500).json({ message: 'Failed to Login' });
        }
    }
}

module.exports = restrictToLoggin;