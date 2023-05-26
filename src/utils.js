const jwt = require('jsonwebtoken');

const decodeToken =  function decodeMyJWT(token) {
   
    try {
       
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        return {
            username: decoded.username,
            id: decoded.id
        };
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {decodeToken}; 