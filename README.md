# Live Site Link

https://campground-reviews.herokuapp.com/

# Campground Directory

A yelp style site for campers and outdoor enthusiasts. Find information and what others think about camping spots to plan your next trip!

# Goal

To make a site experience similar to yelp while improving my skills with the technologies used.

# Technology Used

Javascript, Express, Node.js, MongoDB, Bootstrap, CSS.

NPM packages:

- body-parser, express, express-session, method-override, mongoose, passport, passport-local, passport-local-mongoose, node-geocoder, moment, dotenv.

# Design

Full CRUD for Campgrounds, Comments, and Ratings using callback RESTful routing.

User Model with Authentication and Authorization:

- Can't create something if not logged in. Only able to view Campgrounds, Comments, Ratings.
- Can't edit or delete if the user isn't logged in and if the item in question doesn't belong to user (campground/comment/rating).

Fuzzy Search:

- Able to search campground names on the campgrounds page.

UI: Bootstrap driven to decrease development time. Conditional logic for rendering elements depending on the user status (logged in, owner of post, etc).

# Next Steps

User Profiles, password reset, and social share

# Key Take Away

Even though I am confortable using pre ES6 javascript I can see the power and potential of implementing it as my best practice. An area where it is very evident is when dealing with Callbacks. Implementing routing with promises would be much cleaner and more powerful enabling async.
