module.exports = function(app, User, Post, Word)
{
  app.get('/user',function(req,res){
    console.log('get_user');
    User.find(function(err,users){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(users);
    });
  });

  app.post('/user/signup',function(req,res){
    var user = new User();
    user.id = req.body.id;
    user.pw = req.body.pw;
    user.uid = req.body.uid;
    user.name = req.body.name;
    user.class = parseInt(req.body.class);

    console.log(user.id);
    console.log(user.pw);
    console.log(user.uid);
    console.log(user.name);
    console.log(user.class);

    user.save(function(err){
      if(err){
        console.error(err);
        res.json({result:'1'});
        return;
      }
      res.json({result: '0'});
    });
  });

  app.post('/user/login',function(req,res){
    User.findOne({id:req.body.id, pw:req.body.pw},function(err,user){
      if(err) return res.status(500).send({error: 'database failure'});
      if(!user) return res.status(404).send({success:'1'});
      res.json({success:'0'});
    });
  });

  app.post('/user/getUser',function(req,res){
    User.findOne({id:req.body.id},function(err,user){
      if(err) return res.status(500).send({error: 'database failure'});
      if(!user) return res.status(404).send({success:'1'});
      res.json({success:'0',name:user.name});
    });
  });



  app.post('/post',function(req,res){
    Post.find({postType: req.body.postType},function(err,posts){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(posts);
    });
  });

  app.post('/post/scrum',function(req,res){
    Post.find({postSort: req.body.postSort},function(err,posts){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(posts);
    });
  });

  app.post('/post/getPost',function(req,res){
    Post.findOne({_id: req.body.token},function(err,post){
      if(err) return res.status(500).send({error: 'database failure'});
      if(!post) return res.status(404).send({error: 'post Not Found'});
      res.json(post);
    });
  });

  app.post('/post/comments/new',function(req,res){
    Post.findOne({_id: req.body.token},function(err,post){
      if(err) return res.status(500).send({error: 'database failure'});
      if(!post) return res.status(404).send({error: 'post Not Found'});

      var newComment={
        name : req.body.name,
        body : req.body.body
      };

      if(req.body.name && req.body.body) post.comments.push(newComment);

      post.save(function(err){
        if(err) res.status(500).json({error: 'failed to update'});
        res.json({message: 'post updated'});
      });
    });
  });


  app.post('/post/new',function(req,res){
    var post = new Post();
    post.postSort = req.body.postSort;
    post.postType = req.body.postType;
    post.postName = req.body.postName;
    post.postCode = req.body.postCode;
    post.postText = req.body.postText;
    post.postedBy = req.body.postedBy;
    post.privacy = req.body.privacy;
    post.updatedOn = req.body.updatedOn;

    post.save(function(err){
      if(err){
        res.json({result:'1'});
        return;
      }

      res.json({result:'0'});
    });
  });

  app.delete('/post',function(req,res){
    Post.deleteMany({postType: req.body.postType},function(err){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json({result: '0'});
    });
  });

  app.post('/post/word',function(req,res){
    var word = new Word();
    word.first = req.body.first;
    word.second = req.body.second;
    word.third = req.body.third;

    word.save(function(err){
      if(err){
        res.json({result:'1'});
        return;
      }

      res.json({result:'0'});
    });
  });

  app.get('/word/getOne',function(req,res){
    Word.find(function(err,words){
      if(err) return res.json({error: err});


      return res.json(words[Math.floor(Math.random() * 6)]);
    });
  });

  app.get('/post/word',function(req,res){
    Word.find(function(err,words){
      if(err) return res.json({error: err});
      return res.json(words);
    });
  });

  app.delete('/post/word',function(req,res){
    Word.deleteMany(function(err){
      if(err) return res.status(500).send({error:'database failure'});
      res.json({result:0});
    });
  });
};
