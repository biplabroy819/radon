  //ASSIGNMENT:-
    /*Write a middleware that logs (console.log) some data everytime any API is hit
    Data to be logged:-the current timestamp(as date time) , the IP of the user and the route being requested).
    For this first figure out how to get the route location being request, how to get current timestamp and how to get the IP.
    NOTE: ip of local computer will come as ::1 so dont get disturbed by seeing this)
    
    e.g: you should be logging something like this on each line:
    time , IP, Route should be printed on each line in terminal( every time an api is hit)
    2010-08-19 14:00:00 , 123.459.898.734 , /createUser*/
    
    
    const appuse= function ( req, res, next) {
    let ipInfo = req.ip;
    let url = req.originalUrl
    const newdate =new Date()
    console.log(newdate);
    console.log(ipInfo);
    console.log(url);
    next()
}
module.exports.appuse= appuse


















// const mid1= function ( req, res, next) {
//     req.falana= "hi there. i am adding something new to the req object"
//     console.log("Hi I am a middleware named Mid1")
//     next()
// }



// const mid2= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid2")
//     next()
// }

// const mid3= function ( req, res, next) {
    //     console.log("Hi I am a middleware named Mid3")
    //     next()
    // }
    
// const mid4= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid4")
//     next()
// }

// module.exports.mid2= mid2
// module.exports.mid3= mid3
// module.exports.mid4= mid4
// module.exports.mid1= mid1
