const sessionIdToUserMap = new Map();

class AuthService {

    // pass SessionID and User
    setUser(id, user){
        sessionIdToUserMap.set(id, user);
    }

    // to get User from SessionID
    getUser(id){
        return sessionIdToUserMap.get(id);
    }
}

module.exports = AuthService;