const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities'); 
const {places, descriptors} = require('./seedHelpers');
const axios = require('axios');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database Connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

// async function seedImg() {
//     try {
//       const resp = await axios.get('https://api.unsplash.com/photos/random', {
//         params: {
//           client_id: 'rw1H_3uFXU_q7QDHZg4MO9PfhWNhJjc2oy8sK6mflt0',
//           collections: 1114848,
//         },
//       })
//       return resp.data.urls.small
//     } catch (err) {
//       console.error(err)
//     }
//   }

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6237a003c9e2088934c870c3',
            geometry: {
              type: 'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
              {
                url:'https://res.cloudinary.com/dcuoewzpw/image/upload/v1648071405/YelpCamp/fhlpoeznxayrkqe4gufz.jpg',
                filename: 'YelpCamp/fhlpoeznxayrkqe4gufz'
              },
              {
                url:'https://res.cloudinary.com/dcuoewzpw/image/upload/v1647983201/YelpCamp/aycka0n8qns4up9yltig.jpg',
                filename:'YelpCamp/aycka0n8qns4up9yltig'
              }
            ],
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!',
            price
        })
    await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
}) 

