//Calling the frameworks 
var express = require("express");
var app = express(); 
var request = require("request");

//Setting the first route
app.get("/", function(req,res){
    res.send("Hello and welcome to the homepage")
})
//Setting the second route 
app.get("/results", function(req, res) {
request("http://www.omdbapi.com/?t=hope", function(error, response, body){
    if (!error && response.statusCode == 200){
        res.send(body);
    } else { 
        console.log("Server is broken" + error)
    }
});
});

//creating the server
app.listen(2000, function(){
    console.log("Movie App is spot on ")
}); 