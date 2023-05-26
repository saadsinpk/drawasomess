const jwt = require('jsonwebtoken');



const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
          res.status(500).json({ errorMessage: 'Token is not valid' });
        } else {
          req.user = decoded;
  
          if (req.user.isAdmin) {
            next();
          } else {
            res.status(403).json({ errorMessage: 'You are not authorized to perform this action' });
          }
        }
      });
    } else {
      res.status(401).json({ errorMessage: 'You are not authenticated' });
    }
  };
  

const verifyTokenAndAuth = (req,res,next)=> {
    verifyToken(req,res,()=> {
       if(req.user.id === req.params.id || req.user.isAdmin){
        next();
       }else{
           res.status.json({message: "You are not Allowed to do that"});
       }
    });
}


const verifyTokenAndAdmin = (req,res,next)=> {
    verifyToken(req,res,()=> {
       if(req.user.isAdmin){
        next();
       }else{
           res.status(401).json("You are not Allowed to do that");
       }
    });
}
module.exports = {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin};