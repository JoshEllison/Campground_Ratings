const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const middleware = require('../middleware'); //automatically requires index.js
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);

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
router.post('/', middleware.isLoggedIn, (req, res) => {
  let name = req.body.name;
  let price = req.body.price;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  geocoder.geocode(req.body.location, (err, data) => {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    let lat = data[0].latitude;
    let lng = data[0].longitude;
    let location = data[0].formattedAddress;
    let newCampground = {name: name, price: price, image: image, description: desc, author: author, location: location, lat: lat, lng: lng};


    //create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/campgrounds');
      }
    });
  });
});

//NEW - show form to create new campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
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
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
      res.render('campgrounds/edit', {campground: foundCampground});
    });
});

// UPDATE - Campground Route
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  geocoder.geocode(req.body.location, (err, data) => {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCamground) => {
      if (err) {
        req.flash('error', err.message);
        res.redirect('/campgrounds');
      } else {
        req.flash('success', 'Successfully Updated!');
        res.redirect('/campgrounds/' + req.params.id);
      }
    });
  });
});

// DESTROY - Campground Route
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;
