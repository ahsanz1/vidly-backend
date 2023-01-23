require("dotenv-flow").config();
const { default: mongoose } = require("mongoose");
const { Genre } = require("./models/genre");
const { Movie } = require("./models/movie");
const { User } = require("./models/user");
const bcrypt = require("bcrypt");
const { Customer } = require("./models/customer");
const { Rental } = require("./models/rental");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};

const clearVidlyDB = async () => {
  try {
    await Genre.deleteMany({});
    await Movie.deleteMany({});
    await User.deleteMany({});
    await Customer.deleteMany({});
    await Rental.deleteMany({});
    console.log("DB Cleared!");
  } catch (error) {
    console.log("Error clearing vidly DB", error);
  }
};

const hashPW = (pw) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pw, salt);
};

const seedVidlyDB = async () => {
  const genres = ["Sci-Fi", "Mystery", "Drama", "Horror", "Comedy", "Thriller"];
  const movies = [
    {
      title: "Intersteller",
      genre: { name: "Sci-Fi" },
      numberInStock: 100,
      dailyRentalRate: 3,
    },
    {
      title: "Ad Astra",
      genre: { name: "Sci-Fi" },
      numberInStock: 100,
      dailyRentalRate: 5,
    },
    {
      title: "Inception",
      genre: { name: "Sci-Fi" },
      numberInStock: 100,
      dailyRentalRate: 4,
    },
    {
      title: "Under Suspicion",
      genre: { name: "Drama" },
      numberInStock: 100,
      dailyRentalRate: 3.5,
    },
    {
      title: "Murder Mystery",
      genre: { name: "Drama" },
      numberInStock: 100,
      dailyRentalRate: 5.7,
    },
    {
      title: "Good Will Hunting",
      genre: { name: "Drama" },
      numberInStock: 100,
      dailyRentalRate: 5.1,
    },
    {
      title: "Georgetown",
      genre: { name: "Drama" },
      numberInStock: 100,
      dailyRentalRate: 4.5,
    },
    {
      title: "Split",
      genre: { name: "Horror" },
      numberInStock: 100,
      dailyRentalRate: 2.7,
    },
    {
      title: "Case 39",
      genre: { name: "Horror" },
      numberInStock: 100,
      dailyRentalRate: 3.9,
    },
    {
      title: "Red Notice",
      genre: { name: "Comedy" },
      numberInStock: 100,
      dailyRentalRate: 4.4,
    },
    {
      title: "Man From Toronto",
      genre: { name: "Comedy" },
      numberInStock: 100,
      dailyRentalRate: 6.1,
    },
    {
      title: "Zodiac",
      genre: { name: "Thriller" },
      numberInStock: 100,
      dailyRentalRate: 4.9,
    },
    {
      title: "Primal Fear",
      genre: { name: "Thriller" },
      numberInStock: 100,
      dailyRentalRate: 6.3,
    },
  ];
  const users = [
    {
      name: "John C",
      email: "john@gmail.com",
      password: hashPW("123123"),
    },
    {
      name: "Stacy",
      email: "stacy@gmail.com",
      password: hashPW("123123"),
      isAdmin: true,
    },
  ];
  const customers = [
    { name: "Judy A", isGold: false, phone: "0000000000" },
    { name: "Michael", isGold: true, phone: "0000000000" },
  ];
  // const rentals = [
  //   {
  //     customer:
  //       Math.random() > 0.5
  //         ? mongoose.Schema.Types.ObjectId(newCustomers[1]._id)
  //         : mongoose.Schema.Types.ObjectId(newCustomers[0]._id),
  //     movie: mongoose.Schema.Types.ObjectId(
  //       newMovies[Math.random() * (13 - 0) + 0]._id
  //     ),
  //   },
  //   {
  //     customer:
  //       Math.random() > 0.5
  //         ? mongoose.Schema.Types.ObjectId(newCustomers[1]._id)
  //         : mongoose.Schema.Types.ObjectId(newCustomers[0]._id),
  //     movie: mongoose.Schema.Types.ObjectId(
  //       newMovies[Math.random() * (13 - 0) + 0]._id
  //     ),
  //   },
  // ];
  try {
    const newGenres = await Genre.insertMany(genres.map((g) => ({ name: g })));
    console.log("New genres inserted", newGenres);
    const newMovies = await Movie.insertMany(movies);
    console.log("New movies inserted", newMovies);
    const newUsers = await User.insertMany(users);
    console.log("New users added", newUsers);
    const newCustomers = await Customer.insertMany(customers);
    console.log("New customers added", newCustomers);
    const newRentals = await Rental.insertMany(
      [1, 2].map((n, idx) => ({
        customerId: newCustomers[idx]._id,
        movieId: newMovies[Math.floor(Math.random() * (13 - 1) + 1)]._id,
      }))
    );
    console.log("New rentals added", newRentals);
  } catch (error) {
    console.log("Error occured while seeding DB", error);
  }
  await mongoose.connection.close();
};

connectToDB()
  .then(async () => {
    await clearVidlyDB();
    await seedVidlyDB();
  })
  .catch((err) => console.log("ERROR", err));
