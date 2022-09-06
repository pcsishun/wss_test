const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const {username, password, usertype} = req.body;

        if(username === 'admin' && password === '1234'){

            try{
                const genToken = jwt.sign({
                    username: username,
                    password: password,
                    usertype: usertype
                });

                const payload = {
                    username: username,
                    password: password,
                    usertype: usertype,
                    token: genToken
                }

                req.buildpayload = payload;
                // req.body, req.pram req.header
                next(); // 500
            }catch(err){
                res.sendStatus(500)
            }
        }else{
            res.sendStatus(401)
        }    
}

module.exports = auth;
