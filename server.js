const express = require("express");
const app = express();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
var cors = require('cors');
var Logger = (exports.Logger = {});
var infoStream = fs.createWriteStream("logs/info.txt");
app.use(cors());
app.options('*', cors());
app.get('/tasks', cors (), function (req, res, next) {
	var number = req.query.number || 3;
	var result = axios.get('https://lorem-faker.vercel.app/api?quantity='+number)
	  .then(response => {
	    var data = [];
		var objectKeysArray = Object.keys(response.data)
		objectKeysArray.forEach(function(objKey) {
			var objValue = response.data[objKey];
			data.push({title:objValue,id:uuidv4()});
		});
		res.json(data);
	  })
	  .catch(error => {
		console.log(error);
	  });
 
})

app.post('/tasks',express.json({type: 'application/json'}), function(request, response) {
	var task = request.body;
	infoStream.write("id: "+task.id+" title: "+task.title);
    response.send({value:'this is an update '+task.id});
});

app.listen(3001, () => {
 console.log("Server running on port 3001np");
});