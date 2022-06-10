const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController= require("../controllers/publisherController")




router.post("/createAuthor", authorController.createAuthor  )
router.post("/createPublisher", publisherController.createPublisher)
router.post("/createBook", bookController.createBook  )
router.get("/getAllBooks",bookController. getAllBooks)








module.exports = router;











// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })
// router.get("/getAuthorsData", authorController.getAuthorsData)




// router.get("/getBooksData", bookController.getBooksData)

// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)
