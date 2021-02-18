const express=require('express');
const app=express();
const mongoose=require('mongoose');
const PORT=5000;
const {MONGOURI} = require('./keys')
var cors = require('cors')

require('./models/user')
// app.use(cors());
app.use(express.json());
app.use(require('./routes/auth'));

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})





app.listen(PORT,()=>{
    console.log("running");
})

