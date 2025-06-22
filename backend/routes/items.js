const express = require('express');
const router = express.Router();
const multer = require('multer');
const itemController = require('../controllers/itemController');
const { query, validationResult, body, checkSchema } = require('express-validator');
const db = require('../database/mysql_connection');

//validationSchema
// const { createUserValidationSchema } = require('../utils/validationSchemas.mjs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./images")
    },
    filename: (req, file, cb) => {
        return cb(null, file.originalname)
    }

})
const upload = multer({ storage })


async function dateConverter(input_date){
    console.log(input_date);
    await input_date.map((item, index) => {

        const options = {
            // day: "numeric",
            // month: "long",
            // year: "numeric",
            timeZoneName: 'short'
        }

        const options2 = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }
        // console.log(item.created_at);
        // console.log(typeof item.created_at);
        // console.log(new Date(item.created_at).toLocaleString("en-US", options)); //th-TH
        // console.log(new Intl.DateTimeFormat("th-TH", options2).format(item.created_at));
        input_date[index].created_at = new Intl.DateTimeFormat("th-TH", options2).format(item.created_at);
        
    })

    // return input_date
    
}

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM items'
    try {
        db.query(sql,

            (error, results) => {
                if (error) {


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
});

router.post('/', (req, res) => {
    const sql = 'SELECT items.*, \
    categories.name AS category, categories.description AS description \
    FROM items \
    LEFT JOIN categories \
    ON items.category = categories.id \
    LIMIT ? OFFSET ?'

    const { pageSize, currentPage } = req.body;
    const OFFSET = (currentPage - 1) * pageSize;
    const sql_totalPage = 'SELECT * FROM items'

    try {
        db.query(sql,
            [pageSize, OFFSET],
            (error, results) => {
                if (error) {
                    return res.status(400).json({
                        status: "error",
                        message: `${err.message}`
                    })
                }
                db.query(sql_totalPage,
                    (err, results_totalPage) => {

                        return res.status(200).json({
                            status: "success",
                            data: {
                                results: results,
                                totalPage: results_totalPage.length
                            }
                        })
                    }
                );

            }
        )
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        });
    }
});

router.get('/detail/:id', (req, res) => {
    const sql = "SELECT items.*, \
    categories.name AS category \
    FROM items \
    LEFT JOIN categories \
    ON items.category = categories.id \
    WHERE items.id = ?\
    ";

    const { id } = req.params;

    try {
        db.query(sql,
            [id], (err, results) => {

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
            })


    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        })
    }

});

// router.get('/search', query('item_name'), (req, res) => {
    
// })


// need to work in module
// router.post("/item-sale", 
//     checkSchema(createUserValidationSchema), (req, res) => {
//     const result = validationResult(req);
//     console.log(result);
    
// });
// router.get('/', itemController.getItems);
// router.post('/', itemController.getItemsFiltered);
// router.get('/detail/:id', itemController.getProductDetail);
// router.post('/add-item', itemController.addItem);
// router.put('/:id', itemController.updateItem);

router.post('/add-item', upload.array('image'), (req, res) => {
    var sql = "INSERT INTO items\
    (name, price, quantity, category, description) VALUES(?, ?, ?, ?, ?)"

    var { name, price, quantity, category, description } = JSON.parse(req.body.data);
    if (category === '') {
        category = null;
    }
    var values = [name, price, quantity, category, description];

    try {
        db.query(sql,
            values, (err, results) => {
                if (err) {
                    return res.status(400).json({
                        status: "error",
                        message: `${err.message}`
                    })
                }

                return res.status(201).json({
                    status: "success",
                    data: null
                })
            }
        )
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        })
    }
});

router.put('/:id', upload.array('image'), (req, res) => {
    var sql = "UPDATE items\
    SET name = ?, price = ?, quantity = ?, category = ?, description = ? \
    "

    const { id } = req.params;
    var { name, price, quantity, category, description } = JSON.parse(req.body.data);

    if (category === '') {
        category = null;
    }

    var values = [name, price, quantity, category, description]
    if (req.files[0]) {
        sql += ', image_path = ? '
        image_path = req.files[0].filename;
        values.push(image_path)
    } else {
        image_path = '';
    }

    sql += 'WHERE id = ?'
    values.push(id)

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
                data: null
            })
        }
    )


});


router.get('/categories', async (req, res) => {
    const sql = "SELECT * FROM categories";


    try {
        db.query(sql,
            (err, results) => {

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
            })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        })
    }
});

router.post('/add-category', upload.array('image'), (req, res) => {
    const sql = "INSERT INTO categories\
    (name, description, image_path) VALUES(?, ?, ?)";

    const { name, description } = JSON.parse(req.body.data);
    var image_path = null;
    if (req.file) {
        image_path = req.file.filename;
    } else {
        image_path = '';
    }


    try {

        db.query(sql,
            [name, description, image_path], (err, results) => {
                if (err) {
                    return res.status(400).json({
                        status: "error",
                        message: `${err.message}`
                    })
                }

                return res.status(201).json({
                    status: "success",
                    data: null
                })
            }
        )
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        })
    }

});

