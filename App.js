const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/search.html");
})

app.post("/", function(req, res) {
	var word = req.body.word;
	var url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word;
	// https.get(url, function(response) {
	// 	response.on("data", function(data) {
	// 		const Data = JSON.parse(data);
	// 		console.log(Data[0].meanings[0].definitions[0].definition);

	// 		var word = Data[0].word;
	// 		var list = Data[0].meanings[0].definitions[0].synonyms

	// 		res.render("result", {word: word});
	// 	})
	// })
	res.render("result", { word: "/həˈloʊ/" });

})
app.listen(3000, function() {
	console.log("Server is up and running on port 3000");
})