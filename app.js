const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const seedDB = require('./seeds');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const db = mongoose.connection;

//requiring routes
const commentRoutes = require('./routes/comments')
const campgroundRoutes = require('./routes/campgrounds')
const indexRoutes = require('./routes/index')


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://josh4ellison:ProjectPassword1212@dbcluster-jbbih.mongodb.net/test?retryWrites=true&w=majority');

// mongodb+srv://josh4ellison:ProjectPassword1212@dbcluster-jbbih.mongodb.net/test?retryWrites=true&w=majority

//works but errors on first button click
// 'mongodb://heroku_z7l5cnzr:ProjectPassword1212@ds237723.mlab.com:37723/heroku_z7l5cnzr';
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', 'mongodb://heroku_z7l5cnzr:ProjectPassword1212@ds237723.mlab.com:37723/heroku_z7l5cnzr'));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

// seedDB(); //seed the database
//==================================
// PASSPORT CONFIGURATION
//==================================
app.use(require('express-session')({
  secret: 'Winning is what Cooper is best at!',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware
app.use((req, res, next) => {
  res.locals.currentUser= req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});


app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(PORT, () => console.log(`YelpCamp app listening on port ${PORT}!`))
