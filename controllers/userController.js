const users=require('../Models/userSchema')
const jwt=require('jsonwebtoken')

// register
exports.register=async (req,res)=>{
    console.log("Inside Register Controller function");
    const {username,email,password,place,phone}=req.body
    try{
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(406).json("Account already exists !!! Please login...")

        }
        else{
            const newUser=new users({
                username,email,password,place,phone,profile:""
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json(`Register API Failed , Error: ${err}`)
    }
}

// login
exports.login=async (req,res)=>{
    console.log("Inside login Controller function...");

    const {email,password}=req.body
    console.log(req.body);
    try{
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},"supersecretkey12345")
            res.status(200).json({
                existingUser,token
            })
        }
        else{
            res.status(404).json("Invalid email or password")
        }
    }
    catch(err){
        res.status(401).json(`Login API Failed , Error: ${err}`)
    }
}
// edit user



exports.editUserController=async (req,res)=>{
    // get edit user details
    const userId=req.payload
    const {username,email,password,profile}=req.body
    const uploadUserImage=req.file?req.file.filename:profile

    try{
        const updateUser=await users.findByIdAndUpdate({_id:userId},{
            username,email,password,profile:uploadUserImage
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch (err){
        res.status(401).json(err)
    }


}