import db from "../database/mysql_connection";

export const getCustomers = async (req, res) => {
    let sql = "SELECT * FROM customers";
    db.query(sql,
        (err, results) => {
            if (error) throw error;
            res.status(200).json(results);
        }
    );
};