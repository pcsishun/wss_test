const  checkMid = async (req, res, next) => {
    const {name} = req.body;
    if(name === "earth"){

        const payload = {
            name: name,
            gen_name: "middleware!"
        }
        
        req.setPayload = payload
        next();
    }else{
        res.sendStatus(401)
    }
    

}

module.exports = checkMid;