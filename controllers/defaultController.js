const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;

module.exports = {
  
    index:  async (req, res) => {
        
        const posts = await Post.find();
        const categories = await Category.find();
        
        res.render('default/index', {posts: posts, categories: categories});
    },
    
    loginGet: (req, res) => {
        res.render('default/login');
    },
    
    loginPost: (req, res) => {
      res.send("Congratulations, you've successfully submitted the data.");  
    },
    
    registerGet: (req, res) => {
        res.render('default/register');
    },
    
    registerPost: (req, res ) => {
        res.send("Successfully Registered.");
    }
    
};
