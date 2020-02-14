# Campground Directory
A yelp style site for campers and outdoor enthusiasts. Find information and what others think about camping spots to plan your next trip! The goal of this project is to eventually have similar functionality to Yelp. I will continue to build out additional functionality over time.

# Technology Used
Javascript, Express, Node.js, MongoDB, Bootstrap, CSS.

NPM packages:
- body-parser, express, express-session, method-override, mongoose, passport, passport-local, passport-local-mongoose, node-geocoder, moment, dotenv.

# Design
Full CRUD for Campgrounds and Comments using callback RESTful routing.

User Model with Authentication and Authorization:
- Can't create something if not logged in. Only able to view Campgrounds and Comments.
- Can't edit or delete if the user isn't logged in and if the item in question doesn't belong to user (campground/comment).

UI: Bootstrap driven to decrease development time. Conditional logic for rendering elements depending on the user status (logged in, owner of post, etc).

# Next Steps
User Profiles, password reset, search, and social share

# Challenges
As the project grows so does the callback.

# Live Site Link
https://campground-reviews.herokuapp.com/
