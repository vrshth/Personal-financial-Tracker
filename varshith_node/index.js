const http = require("http");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

// Port number that server listens to
const PORT = 4198;

const financeDetails = async (client) => {
    //Fetches records from given database
    const cursor = await client.db("FinanceTrackerDB").collection("FinanceTracker").find({});
    const results = await cursor.toArray();
    return JSON.stringify(results);
}

//Creates HTTP Server(i.e our system acts as server)
http.createServer(async (req, res) => {
    if (req.url === "/api") {
        const URL = "mongodb+srv://varshith7756:varshithgundla@financetrackercluster.hoczj.mongodb.net/?retryWrites=true&w=majority&appName=FinanceTrackerCluster";

        // Creating a new client for connecting to database
        const client = new MongoClient(URL);
        try {
            // Connects to database
            await client.connect();
            console.log("Database is connected sucessfully");
            const financeData = await financeDetails(client);
            // Handling CORS Issue
            res.setHeader("Access-Control-Allow-Origin", '*');
            res.writeHead(200, { "content-type": "application/json" });
            res.end(financeData);
        }
        catch (err) {
            console.error("Error in connecting database", err);
        }
        finally {
            //Closing connection to database
            await client.close();
            console.log("Database connection is closed");
        }
    }
    else {
        const mediaTypes = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
            ".json": "application/json",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".txt": "text/plain"
        };
        const fileLocation = path.join(
            __dirname,
            "public",
            req.url === "/" ? "index.html" : req.url
        );
        const fileExtension = path.extname(fileLocation).toLowerCase();
        const mediaType = mediaTypes[fileExtension];
        fs.readFile(fileLocation, (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    res.writeHead(404, { "content-type": "text/html" });
                    res.end("<h1>404 Page Not Found!</h1>");
                } else {
                    res.writeHead(500, { "content-type": "text/plain" });
                    res.end("Internal Server Error");
                }
            } else {
                //Assigning content-type based on file extension
                res.writeHead(200, { "content-type": mediaType });
                res.end(data);
            }
        });
    }
}).listen(PORT, () => console.log(`Server is running on ${PORT}`));