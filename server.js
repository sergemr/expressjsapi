const express = require("express");
const app = express();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
var cors = require('cors');
const { title } = require("process");
var Logger = (exports.Logger = {});
var infoStream = fs.createWriteStream("logs/info.txt");
app.use(cors());
app.options('*', cors());
app.get('/tasks', cors (), function (req, res, next) {
	var number = req.query.number || 3;
	var result = axios.get('https://lorem-faker.vercel.app/api?quantity='+number)
	  .then(response => {
		  console.log(response);
		  let dataArr = [];
		  response.data.map(title => {
			  let tempObj = {
				  UUiD: uuidv4(),
				  Title: title
			  }
			  dataArr.push(tempObj);
		  })
	 
		return res.json(dataArr);
	  })
	  .catch(error => {
		console.log(error);
	  });
 
})

//Log File Entry
//Log Location /logs/info.txt
app.put('/tasks',express.json({type: 'application/json'}), function(request, response) {
	var task = request.body;
	infoStream.write("id: "+task.id+" title: "+task.title+"\n");
    response.send({value:'this is an update '+task.id});
	console.log("id: "+task.id+" title: "+task.title);
});

app.listen(3001, () => {
 console.log("Server running on port 3001np");
});