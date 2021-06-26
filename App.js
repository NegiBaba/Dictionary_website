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
	https.get(url, function(response) {
		response.on("data", function(data) {
			const Data = JSON.parse(data);
			
			var word = Data[0].word;
			var list = Data[0].phonetics;
			var length = Data[0].meanings.length;
			var boxWidth = 12 / length;
			var partsOfSpeach = Data[0].meanings;

			console.log(partsOfSpeach);
			res.render("result", {word: word, list: list, 
							length: length, boxWidth: boxWidth,
								partsOfSpeach: partsOfSpeach});
			})
	})

})
app.listen(3000, function() {
	console.log("Server is up and running on port 3000");
})