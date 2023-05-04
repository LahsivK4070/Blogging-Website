const router = require("express").Router();
const User = require("../modals/User");
const bcrypt = require("bcrypt");


// register route
router.post("/register", async (req, res) => {
    
    try {

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            userName: req.body.userName,
            email: (req.body.email).toLowerCase(),
            password: hashPassword
        })

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// login route
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        if (!user) {
            res.status(400).json("Wrong Credentials");
        }

        const validated =await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            res.status(400).json("Wrong Credentials");
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500);
    }
})

module.exports = router;