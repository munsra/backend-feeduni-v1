var express = require('express')
, router = express.Router();
var mysql = require('mysql');
var async = require('async');

var connection = mysql.createPool({
	host: 'prohosting3.netsons.net',
	port: '3306',
	user: 'mjhnxzbg_test',
	password: '@Password1.',
	database: 'mjhnxzbg_test1'
});

var tableName = 'posts';

router.get('/', function(req, res){
	connection.getConnection(function(error, tempCont){
		if(!!error){
			//tempCont.release();
			console.log('Error');
			console.log(error);
		}else{
			console.log('Connected');
			var query = "SELECT * FROM " + tableName;

			tempCont.query(query, function(error, rows, fields){

				tempCont.release();

				if(!!error){
					console.log('Error in the query');
					console.log(error)
				}else{
					if(rows.length == 0){
						return res.json({
							message: "Valori non trovati",
							error: true
						})
					}
					res.status(200).json({
						success: true,
						body: rows
					});
				}
			})
		}
	});
});

router.get('/:userId', function(req, res){
	connection.getConnection(function(error, tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');
		}else{
			console.log('Connected');
			tempCont.query("SELECT * FROM " + tableName +" WHERE ID = " + parseInt(req.params.userId, 10), function(error, rows, fields){
				tempCont.release();
				
				if(!!error){
					console.log('Error in the query');
					console.log(error)
				}else{
					if(rows.length == 0){
						return res.json({
							message: "Valori non trovati",
							error: true
						})
					}
					res.status(200).json({
						success: true,
						body: rows
					});
				}
			})
		}
	});

});

router.post('/add', function(req, res){

	if(!req.body.title || !req.body.tag_id){
		return res.json({
			message: 'Missing text or tag',
			error: true
		});
	}

	connection.getConnection(function(error, tempCont){
		if(!!error){
			//tempCont.release();
			console.log('Error');
			console.log(error);
		}else{
			console.log('Connected');
			tempCont.query("INSERT INTO " + tableName + " (TITLE, USER, TAG_ID, IMAGE, PHONE, EMAIL, PRICE, DESCRIPTION) VALUES ('" 
							+ req.body.title + "', '" + req.body.username + "', '" 
							+ req.body.tag_id + "', '" + req.body.image + "', '" 
							+ req.body.phone + "', '" + req.body.email + "', '" 
							+ req.body.price + "', '" + req.body.description + "');", 
							function(error, rows, fields){
								tempCont.release();
								if(!!error){
									console.log('Error in the query');
									console.log(error);
								}else{
									if(rows.length == 0){
										return res.json({
											message: "Annuncio non inserito",
											error: true
										})
									}
									res.status(200).json({
										success: true,
										body: rows
										});
								}
			})
		}
	});

});


module.exports = router;