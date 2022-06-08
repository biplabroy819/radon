const express = require('express');
const router = express.Router();
const booksModel= require("../models/booksModel.js")
const authorModel= require("../models/authorModel.js")

const booksController= require("../controllers/userController");
const res = require('express/lib/response');



router.post("/createAuthors",booksController.createAuthors)
router.post("/createBooks",booksController.createBooks)
router.get("/getBooksbyChetanBhagat",booksController.getBooksbyChetanBhagat)
router.get("/authorOfBook",booksController.authorOfBook)
router.get("/bookBetween",booksController.bookBetween)


module.exports = router;



























