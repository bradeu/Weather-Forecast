import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = "5eb04deda7298300a2512c9e6ccb5486";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("index.ejs");
});

app.post("/submit", async function(req, res) {
    try {
        const response = await axios.get("http://api.weatherstack.com/current?access_key="+apiKey+"&query="+req.body.city);
        const result = response.data;
        const weather_descriptions = result.current.weather_descriptions[0];
        res.render("index.ejs", {data:weather_descriptions});
    } catch (error) {
        console.log(error.message);
    };
});

app.listen(port, function() {
    console.log("Server is running on port " + port);
});
