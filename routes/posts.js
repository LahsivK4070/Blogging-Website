const router = require("express").Router();
const User = require("../modals/User");
const Post = require("../modals/Post");


// create post route
router.post("/", async (req, res) => {

    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// update post
router.put("/:id", async (req, res) => {
   try {
       const post = await Post.findById(req.params.id);
       if (post.userName === req.body.userName) {
           try {
               const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                   $set: req.body,
               }, { new: true });

               res.status(200).json(updatedPost);
           } catch (error) {
               res.status(500).json(error);
           }
       }
       else {
           res.status(401).json("You can update your post only");
       }
       
   } catch (error) {
       res.status(error).json(error);
   }
})

// delete post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userName === req.body.userName) {
            
            await post.delete();
            res.status(200).json("Post deleted!");
        } else {
            res.status(401).json("You can delete only your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// get post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all posts
router.get("/", async (req, res) => {
    const userName = req.query.user;
    const categoryName = req.query.cat;
    try {
        
        let posts;
        if (userName) {
            posts = await Post.find({ userName });
        } else if (categoryName) {
            posts = await Post.find({
                category: { $in: [categoryName], },
            });
        } else {
            posts = await Post.find();
        }

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json(error);
    }
})

// delete all posts
router.delete("/", async (req, res) => {
    const userName = req.query.user;
    try {   
        let posts;
        if (userName) {
           await Post.deleteMany({ userName });
        } else {
            res.status(500).json(error);
        }
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;