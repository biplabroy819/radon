const express = require('express');
const externalModule = require("./logger/logger");
const externalModule1 = require("./util/helper");
const externalModule2 = require("./validator/formatter");
const router = express.Router();


router.get('/test-me', function (req, res) {
    // res.send('My first ever api!')
    externalModule1.a()
    externalModule1.b()
    externalModule1.c()
    externalModule2.d()
    externalModule.welcome()
});

module.exports = router;
// adding this comment for no reason
