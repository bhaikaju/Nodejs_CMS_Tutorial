const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Comment = require('../models/CommentModel').Comment;
const {isEmpty} = require('../config/customFunctions');

module.exports = {

    index: (req, res) => {
        res.render('admin/index');

    },


    /* ADMIN POSTS ENDPOINTS */


    getPosts: (req, res) => {
        Post.find()
            .populate('category')
            .then(posts => {
                res.render('admin/posts/index', {posts: posts});
            });
    },


    getCreatePostPage: (req, res) => {
        Category.find().then(cats => {

            res.render('admin/posts/create', {categories: cats});
        });


    },

    submitCreatePostPage: (req, res) => {

        const commentsAllowed = !!req.body.allowComments;

        // Check for any input file
        let filename = '';

        if (!isEmpty(req.files)) {
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';

            file.mv(uploadDir + filename, (err) => {
                if (err)
                    throw err;
            });
        }

        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            allowComments: commentsAllowed,
            category: req.body.category,
            file: `/uploads/${filename}`
        });

        newPost.save().then(post => {
            req.flash('success-message', 'Post created successfully.');
            res.redirect('/admin/posts');
        });
    },

    getEditPostPage: (req, res) => {
        const id = req.params.id;

        Post.findById(id)
            .then(post => {
                Category.find().then(cats => {
                    res.render('admin/posts/edit', {post: post, categories: cats});
                });
            });
    },

    submitEditPostPage: (req, res) => {
        const commentsAllowed = !!req.body.allowComments;
        const id = req.params.id;
        Post.findById(id)
            .then(post => {
                post.title = req.body.title;
                post.status = req.body.status;
                post.allowComments = commentsAllowed;
                post.description = req.body.description;
                post.category = req.body.category;


                post.save().then(updatePost => {
                    req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                    res.redirect('/admin/posts');
                });
            });
    },

    deletePost: (req, res) => {

        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {
                req.flash('success-message', `The post ${deletedPost.title} has been deleted.`);
                res.redirect('/admin/posts');
            });
    },


    /* ALL CATEGORY METHODS*/
    getCategories: (req, res) => {

        Category.find().then(cats => {
            res.render('admin/category/index', {categories: cats});
        });
    },

    createCategories: (req, res) => {
        let categoryName = req.body.name;

        if (categoryName) {
            const newCategory = new Category({
                title: categoryName
            });

            newCategory.save().then(category => {
                res.status(200).json(category);
            });
        }

    },

    getEditCategoriesPage: async (req, res) => {
        const catId = req.params.id;

        const cats = await Category.find();


        Category.findById(catId).then(cat => {

            res.render('admin/category/edit', {category: cat, categories: cats});

        });
    },


    submitEditCategoriesPage: (req, res) => {
        const catId = req.params.id;
        const newTitle = req.body.name;

        if (newTitle) {
            Category.findById(catId).then(category => {

                category.title = newTitle;

                category.save().then(updated => {
                    res.status(200).json({url: '/admin/category'});
                });

            });
        }
    },

    /* COMMENT ROUTE SECTION*/
    getComments: (req, res) => {
        Comment.find()
            .populate('user')
            .then(comments => {
                res.render('admin/comments/index', {comments: comments});
            })
    },
    
    approveComments: (req, res) => {
        var data = req.body.data;
        var commentId = req.body.id;
        
        console.log(data, commentId);

        Comment.findById(commentId).then(comment => {
            comment.commentIsApproved = data;
            comment.save().then(saved => {
                res.status(200).send('OK');
            }).catch(err => {
                res.status(201).send('FAIL');
            });
        });
    }


};

