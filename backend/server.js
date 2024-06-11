// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/lively', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).send('User signed up successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    res.status(200).json({ username: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(401).send('Login failed');
  }
});

const userDetailsSchema = new mongoose.Schema({
  useremail: String,
  username: String,
  weight: Number,
  height: Number,
  goaltype: String,
  weightgoal: Number
});

const UserDetails = mongoose.model('userdetails', userDetailsSchema);

// Route to fetch user details or add new user details if not found
app.get('/userprofile', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const username = req.query.username;
    let userDetails = await UserDetails.findOne({ useremail: userEmail });

    if (!userDetails) {
      // If user details not found, create a new document
      userDetails = new UserDetails({
        username: username,
        useremail: userEmail,
        weight: '',
        height: '',
        goaltype: '',
        weightgoal: ''
      });
      await userDetails.save();
    }

    res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching or adding user details');
  }
});

app.put('/userprofile/update', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const weight = req.query.weight;
    const height = req.query.height;

    const userDetails = await UserDetails.findOneAndUpdate(
      { useremail: userEmail },
      { $set: { weight: weight, height: height } },
      { new: true }
    );

    if (!userDetails) {
      throw new Error('User details not found');
    }

    res.status(200).json({ message: 'Weight and height updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating weight and height');
  }
});

// API endpoint to update user details for new goal
app.post('/userdetails/update', async (req, res) => {
  try {
    const { useremail, weight, height, goaltype, weightgoal } = req.body;

    // Find the user details by user email
    let userDetails = await UserDetails.findOne({ useremail });

    // If user details not found, create a new document
    if (!userDetails) {
      userDetails = new UserDetails({
        useremail,
        weight,
        height,
        goaltype,
        weightgoal
      });
    } else {
      // Update existing user details
      userDetails.weight = weight;
      userDetails.height = height;
      userDetails.goaltype = goaltype;
      userDetails.weightgoal = weightgoal;
    }

    // Save the user details to the database
    await userDetails.save();

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user details' });
  }
});

// API endpoint to fetch user details
app.get('/userdetails', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const userDetails = await UserDetails.findOne({ useremail: userEmail });

    if (!userDetails) {
      throw new Error('User details not found');
    }

    res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user details');
  }
});

const dailyInputSchema = new mongoose.Schema({
  useremail: String,
  date: Date,
  calorieIntake: Number,
  caloriesBurned: Number,
  todayWeight: Number,
});

const DailyInput = mongoose.model('dailyinput', dailyInputSchema);

// API endpoint to save daily activity inputs
app.post('/dailyinputs/add', async (req, res) => {
  try {
    const { useremail, date, calorieIntake, caloriesBurned, todayWeight } = req.body;

    // Check if the entry already exists for the user email and date
    let existingEntry = await DailyInput.findOne({ useremail, date });

    if (existingEntry) {
      // If entry exists, update it with the new data
      existingEntry.todayWeight = todayWeight;
      existingEntry.calorieIntake = calorieIntake;
      existingEntry.caloriesBurned = caloriesBurned;
      await existingEntry.save();
    } else {
      // If entry doesn't exist, create a new one
      const newDailyInput = new DailyInput({
        useremail,
        date,
        calorieIntake,
        caloriesBurned,
        todayWeight
      });
      await newDailyInput.save();
    }

    res.status(200).json({ message: 'Daily activity saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving daily activity' });
  }
});

// API endpoint to fetch daily activity inputs
app.get('/dailyinputs', async (req, res) => {
  try {
    const userEmail = req.query.useremail;

    // Find all daily inputs for the specified user email
    const dailyInputs = await DailyInput.find({ useremail: userEmail });

    res.status(200).json(dailyInputs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching daily activity inputs' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
