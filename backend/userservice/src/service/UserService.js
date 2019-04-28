const mockUser = require('../../data/mockUser')
const _ = require('underscore')

var mysql = require('mysql');


// connection configurations
var con = mysql.createConnection({
  host     : '127.0.0.1',
  user: 'root',
  password: 'root',
  database  : 'user_database'
});


// connect to database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});





exports.getUserByUserId = (req, res) => {
    /*
    var filterUser = _.where(mockUser, {userid: parseInt(req.params.userid)})

    if(filterUser == "") {
        return res.sendStatus(404)
    } else {
        var docs = []
        
        for(var count in filterUser) {
            docs.push({userid: filterUser[count].userid,
                username: filterUser[count].username,
                firstname: filterUser[count].firstname,
                lastname: filterUser[count].lastname,
            })
        }
        return res.status(200).json(docs)
    }
    */

    let user_id = req.params.userid;
     if (!user_id) {
      return res.status(400).send({ error: true, message: 'Please provide user_id' });
     }
    con.query('SELECT * FROM user where user_id=?', user_id, function (error, results, fields) {
      if (error) throw error;
       return res.send({ error: false, data: results[0], message: 'users list.' });
     });
}

exports.getAllUser = (req, res) => {
	/*
    if (mockUser == "") {
        return res.sendStatus(404);
    } else {
        return res.status(200).json(mockUser);
    }
    */
		con.query("SELECT * FROM user", function (error, results, fields) {
	            if(results.length) {
            console.log("GET USER IS OK")
            return res.status(200).json(results)
        } else {
            return res.status(404)
        }
		});
}

exports.postNewUser = (req, res) => {
	/*
    var docs = req.body
    mockUser.push(docs)
    return res.status(201).send({isCreateNewUser:true})
	*/

    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.username;
    let lastname = req.body.lastname;
    if (!username) {
       return res.status(400).send({ error:true, message: 'Please provide username' });
     }
     if (!password) {
       return res.status(400).send({ error:true, message: 'Please provide password' });
     }
     if (!firstname) {
       return res.status(400).send({ error:true, message: 'Please provide firstname' });
     }
     if (!lastname) {
       return res.status(400).send({ error:true, message: 'Please provide lastname' });
     }
    con.query("INSERT INTO user SET ? ", { username: username , password: password, firstname: firstname, lastname: lastname }, function (error, results, fields) {
   		if (error) throw error;
     return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
     });
}