const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const expressError=require("../utils/expressError.js");
const {listingSchema}=require ("../schema.js");
const {isLoggedIn,isOwner}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
}

router.route("/")
//Index route
.get(wrapAsync(listingController.index))
//Create route
.post(isLoggedIn,upload.single('listing[image]'),validateListing,
    wrapAsync(listingController.createListing)
);
//New route
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
//Update route
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
//Destroy route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))
//Show route
.get(wrapAsync(listingController.showListing));

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));
module.exports=router;