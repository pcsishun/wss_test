require("dotenv").config();


const connect = require("./connection/connection");
const express  = require("express");
const cors = require("cors");


// list database model // 
const findDB = require("./model/findDB");
const demoCollection = require("./model/demoCollection");
const gentoken = require("./middleware/auth");

// const setHttp = process.env.MONGO_URI_DEMO
const port = process.env.PORT || 3333;
const app = express();
const http = require('http').createServer(app);

const io = require("socket.io")(http, {
    cors:{
        origin: ["http://localhost:5173"]
    }
})


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/debug", async (req, res) => {
    res.sendStatus(200);
});


// wss //
// let userCount = 0;
io.on("connection", (socket) => {

    // console.log("user connected");
    // userCount =+ 1; 
    // const genUser =  "usernumber"+userCount
    socket.on("disconnect", () => {
        console.log('user disconnected');
        
    });


    socket.on("receive-message", (message) => {
        console.log(message);
        io.emit("sent-message", message);
    })

    io.emit("connected-status", true)
    // io.emit("set-user", genUser)
    
})

// ---- //

// admin mangement // 
app.post("/createsite", async (req, res) => {

    const {siteDB, userType} = req.body;
    const setConnection = process.env.MONGO_URI_ORIGIN;

    if(userType === "admin"){

        try{

            const conn =  connect(setConnection);
            const tenacryModol = conn.model("findDB",findDB);
            const existDB = await tenacryModol.findOne({name:siteDB});
            console.log(existDB);

            if(existDB === null){
                
                try{
                    
                    await tenacryModol.create({
                        name:siteDB
                    })
                    
                    const routeUrlDB = process.env.MONGO_URI_DEMO;
                    const genRouteDB =  routeUrlDB+siteDB;

                    // generate schema //
                    const conn =  connect(genRouteDB);
                    conn.model("demoCollection",demoCollection);

                    
                    const payload = {
                        create_status: true,
                        text: "new database have created: "+genRouteDB 
                    }

                    res.send(payload)


                }catch(err){
                    console.log(`error in api createsite => ${err}`)
                    res.sendStatus(500);
                }

            }else{
                const payload = {
                    create_status: false,
                    text: "this database already exist"
                }
                res.send(payload)
            }

        }catch(err){
            console.log(`error in api createsite => ${err}`)
            res.sendStatus(500)
        }
    }else{
        res.sendStatus(401)
    }
})

// user select database by permission //

app.post("/multitenacy", async (req, res) => {

    const {username} = req.body;
    const userTen = require("./model/userTen");
    const setConnection = process.env.MONGO_URI_ORIGIN;

    try{

        const conn = connect(setConnection);
        const setModel = conn.model("userTen",userTen);
        const isUser = await setModel.findOne({username:username});

        console.log(isUser)
        if(isUser !== undefined && isUser !== NaN && isUser !== null){

            const payload = {
                username: isUser.username,
                site_id: isUser.typeDB
            }

            // mongoose.connection.close();
            res.send(payload);

        }else{
            console.log(`error in api multitenacy => ${multitenacy}`);
            // mongoose.connection.close();
            res.sendStatus(500)
        }

    }catch(err){
        console.log(`error in api multitenacy: ${err}`);
        // mongoose.connection.close();
        res.sendStatus(500)
    }
    
});


app.post("/insertdata", async (req, res) => {
    const {username, site_id, collecting} = req.body;
    const setDB = process.env.MONGO_URI_DEMO;
    const selectionDB = setDB+site_id
    // demoCollection

    try{
        const conn = connect(selectionDB);
        const setModel = conn.model("demoCollection",demoCollection);
        await setModel.create({
            name:username,
            text_in: collecting
        })

        res.sendStatus(200);

    }catch(err){  
        console.log(`error in api insertdata: ${err}`);
        res.sendStatus(500);
    }
})

// test midware //
const testmid = require("./middleware/testmid")

app.post("/midware", testmid ,async (req, res) => {
    const  datain =  req.setPayload
    console.log("datame",datain)
    res.sendStatus(200);
})

app.post("/login",  gentoken, async (req, res) => {
    const data = req.buildpayload;
    res.send(data);
})





http.listen(port, () => {
    console.log(`app listen to port => ${port} at local server => http://localhost:${port}`) 
});