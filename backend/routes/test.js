const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get("/", (req, res) => {
    const hour_num = 1;
    const exp_date =  60 * 60 * 1000 * hour_num;
    console.log(exp_date);
    
    res.cookie("UserMessage", "hello world", { maxAge: exp_date});
    return res.status(201).json({
            status: "success",
            data: null
        })

    
});




module.exports = router;