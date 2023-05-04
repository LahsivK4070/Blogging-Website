const router = require("express").Router();
const Category = require("../modals/Category");

// add category
router.post("/", async (req, res) => {
    const cat = new Category(req.body);
    try {
        const savedCat = await cat.save();
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get category
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find().distinct("name");
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;