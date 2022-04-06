/**
 * SecurityFunctions Functions
 * @namespace securityFunctions
 */
require("dotenv").config();
const securityFunctions = require("crypto-js");
const schema = require(__dirname + "/schema.js");

/**
 * Hashes the password passed in and then returns it.
 * @memberof securityFunctions
 * @param {String} password The password to hash.
 * @return Returns the hashed password.
 */
function hashPass (password) {
	return securityFunctions.HmacSHA256(password, process.env.HASHKEY).toString();
}

/**
 * Encrypts the message using the password as key and then returns the encrypted message.
 * @memberof securityFunctions
 * @param {String} message The text to encrypt.
 * @param {String} password The password to use as a key.
 * @return The encrypted message.
 */
function encrypt (message, password) {
	return securityFunctions.AES.encrypt(message, password).toString();
}

/**
 * Decrypts the data using the password as key and then returns it.
 * @memberof securityFunctions
 * @param {String} data The text to decrypt.
 * @param {String} password The password to use as key.
 * @return Returns the decrypted data.
 */
function decrypt (data, password) {
	return securityFunctions.AES.decrypt(data, password).toString(securityFunctions.enc.Utf8);
}

/**
 * Authenticates the user based on email and password in userDate
 * @memberof securityFunctions
 * @param {Object} userData The object that contains the email and password to authenticate.
 * @callback (response,error) Sends either true or false based on whether the email and password were authenticated or not, as well as an appropriate error message.
 */
function authenticate (userData, callback) {
	schema.User.findOne({email: userData.email}, (error, user) => {
		if (error || user === null) {
			callback(false, "USER NOT FOUND");
		} else {
			callback(hashPass(userData.password) === user.password, "WRONG PASSWORD");
		}
	});
}

/**
 * @module securityFunctions
 */
module.exports = {
	hashPass: hashPass,
	encrypt: encrypt,
	decrypt: decrypt,
	authenticate: authenticate
};
