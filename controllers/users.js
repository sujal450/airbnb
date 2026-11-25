module.exports.signup=(req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async (req,res)=>{
    req.flash("success","Welcome back to WanderLust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err);
        }
        req.flash("success","Successfully LoggedOut!");
        res.redirect("/listings");
    });
    
};