router.get('/category/:id', async (req, res) => {
    const sql = "SELECT *\
    FROM categories\
    WHERE id = ?"

    const { id } = req.params;
    try {
        db.query(sql,
            [id], (err, results) => {
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
            message: `${err.message}`
        })
    }

});

router.put('/category/:id', upload.array('image'), (req, res) => {
    var sql = "UPDATE categories\
    SET name = ?, description = ? "

    const { id } = req.params;
    const { name, description } = JSON.parse(req.body.data);

    var values = [name, description]
    var image_path = null;
    if (req.files[0]) {
        sql += ', image_path = ? '
        image_path = req.files[0].filename;
        values.push(image_path)
    } else {
        image_path = '';
    }

    sql += 'WHERE id = ?'
    values.push(id)

    try {
        db.query(sql,
            values, (err, results) => {
                if (err) {
                    return res.status(400).json({
                        status: "error",
                        message: `${err.message}`
                    })
                }

                return res.status(200).send();
            }
        )

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        })
    }

});

router.post('/orders', async (req, res) => {
    try {
        const sql = "SELECT orders.id, orders.quantity, users.email, items.name, items.price FROM orders\
        LEFT JOIN users\
        ON users.id = orders.user_id\
        LEFT JOIN items\
        ON items.id = orders.item_id\
        LIMIT ? OFFSET ?"

        const { pageSize, currentPage } = req.body;
        const OFFSET = (currentPage - 1) * pageSize;
        const sql_totalPage = 'SELECT * FROM items'

        db.query(
            sql,
            [pageSize, OFFSET],
            (error, results) => {
                if (error) {
                    return res.status(400).json({
                        status: "error",
                        message: `${error.message}`
                    })
                }

                db.query(sql_totalPage,
                    (err, results_totalPage) => {

                        return res.status(200).json({
                            status: "success",
                            data: {
                                results: results,
                                totalPage: results_totalPage.length
                            }
                        })
                    }
                )


            }
        );


    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        })
    }
});

router.get('/orders/get-all', async (req, res) => {
    
    try {
        const sql = "SELECT * FROM orders"
        
        db.query(sql,
            (err, results) => {
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
});

router.post('/order/checkout', (req, res) => {
    let sql = "INSERT INTO orderitems\
    (order_id, item_id, quantity) VALUES ?"

    const { user, cart } = req.body;

    try {

        db.query(
            "INSERT INTO orders\
            (user_id) VALUES(?)",
            [user], (err, order_result) => {
                if (err) {
                    return res.status(400).json({
                        status: "error",
                        message: `${error.message}`
                    })
                }


                const orderId = order_result.insertId;
                const orderItems = cart.map((item) => [orderId, item.id, item.quantity])
                
                
                db.query(sql,
                    [orderItems], (err, results) => {
                        if(err){
                            return res.status(400).json({
                                status: "error",
                                message: `${err.message}`
                            })
                        }
                        return res.status(201).json({
                            status: "success",
                            data: null
                        })
                    }
                )
                

                
            }
        )



    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        })
    }
});

router.post('/orders/view-all', async (req, res) => {
    try{
        const sql = "SELECT orders.id, users.email, orders.created_at FROM orders\
        LEFT JOIN users ON users.id = orders.user_id\
        LIMIT ? OFFSET ?"

        const { pageSize, currentPage } = req.body;
        const LIMIT = pageSize;
        const OFFSET = (currentPage - 1) * pageSize;

        db.query(sql,
            [LIMIT, OFFSET],
            (err, results) => {
                if(err){
                    return res.status(400).json({
                        status: "error",
                        message: `${err.message}`
                    })
                }
                
                db.query(
                    "SELECT * FROM orders",
                    (total_error, total_results) => {

                        
                        // dateConverter
                        // console.log(total_results);
                        dateConverter(results);

                        return res.status(200).json({
                            status: "success",
                            data: {
                                results: results,
                                totalPage: total_results.length
                            }
                        })
                    }
                )
                
            }
        )

    }catch(error){
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        })
    }
});

router.post('/orders/count', (req, res) => {
    try{
        const sql = "SELECT orders.id, users.email, orders.created_at FROM orders\
        LEFT JOIN users ON users.id = orders.user_id\
        WHERE users.id = ?";

        const { user_id } = req.body;

        db.query(
            sql,
            user_id, (err, results) => {
                if(err){
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

    }catch(error){
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        })
    }
});

router.post('/order/by-user', (req, res) => {
    try{
        const sql = "SELECT orders.id, users.email, orderitems.item_id, items.name, orders.created_at FROM orderitems\
        LEFT JOIN orders ON orderitems.order_id = orders.id\
        RIGHT JOIN items ON items.id = orderitems.item_id\
        LEFT JOIN users ON users.id = orders.user_id\
        WHERE users.id = ?"
        const { user_id } = req.body;
        

        db.query(
            sql,
            user_id, (err, results) => {
                if(err){
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
        

        
    }catch(error){
        return res.status(500).json({
            status: "error",
            message: `${error.message}`
        })
    }
});

module.exports = router;