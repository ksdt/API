/**
 * @module schema
 */

/**
 * @typedef {Object} User - A registered user of KSDT Radio
 * @property {String} userID - A unique identifier for each user (IMMUTABLE, REQUIRED, SERVER GENERATED)
 * @property {String} firstname - The user's firstname (REQUIRED)
 * @property {String} lastname - The user's lastname (REQUIRED)
 * @property {String} email - The user's email (REQUIRED)
 * @property {String} password - The user's hashed password (REQUIRED)
 * @property {String} studentID - The user's hashed student ID (OPTIONAL)
 * @property {String} badge - The user's current badge level (REQUIRED, SERVER GENERATED)
 * @property {Array.<String>} bookings - The user's booking history (REQUIRED, EMPTY BY DEFAULT)
 * @property {Array.<String>} sessions - The user's studio session history (REQUIRED, EMPTY BY DEFAULT)
 * @property {Array.<String>} requests - The user's current studio session requests (REQUIRED, EMPTY BY DEFAULT)
 * @property {Array.<String>} workshops - The user's registered workshops (REQUIRED, EMPTY BY DEFAULT)
 * @property {Array.<String>} qualifications - The user's qualifications (REQUIRED, EMPTY BY DEFAULT)
 * @property {Array.<String>} keys - The user's API keys (REQUIRED, EMPTY BY DEFAULT, MANAGED BY ADMINISTRATOR ONLY)
 * @description 
 */

/**
 * @typedef {Object} BookingHistory - History element for bookings
 * @property {String} userID - The ID of the user that created this event
 * @property {String} description - Description of the event
 * @property {Date} date - The Date for the event
 */

/**
 * @typedef {Object} Booking - A practice room booking
 * @property {String} bookingID - A unique identifier for each booking
 * @property {Date} date - The booking date
 * @property {Number} slot - The day slot for the booking
 * @property {Number} recurring - 0 is not recurring 1 is recurring
 * @property {String} userID - The id of the User holding the booking
 * @property {Array.<String>} waitlist - List of users waiting for vacancy
 * @property {Array.<BookingHistory>} history - List of events for this booking
 */

/**
 * @typedef {Object} SessionHistory - History element for studio requests
 * @property {String} userID - The ID of the user that created this event
 * @property {String} status - The current status of the request
 * @property {String} description - Description of the event
 * @property {Date} date - The Date for the event
 */

/**
 * @typedef {Object} Session - A session request
 * @property {String} title - The request's title
 * @property {String} userID - The unique ID of the user making the request
 * @property {Array.<String>} managers - List of users that can manage the request
 * @property {Date} schedule - Scheduled date for a session
 * @property {Array.<String>} attachments - List of attachments in the request
 * @property {Array.<SessionHistory>} history - List of events of a request
 */

/**
 * @typedef {Object} Workshop - A qualifying workshop
 * @property {String} title - A workshop's title
 * @property {Array.<String>} qualifications - List of qualifications granted by workshop
 * @property {Date} date - Date of the workshop
 * @property {Array.<String>} managers - List of users that can manage the workshop
 * @property {Array.<String>} registered - List of users registered for workshop
 * @property {Array.<String>} attendants - List of users that attended the workshop
 * @property {Array.<String>} attachments - List of attachments related to the workshop
 */

/**
 * @typedef {Object} Qualification - A qualification
 * @property {String} title - The qualification's title
 * @property {String} qualificationID - Unique identifier for qualification
 * @property {Array.<String>} qualified - List of qualified users
 * @property {Array.<String>} managers - List of users that can manage the qualification
 */

/**
 * @typedef {Object} Key - An API Key
 * @property {String} key - The hashed key value
 * @property {String} userID - The unique identifier of the user owning the key
 */

// Mongoose is an npm package that facilitates tansactions with an underlying MongoDB instance
const mongoose = require("mongoose");

// This connects the application to the MongoDB Instance
mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true});

let users = new mongoose.Schema({
    userID: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    studentID: String,
    badge: String,
    bookings: [String],
    sessions: [String],
    requests: [String],
    workshops: [String],
    qualifications: [String],
    keys: [String]
});

let bookings = new mongoose.Schema({
    bookingID: String,
    date: Date,
    slot: Number,
    recurring: Number,
    userID: String,
    waitlist: [String],
    history: [{
        userID: String,
        description: String,
        date: Date
    }]
});

let sessions = new mongoose.Schema({
    title: String,
    userID: String,
    managers: [String],
    schedule: Date,
    attachments: [String],
    history: [{
        userID: String,
        status: String,
        description: String,
        date: Date
    }]
});

let workshops = new mongoose.Schema({
    title: String,
    qualifications: [String],
    date: Date,
    managers: [String],
    registered: [String],
    attendants: [String],
    attachments: [String]
});

let qualifications = new mongoose.Schema({
    title: String,
    qualificationID: String,
    qualified: [String],
    managers: [String]
});

let keys = new mongoose.Schema({
    key: String,
    userID: String
});

module.exports = {
    mongoose: mongoose,
    User: new mongoose.model("User", users),
    Booking: new mongoose.model("Booking", bookings),
    Session: new mongoose.model("Session", sessions),
    Workshop: new mongoose.model("Workshop", workshops),
    Qualification: new mongoose.model("Qualification", qualifications),
    Key: new mongoose.model("Key", keys)
};
