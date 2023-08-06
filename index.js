const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Transfer = require("./utils/TransferSchema").Transfers;
const connectDB = require("./utils/ConnectToDb").connectDB;

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
app.use(express.json()); // Parse incoming request data in JSON format.

// POST request handler for the "/webhook" endpoint.
app.post("/webhook", async (req, res) => {
    const { body } = req; // Extract the request body.

    if (body.confirmed) {
        // If the body contains a "confirmed" property, respond with 200 status code and an empty JSON object.
        return res.status(200).json();
    }

    // Connect to the database.
    await connectDB();

    let newTransfers = []; // Array to hold the new transfers data.

    // Loop through each transfer object in the "erc20Transfers" array in the request body.
    for (transfer of body.erc20Transfers) {
        // Add each transfer data to the "newTransfers" array.
        newTransfers.push({
            fromAddress: transfer.from,
            toAddress: transfer.to,
            value: transfer.value,
            valueWithDecimals: transfer.valueWithDecimals, 
        });
    }

    // If there are new transfers data in the "newTransfers" array, insert them into the database.
    if (newTransfers.length > 0) {
        await Transfer.insertMany(newTransfers);
        console.log("Added New Transfers to DB");
    }

    // Respond with a 200 status code and an empty JSON object.
    return res.status(200).json();
});

// Start the server and listen on the specified port.
app.listen(port, () => {
    console.log(`Listening to streams`);
});
