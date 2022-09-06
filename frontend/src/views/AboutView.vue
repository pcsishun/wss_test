<template>
  <div class="about">
    <div class="title">
      <h1>Community</h1>
    </div>
    <div class="chatbox">
      <div v-if="userInputName !== ''">
        <div class="text-runner">
          <p class="disconn" v-if="isConnected !== true">
            can't connecting to server!
          </p>
          <div v-for="(data, index) in message_out" :key="index">
            <p class="l-text" v-if="data.name !== userInputName">{{data.text}}</p>
            <p class="r-text" v-if="data.name === userInputName">{{data.text}}</p>
          </div>
        </div>
        <div class="btn-send">
          <input class="input-text" v-model="message"/>
          <button class="c-send" @click="sending">Send</button>
        </div>
      </div>
      <div class="set-username" v-if="userInputName === ''"> 
        <input class="is-username" placeholder="Enter your name." v-model="setName"/>
        <button class="btn-username" @click="haddlename">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import SocketioService from "../services/socketio.service";

const socket = SocketioService.socketConnection();

export default{
  components:{

  },
  data(){
    return{
      isConnected: false,
      message: "",
      message_out: [],
      setName:"",
      userInputName:""
    }
  },
  computed:{
  },
  methods:{ 
    
    sending() {
      const warpText = {
        name: this.userInputName,
        text: this.message
      }
      SocketioService.sentMessage("receive-message", warpText);
      this.message = ""
    },

    haddlename(){
      const haddleName = this.setName.trim();
      if(haddleName !== ''){
        this.userInputName = haddleName
      }else{
        this.setName = ""
      }
      
    }
  },
  created(){
    socket.on("set-user", (unnameuser) => {
      this.yourid = unnameuser
      console.log("yourid ===> ",this.yourid)
    })
  },  
  mounted(){

    socket.on("connected-status", (status_conn)=> {
      this.isConnected = status_conn
    })

    socket.on("sent-message", (msgIn) => {
      // console.log("msgIn ==> ", msgIn)
      this.message_out.push(msgIn)
    })
  },
  updated(){
    
  },
 
  beforeUnmount(){
  }
}
</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    margin-top: 100px;    
  }
  .chatbox{
    margin-top: 50px;
    min-height: 70vh;
    align-items: center;
    border: 1px solid rgb(188, 188, 188);
    border-radius: 10px;
  }
  .text-runner{
    width: 95%;
    height: 60vh;
    border-bottom: 1px solid rgb(188, 188, 188);
    margin: auto;
    margin-top: 20px;
    overflow-y: scroll;
  }
  .btn-send{
    margin: auto;
    text-align: center;
  }
  .input-text{
    margin-top: 7px;
    width: 80%;
    height: 50px;
    border: 1px solid rgb(238, 238, 238);
    border-radius: 10px;
    background-color: rgb(2 38, 238, 238);
    text-indent: 10px;
  }
  .c-send{
    margin-left: 10px;
    height: 50px;
    width: 60px;
    border: none;
    border-radius: 10px;
    background-color: rgb(124, 124, 124);
    color: white;
    font-size: 15px;
    font-weight: 700;
  }

  .c-send:active{
    background-color: rgb(87, 87, 87);
  }

  .set-username{
    text-align: center;
    margin-top: 50%;
  }

  .is-username{
    height: 50px;
    width: 80%;
    border: none;
    background-color: rgb(241, 241, 241);
    border-radius: 10px;
    text-indent: 40%;
  }

  .btn-username{
    margin-left: 10px;
    height: 50px;
    width: 60px;
    border: none;
    border-radius: 10px;
    background-color: rgb(124, 124, 124);
    color: white;
    font-weight: 700;
  }

  .l-text{
    text-align: right;
  }
  .r-text{
    text-align: right;
    font-weight: bold;
  }
}
</style>
