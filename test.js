const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

BlogPost.create({
    title: "The Mythbuster's Guide to Saving Money on Energy Bills",
    body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favorite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everywhere at this time of year. They go like this:"
})

// selects all documents in BlogPosts collection
BlogPost.find({}, (error, blogspot) =>{
    console.log(error, blogspot)
})

// selects all documents with specific title
BlogPost.find({
    title: "The Mythbuster's Guide to Saving Money on Energy Bills"
}, (error, blogspot) => {
    console.log(error, blogspot)
})

// selects all documents containing specific character sequence
BlogPost.find({
    title: /The/
}, (error, blogspot) => {
    console.log(error, blogspot)
})

// selects single document by ID
id = "660cd0a104488db738f6ef0e";
BlogPost.findById(id, (error, blogspot) => {
    console.log(error, blogspot)
})

// update a record
BlogPost.findByIdAndUpdate(id, {
    title: "Updated title"
}, (error, blogspot) => {
    console.log(error, blogspot)
})

// deleting single record
BlogPost.findByIdAndDelete(id, (error, blogspot) => {
    console.log(error, blogspot)
})