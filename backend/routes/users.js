const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/authMiddleware');

const db = require('../database/mysql_connection');
const verifyToken = require('../middlewares/verifyTokenMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./images")
    },
    filename: (req, file, cb) => {
        return cb(null, file.originalname)
    }

})
const upload = multer({ storage })

router.use(authMiddleware);
router.use(verifyToken);

router.get('/get-all', async (req, res) => {
    try{
        db.query(
            "SELECT username, email FROM users",
            (err, results) => {
                if(err){
                    return res.status(400).json({
                        status: "error",
                        message: `${err.message}`,
                        
                    })
                };

                return res.status(200).json({
                    status: "success",
                    data: {
                        results: results
                    }
                    
                })
            }
        )

    }catch(error){
        return res.status(500).json({
            status: "error",
            message: `${error.message}`,
            
        })
    }
});

router.post('/login', async (req, res) => {
    const sql = "SELECT * FROM users \
    WHERE users.email = ?\
    LIMIT 1"
    // AND users.password = ? 
    try {


        var { email, password } = req.body;
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt)
        const jwt_secret = process.env.JWT_SECRET
        const values = [email];
        
        var cookie_format = {
            id: null,
            username: null
        }

        db.query(sql,
            values,
            (err, results) => {
                if (err) {
                    return res.status(400).json({
                        status: "error",
                        message: `${err.message}`
                    })
                }

                bcrypt.compare(password, results[0].password, (err, result) => {
                    if (err) {
                        console.log(err);

                        return res.status(200).json({
                            status: "success",
                            data: {
                                isLoggedIn: false,
                                info: null
                            }
                        })


                    }

                    cookie_format = {
                        id: results[0].id,
                        email: results[0].email,
                        username: results[0].username
                    }

                    jwt.sign(cookie_format, jwt_secret, { expiresIn: '24h' }, (err, token) => {
                        if (err) {
                            
                            return res.status(400).json({
                                status: "error",
                                message: `${err.message}`,
                                data: {
                                    isLoggedIn: false,
                                    info: null
                                }
                            })
                            

                        }
                        // return res.status(200).json({
                        //     isLoggedIn: true,
                        //     info: token,
                        // })

                        return res.status(200).json({
                            status: "success",
                            data: {
                                isLoggedIn: true,
                                info: token
                            }
                        })

                    })

                })




            }
        )

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `${error.message}`,
            
        })
    }


})

router.post('/auth', async (req, res) => {
    const sql = "SELECT * FROM users\
    WHERE users.id = ? LIMIT 1"

    const jwt_secret = process.env.JWT_SECRET;
    const { token } = JSON.parse(req.body.data);
    const verify = await jwt.verify(token, jwt_secret);

    try {
        db.query(sql,
            [verify.id],
            (err, result, fields) => {
                if (err) {
                    return res.status(400).json({
                        status: "error",
                        message: `${err.message}`,
                        
                    })
                }

                return res.status(200).json({
                    status: "success",
                    data: {
                        results: result.data
                    }
                    
                })
            }
        )
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `${error.message}`,
            
        })
        
    }

});


// router.post('/', authMiddleware, (req, res, next) => {
//     return res.status(200).json({
//         status: "success",
//         data: {},

//     })
// });

// router.post('/', verifyToken, (req, res, next) => {
//     return res.status(200).json({
//         status: "success",
//         data: {},

//     })
// });

router.post('/validate', async (req, res) => {
    const { userToken } = req.body;
    const jwt_secret = process.env.JWT_SECRET;
    
    jwt.verify(userToken, jwt_secret, (err, decoded) => {
        if (err) {
            console.log(err.message);
            
            return res.status(400).json({
                status: "error",
                message: `${err.message}`,
                
            })
        }
        
        return res.status(200).json({
            status: "success",
            data: {
                info: decoded
            }  
        })

    });

})

router.post('/user-creation', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);
        const values = [email, hashedPassword]
    
        await db.query(
            "SELECT COUNT(*) AS count FROM users WHERE email = ?",
            [email], (err, result) => {

                if (err) {
                    return res.status(400).json({
                        status: "error",
                        message: `${err.message}`
                    })
                }
                const emailExists = result[0].count > 0;

                if (emailExists) {
                    return res.status(400).json({
                        status: "error",
                        message: "Email is already taken."
                    })
                }

                db.query(
                    "INSERT INTO users (email, password) VALUES(?, ?)",
                    values, (err, results) => {
                        if (err) {
                            return res.status(400).json({
                                status: "error",
                                message: `${err.message}`
                            })
                        }

                        return res.status(201).json({
                            status: "success",
                            message: "User registered successfully",
                        });
                    }
                )

            }
        )

        } catch (error) {
    
            return res.status(500).json({
                status: "error",
                message: `${error.message}`
            });
        }
});

router.get('/info/:id', (req, res) => {
    const sql = "SELECT users.username, users.email FROM users\
    WHERE users.id = ?";
    // LEFT JOIN wishlist\
    // ON wishlist.user_id = users.id\
    const { id } = req.params;
    const values = [id]

    try {
        db.query(sql,
            values, (err, results) => {
                if (err) {
                    return res.status(400).json({
                        status: "error",
                        message: `${err.message}`
                    })
                }

                return res.status(200).json({
                    status: "success",
                    data: {
                        results: results
                    }
                })
            }
        )

    } catch (error) {
        
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        })
    }
})

router.get('/bad', (req, res) => {
    return res.status(200).send(new Error('hi'));
});

router.post('/test', async (req, res) => {

    try {
    const { email, password } = req.body;


    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt);
    const values = [email, hashedPassword]

    
        await db.query(
            "SELECT COUNT(*) AS count FROM users WHERE email = ?",
            [email], (err, result) => {

                if (err) {
                    return res.status(400).json({
                        status: "error",
                        message: `${err.message}`
                    })
                }
                const emailExists = result[0].count > 0;

                if (emailExists) {
                    return res.status(400).json({
                        status: "error",
                        message: "Email is already taken."
                    })
                }

                db.query(
                    "INSERT INTO users (email, password) VALUES(?, ?)",
                    values, (err, results) => {
                        if (err) {
                            return res.status(400).json({
                                status: "error",
                                message: `${err.message}`
                            })
                        }




                        return res.status(201).json({
                            status: "success",
                            message: "User registered successfully",
                        });
                    }
                )




            }
        )




    } catch (error) {

        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        });
    }



});

module.exports = router;