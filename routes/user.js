const express=require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router=express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users");


router.get("/signup",userController.signup);

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let{username,email,password}=req.body;
    const newUser=new User({email,username});
    let registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err)
        {
            return next(err);
        }
        req.flash("success","Welcome to WanderLust");
        res.redirect("/listings");
    });
    }
   catch(e)
   {
    req.flash("error",e.message);
    res.redirect("/signup");
   }
    
})
);


router.get("/login",userController.loginForm);

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',faliureFlash:true}),
userController.login);


router.get("/logout",userController.logout);

module.exports=router;