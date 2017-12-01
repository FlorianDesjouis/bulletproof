const http = require('http');
const port = 1234;
const fs = require('fs');
const mongoose = require('mongoose');
const crypto = require('crypto');



fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    } 
    http.createServer(function(request, response) {  
        
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8000);
});

// Connect to the db
mongoose.connect("mongodb://localhost:27017/bulletproofDB", {useMongoClient: true});

const userSchema =  mongoose.model('User', new mongoose.Schema({
    "username" : {type: String, required: true},
    "password" :{type: String, required: true}
}, {collection: 'user'}))

create: (req, res) => {
    const hash = crypto.createHash('sha256')
    hash.update(req.body.password);
    req.body.password = hash.digest('hex')
    User.create(req.body)
    .then(user => res.json({success:1, message: "User created", inserted: user}))
    .catch(err => res.status(500).json({error:1, message: err.message}))
}