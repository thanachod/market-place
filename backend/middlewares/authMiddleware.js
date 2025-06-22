
const logIn = (req, res, next) => {
    const sql = "SELECT * FROM users \
    WHERE users.email = ?\
    LIMIT 1"

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

        console.log('logged in');
        

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: `${error.message}`,
            
        })
    }
    next();
}

module.exports = logIn;

