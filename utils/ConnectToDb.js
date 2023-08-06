const mongoose = require("mongoose"); // Import the Mongoose library for MongoDB interaction.
require("dotenv").config(); // Load environment variables from a .env file.

const connectDB = async () => {
    // Asynchronous function to connect to the MongoDB database.

    if (mongoose.connections[0].readyState) {
        // If the first connection in the Mongoose connections array is already in a ready state,
        // indicating that a connection is already established, return immediately and do not attempt
        // to connect again.
        return;
    }

    mongoose
        .connect(process.env.MONGODB_URI) // Connect to the MongoDB database using the provided URI from the .env file.
        .then((res) => {
            // If the connection is successful, this function will be called with a resolved value (res).

            console.log("Connected to mongodb."); // Log a message indicating that the connection is successful.
        })
        .catch((err) => {
            // If there is an error during the connection attempt, this function will be called with the error (err).
            throw err; 
            // Throw the error to handle it in the calling context (e.g., in the application's error handling).
        });
};

module.exports = { connectDB }; 
// Export the connectDB function to make it available for use in other parts of the application.
