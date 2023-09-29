import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

let hiddenSecret;
let username;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try{
        const response = await axios.get("https://secrets-api.appbrewery.com/random");
        const data = response.data;
        hiddenSecret = data.secret;
        username = data.username;
        res.render("index.ejs", {secret: hiddenSecret, user: username});
    }catch(error){
        console.error(`Failed to make request: ${error.message}`);
        res.status(404).send("Secret Not Found");
    }
    
})

app.listen(port, () => {
    console.log(`Server is running on port ${port} `);
})
