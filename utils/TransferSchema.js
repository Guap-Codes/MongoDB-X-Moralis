// Importing the mongoose library, which provides an Object Data Modeling (ODM) layer for MongoDB.
const mongoose = require("mongoose");

// Defining a new mongoose schema called "transferSchema" to specify the structure of the data for transfers.
const transferSchema = new mongoose.Schema(
    {
        // "fromAddress" field representing the address from where the transfer originates.
        fromAddress: {
            type: String,
        },
        // "toAddress" field representing the address where the transfer is sent to.
        toAddress: {
            type: String,
        },
        // "value" field representing the value of the transfer (e.g., amount of cryptocurrency or asset being transferred).
        value: {
            type: String,
        },
        // "valueWithDecimals" field representing the value of the transfer with decimals (if applicable).
        valueWithDecimals: {
            type: String,
        }
    },
    // Optional settings for the schema.
    // { timestamps: true } adds "createdAt" and "updatedAt" fields to the documents to track creation and modification timestamps.
    { timestamps: true }
);

// Creating a mongoose model called "Transfers" based on the "transferSchema".
// The model is assigned to a variable "Transfers" that will be used to interact with the MongoDB collection.
// If the "Transfers" model already exists (e.g., it was created before), use it; otherwise, create a new one.
let Transfers = mongoose.models.transfers || mongoose.model("transfers", transferSchema);

// Exporting the "Transfers" model so that it can be used by other modules in the application to interact with the MongoDB collection.
module.exports = { Transfers };
