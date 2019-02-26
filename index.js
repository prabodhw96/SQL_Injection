var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const {db_conn} = require('./config');


var app = express();
app.set('view engine','ejs');
//app.use('/assets',express.static('assets'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });



app.get('/',(req,res)=>{
	
	res.render('home',{});
});

app.get('/show-user',(req,res)=>{
	var Data = new Object();
	var ress;
	Data.getRequest = true;
	var sql = "select * from users";
	query_data(sql,(err,result)=>{
		Data.data=JSON.parse(JSON.stringify(result));
		res.render('show-user',{Data:Data});
		return;
	});
});

app.post('/show-user',urlencodedParser,(req,res)=>{
	var Data = new Object();
	Data.postRequest = true;
	Data.user_id =req.body.user_id;
	var sql = "select * from users where user_id=" + req.body.user_id+";";
	query_data(sql,(err,result)=>{
		Data.data=JSON.parse(JSON.stringify(result));
		res.render('show-user',{Data:Data});
		return;
	});
});

app.get('/secure-show-user',(req,res)=>{
	var Data = new Object();
	var ress;
	Data.getRequest = true;
	var sql = "select * from users";
	query_data(sql,(err,result)=>{
		Data.data=JSON.parse(JSON.stringify(result));
		res.render('secure-show-user',{Data:Data});
		return;
	});
});

app.post('/secure-show-user',urlencodedParser,(req,res)=>{
	var Data = new Object();
	Data.postRequest = true;
	Data.user_id =req.body.user_id;
	var sql = "select * from users where user_id=" + mysql.escape(req.body.user_id)+";";
	query_data(sql,(err,result)=>{
		Data.data=JSON.parse(JSON.stringify(result));
		res.render('secure-show-user',{Data:Data});
		return;
	});
});

app.get('/login',(req,res)=>{
	var Data = new Object();
	var ress;
	Data.getRequest = true;
	var sql = "select * from users";
	query_data(sql,(err,result)=>{
		Data.data=JSON.parse(JSON.stringify(result));
		res.render('login',{Data:Data});
		return;
	});
});

app.post('/login',urlencodedParser,(req,res)=>{
	var Data = new Object();
	Data.postRequest = true;
	Data.user_id =req.body.user_id;
	Data.password = req.body.password;
	var sql = `select * from users where user_id=${req.body.user_id}  and  password="${req.body.password}"; `;
	console.log(sql);
	//var sql = "select * from users where name=" + req.body.name+" password="+req.body.password+";";
	query_data(sql,(err,result)=>{
		Data.data=JSON.parse(JSON.stringify(result));
		res.render('login',{Data:Data});
		return;
	});
});


app.get('/secure-login',(req,res)=>{
	var Data = new Object();
	var ress;
	Data.getRequest = true;
	var sql = "select * from users";
	query_data(sql,(err,result)=>{
		Data.data=JSON.parse(JSON.stringify(result));
		res.render('secure-login',{Data:Data});
		return;
	});
});

app.post('/secure-login',urlencodedParser,(req,res)=>{
	var Data = new Object();
	Data.postRequest = true;
	Data.user_id =req.body.user_id;
	Data.password = req.body.password;
	db_conn.query("SELECT * FROM users WHERE user_id = ? and password = ?",
	    [req.body.user_id,req.body.password],
	    function(error, results) { 
	    	Data.data=JSON.parse(JSON.stringify(results));
			res.render('secure-login',{Data:Data});
			return;
	    }
	  );
});


app.listen(80,function(){
         console.log('Server started at 80');
});


function query_data(sql_query,cb)
{
		db_conn.query(sql_query,(err,result)=>{
			if (err) throw err;
			cb(null,result);
		});
}