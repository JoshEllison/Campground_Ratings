const express = require('express');
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let campgrounds = [
    {name: 'Salmon Creek', image: 'https://www.outdoorproject.com/sites/default/files/styles/hero_image_desktop/public/features/dscf9483.jpg?itok=Ljgs4oeN'},
    {name: "Devil's Punchbowl", image: 'https://oregonwild.org/sites/default/files/punchbowlfall.sungchoi.jpg'},
    {name: 'Windy Creek', image: 'http://www.wildscenicrogue.com/wp-content/uploads/2016/01/DSC_0109.jpg'}
  ];

app.get('/', (req, res) =>
res.render('landing'));

app.get('/campgrounds', (req, res) => {


  res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back to campgrounds Page
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.listen(port, () => console.log(`YelpCamp app listening on port ${port}!`))
