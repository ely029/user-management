const express = require('express'); 
const mysql = require('mysql');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const app = express();
const cors = require('cors');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
    debug: false
  })

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.post('/api/register', function (req, res, next) {
    connection.query("SELECT COUNT(*) as count from users where email=?",[req.body.email],function(err,result){
        if(err) throw err;    
        if(result[0].count >= 1) {
               res.json({message : 'Email already exist!. Please use another email', status: 200});
            } else {
                var reqBody = req.body;
                const name = reqBody.name;
                const email = reqBody.email;
                const password = sha1(reqBody.password);
                const role = 'CUSTOMER';
                connection.query('INSERT INTO users (name, email, role_id, password) VALUES (?, ?, ?, ?)', [name,email,'CUSTOMER',password], function(err,result) {
                    if(err) throw err
                });
                res.json({message : 'Register Successfully', status: 200});
            }
    });
});

app.post('/api/login', function(req,res,next){
    connection.query("SELECT COUNT(*) as count, name, id, role_id,email from users where email = ? and password = ?",[req.body.email,sha1(req.body.password)],function(err,result){
        if(err) throw err;    
        if(result[0].count >= 1) {
                res.json({
                    message: '', 
                    status: 200, 
                    role_id: result[0].role_id, 
                    name: result[0].name, 
                    id: result[0].id, 
                    email: result[0].email
            });
            } else {
                res.json({message: 'Login and password are not match', status:200});
            }
    });
});

app.post('/api/update-profile', function(req,res,next){
    connection.query("UPDATE users set email=?,name=? where id=?",[req.body.email,req.body.name,req.body.id], function(err,result){});
    connection.query("SELECT name,email from users where id=?",[req.body.id],function(err,result){
                res.json({
                    message: 'Updated Successfully', 
                    name: result[0].name, 
                    email: result[0].email
                });
    });
});

app.get('/api/list', function(req,res,next){
    connection.query('SELECT id, name, email from users WHERE role_id <> "ADMIN"',function(err,result){
        res.json({result});
    });
});
  
app.listen(3000, () => { 
    console.log('Server listening on port 3000'); 
});