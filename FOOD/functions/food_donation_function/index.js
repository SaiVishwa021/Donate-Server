
var express = require('express');
var app = express();
var catalyst = require('zcatalyst-sdk-node');
app.use(express.json());

app.use(express.json());
const tableName = 'Donation'; // The table created in the Data Store
const columnName = 'Restaurant_name';

app.post('/insert_data', (req, res) => {
	console.log("Donate")
	//initialize catalyst instance
	var catalystApp = catalyst.initialize(req);
	//initialize datastore component
	var datastore = catalystApp.datastore();
	//specify rowData as json
	var rowData = req.body;
	console.log(req.body)
	//select table to insert rows
    let table = datastore.table('Donation');
    let insertPromise = table.insertRow(rowData);

	// insert rows in a promise; Handle success and failure cases
    insertPromise.then((row) => {
		//success response
            console.log(row);
			res.send(row);
        }).catch(err => {
			//error response
			console.log(err);
			sendErrorResponse(err);
			});
			
});


app.post('/fill_data', (req, res) => {
	console.log("Donate")
	//initialize catalyst instance
	var catalystApp = catalyst.initialize(req);
	//initialize datastore component
	var datastore = catalystApp.datastore();
	//specify rowData as json
	var rowData = req.body;
	console.log(req.body)
	//select table to insert rows
    let table = datastore.table('Accept');
    let insertPromise = table.insertRow(rowData);

	// insert rows in a promise; Handle success and failure cases
    insertPromise.then((row) => {
		//success response
            console.log(row);
			res.send(row);
        }).catch(err => {
			//error response
			console.log(err);
			sendErrorResponse(err);
			});
			
});

    

app.get('/order', function (req, res) {
		var catalystApp = catalyst.initialize(req);
		var data = [];
		getDonationFromDataStore(catalystApp).then(
			notes => {
				var html = "";
				
				notes.forEach(element => {
					//Creates a HTML for the list of items retrieved from the Data Store
					
					html = html.concat('<li value="' + element.Donation.ROWID + '">' +
					"<div style='color: white;background-color: grey; width:350px;padding: 25px;margin: 10px; border-radius:7px'>"
					+"<p><strong style='color:#63d1a7'>OrderID:</strong>"+element.Donation.ROWID+"</p>"
					+"<p><strong style='color:#63d1a7'>Restaurant Name:</strong>"+element.Donation.Restaurant_name+"</p>" 
					+"<p><strong style='color:#63d1a7'>Address:</strong>"
					+ element.Donation.Address+"</p>" +"<p><strong style='color:#63d1a7'>Contact:</strong>"
					+ element.Donation.Phone_no +"</p>"+"<p><strong style='color:#63d1a7'>Mail:</strong>"
					+ element.Donation.Email+"</p>"+"<p><strong style='color:#63d1a7'>City:</strong>"
					+ element.Donation.City+"</p>"+"<p><strong style='color:#63d1a7'>Time:</strong>"
					+ element.Donation.CREATEDTIME+"</p>"+"<p><strong style='color:#63d1a7'>Preference:</strong>"
					+ element.Donation.Preference+"</p>"+"<p><strong style='color:#63d1a7'>Availablity:</strong>"
					+ element.Donation.Availability
					+"(persons)</p>" +"<a href='acceptance.html'><input type='submit'value='PLACE ORDER'  onclick='this.value='ORDERED'' style='padding: 15px;background-color:rgb(134, 94, 18);'>"+"</a>"+"</div>"+'</li>');
				});
				
				
				
				res.send(html); //Sends the HTML data back to the client for rendering
				
		}
		).catch(err => {
			console.log(err);
			sendErrorResponse(res);
		})
	});
	
	
	//This function executes the ZCQL query to retrieve items from the Data Store
	function getDonationFromDataStore(catalystApp) {
		return new Promise((resolve, reject) => {
			// Queries the table in the Data Store
			
			let currentTime = new Date(new Date().toLocaleString('en-US',{timeZone : "Asia/Kolkata"}));
            let currentTimeMin = new Date(currentTime.setHours(currentTime.getHours() - 3));
            let datetime = currentTimeMin.toISOString().replace('Z', '').replace('T', ' ').replace('.',':');

			catalystApp.zcql().executeZCQLQuery("select * from Donation where CREATEDTIME >='"+datetime+"'").then(queryResponse => {
				resolve(queryResponse);
			}).catch(err => {
				reject(err);
			})
		});
	}

	

	app.delete('/close_order', function (req, res) {
		var id = req.params.item;
		var catalystApp = catalyst.initialize(req);
		let datastore = catalystApp.datastore();
		let table = datastore.table('Donation');
		let rowPromise = table.deleteRow(id);
		rowPromise.then((row) => {
			res.send(id);
		}).catch(err => {
			console.log(err);
			sendErrorResponse(res);
		});
	});
	
		
		
				
		
	

	
	function sendErrorResponse(res) {
		res.status(500);
		res.send({
			"error": "Internal server error occurred. Please try again in some time."
		});
	}
 
 module.exports = app;


	
 
	


	
	

	

	
	

	
	







