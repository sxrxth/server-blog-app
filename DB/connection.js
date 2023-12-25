const mongoose=require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB atlas successfully connected with Rent App Server");
}).catch((err)=>{
    console.log(`MongoDB connection failed !!! Error: ${err}`);
})