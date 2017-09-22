var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/welp_camp", {
    useMongoClient: true,
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs" )

//Setting the Schema
var aunty = new mongoose.Schema({
    name: String,
    image: String,
});

var Campground = mongoose.model("Campground", aunty)


//creating the first objecct

//Campground.create({
  //  name:"Methodist lake",
    //image:"https://www.campamerica.co.uk/images/uploads/images/Private-Camp---Camp-Westmont-1400-x-610.png"
//}, function(err, camp) {
  //  if(err){
    //    console.log("WHOOPS")
    //} else {
      //  console.log("SUCCESS");
        //console.log(camp);
   // }
//})

//stating the campgrounds
//var campgrounds = [
  //  {name:"Methodist lake", image:"https://www.campamerica.co.uk/images/uploads/images/Private-Camp---Camp-Westmont-1400-x-610.png"},
    // {name: "Slat City",  image:"https://www.campamerica.co.uk/images/uploads/images/Private-Camp---Camp-Westmont-1400-x-610.png"}, ]


//Setting the Landing page
app.get("/", function(req,res){
    res.render("landing")
})


//creating the campgrounds
app.get("/campgrounds", function(req, res){

    Campground.find({}, function(err, camps){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds", {campgrounds:camps})
        }
    })

})

//enabling the post request
app.post("/campgrounds", function(req, res){
    //collecting information from the form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description}
    //adding to the campGrounds array
    Campground.create(newCampground, function(err, newGuy){
        if(err){
            console.log(err);
        } else{
           //redirecting to the campGrounds page
    res.redirect("/campgrounds")
        }
    })

})

//rendering the form
 app.get("/campgrounds/new", function(req, res){
     res.render("new.ejs");

 })

 //Creating the show page
 app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err) {
            console.log(err);
        }else {
            res.render("show", {campground:foundCamp})
        }
    } )

 })



//creating the server
app.listen(9000, function(){
    console.log("WelpCamp is up and running")
});
