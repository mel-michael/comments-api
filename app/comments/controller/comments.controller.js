  var Comment = require('../models/comments.model');
  var express = require('express');
  var router  = express.Router();

  module.exports = {

    getAllComments: function(req, res){
      Comment.find(function(err, comments){
        if(err){
          return res.send(err);
        }
        res.json(comments); //return all comments 
        console.log("Get all comments");
      });
    },

    getComment: function(req, res){
      Comment.findOne({name : req.params.name}, function(err, comments){
        if(err){
          return res.send(err);
        }
        res.json(comments); //return all comments 
        console.log("Got a comment");
      });
    },

    postComment: function(req, res){
      var newComment = new Comment(req.body);
      newComment.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message: "Comment successfully added!"});
        console.log("comment posted");
      });
    },

    updateComment: function(req, res){
      Comment.findOne({name: req.params.name}, function(err, comment){
        if(err){
          res.send(err);
        }

        for(com in req.body){
          comment[com] = req.body[com];
        }
        //save comment
        comment.save(res.json({ message: "Update successful!" }));
        console.log("Updated comment");
      });
    },

    removeComment: function(req, res){
      Comment.remove({name: req.params.name}, function(err, comment){
        if(err){
          res.send(err);
        }
        res.json({ message: "Comment deleted!"});
        console.log("Deleted comment");
      });
    }
  }


  