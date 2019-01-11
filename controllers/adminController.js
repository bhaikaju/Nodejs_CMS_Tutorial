module.exports =  {

   index:  (req, res) => {
        res.render('admin/index');
    },
    
    
    getPosts: (req, res) => {
       res.send("All Posts");
    },
    
    submitPosts: (req, res) => {
       res.send("Post Submitted");
    },
    
    createPosts: (req, res) => {
       res.render('admin/posts/create');
    }
    
    
};