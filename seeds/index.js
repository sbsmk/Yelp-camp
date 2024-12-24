const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
.then(()=>{
  console.log("Database connected");
})
.catch((err)=>{
  console.log("Database connection error:", err);
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "676904e8d1cd5e38b5b5f2c8",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque quos quasi accusantium soluta reprehenderit repellat neque totam nesciunt, accusamus dolores eos blanditiis dignissimos ad ab delectus dolorum sapiente commodi incidunt?",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dvvhdhso1/image/upload/v1733135704/Yelpcamp/vetiffumcoqflubifwhf.jpg",
          filename: "Yelpcamp/vetiffumcoqflubifwhf",
        },
        {
          url: "https://res.cloudinary.com/dvvhdhso1/image/upload/v1733135704/Yelpcamp/vetiffumcoqflubifwhf.jpg",
          filename: "Yelpcamp/vetiffumcoqflubifwhf",
        },
      ],
    });
    await camp.save();
  }
};


seedDB();







// const seedDB = async () => {
//   try {
//     console.log("Deleting all campgrounds...");
//     await Campground.deleteMany({});
//     console.log("All campgrounds deleted!");

//     const camp = new Campground({
//       title: "Test Campground",
//       description: "This is a test description",
//       price: 10,
//     });

//     console.log("Saving a new campground...");
//     await camp.save();
//     console.log("New campground saved successfully!");
//   } catch (error) {
//     console.error("Error during seeding:", error);
//   } finally {
//     mongoose.connection.close();
//     console.log("Database connection closed.");
//   }
// };



