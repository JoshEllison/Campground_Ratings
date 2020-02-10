const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');

//INDEX - show all campgrounds
router.get('/', (req, res) => {
  console.log(req.user);
  // Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

//CREATE - add new campground to DB
router.post('/', isLoggedIn, (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
      id: req.user._id,
      username: req.user.username
    };
    let newCampground = {name: name, image: image, description: desc, author: author};
    //create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/campgrounds');
      }
    });
});

//NEW - show form to create new campground
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new.ejs');
});

//SHOW - individual campgrounds
router.get('/:id', (req, res) => {
  //find the campground with given ID
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground)
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

// EDIT - Campground Route
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
          res.render('campgrounds/edit', {campground: foundCampground});
    });
});

// UPDATE - Campground Route
router.put('/:id', checkCampgroundOwnership, (req, res) => {
  // find and update the correct campground

  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCamground) => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

// DESTROY - Campground Route
router.delete('/:id', checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkCampgroundOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        res.redirect('back')
      } else {
        // does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
}

module.exports = router;
