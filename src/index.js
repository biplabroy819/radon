const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);
mongoose.connect("mongodb+srv://biplab123:Ui9uKajnISboxAGj@cluster3.u5pv9.mongodb.net/biplab-DB?retryWrites=true&w=majority",{
    useNewurlParser:true
})
.then( ()=> console.log("MongoDb is connected"))
.catch( err => console.log(err))
app.use('/',route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
