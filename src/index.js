const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});









 // -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7] : 4 is missing

app.get("/sol1", function (req, res) {

    let arr = [1,2,3,5,6,7]
    let total = 0;
    for(let i in arr){
        total += arr[i];
    }
    let lastDigit = arr.pop()
    let consecutiveSum = lastDigit*(lastDigit + 1)/2
    let missignNumber = consecutiveSum - total
    res.send({data:missignNumber});
});

   // -write an api which gives the missing number in an array of integers starting from anywhere….e.g [33, 34, 35, 37, 38]: 36 is missing
//    router.get("/sol2", function (req, res) {
//     let arr2= [33,34,35,37,38]
//     let len= arr2.length
 
//     let total = 0;
//     for (var i in arr2) {
//         total += arr[i];
//     }
//   let firstDigit2= arr2[0]
//     let lastDigit2= arr2.pop()
//     let consecutiveSum2= (len + 1) * (firstDigit2 + lastDigit2) / 2
//     let missingNumber2= consecutiveSum2 - total
  
//     res.send(  { data: missingNumber2  }  );
//   });

