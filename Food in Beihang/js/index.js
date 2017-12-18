//var url="http://dap.apiblueprint.org/"
var url="http://rap2api.taobao.org/app/mock/2116"
function Login()
{
		var sign_in_username = document.getElementById("sign_in_username").value;
		var sign_in_password = document.getElementById("sign_in_password").value;
		
		if(sign_in_username== "")
		{
			alert ("Please Enter your username!");
		}
		else if (sign_in_password == "")
		{
			alert ("Please Enter your password!");
		}
		else
		{	
			var request = new XMLHttpRequest();
			request.open('POST', url+"/POST/auth",true);
			request.setRequestHeader('Content-Type', 'application/json');
			request.onreadystatechange = function () {
			  if (this.readyState == 4&&this.status == 200) {
				/*console.log('Status:', this.status);
				console.log('Headers:', this.getAllResponseHeaders());
				console.log('Body:', this.responseText);*/
				//登陆成功
				var response=JSON.parse(this.responseText);
				var uid=response.uid;
				console.log(uid);
					window.sessionStorage.setItem('uid', uid);
					window.sessionStorage.setItem('username',sign_in_username );
					if(getParams("back")==null)
					{
						document.getElementById("before_login").style.display='none';
						document.getElementById("after_login").style.display='inline';
					}
					else
					{
						window.history.back(-1);
					}
					
				}
				/*else {
					alert("Request was unsuccessful : " + this.status + " " + this.statusText);
				}*/
			  }
			};

			var body = {
			  'username': sign_in_username,
			  'password': sign_in_password
			};
			
			request.send(JSON.stringify(body));
	
}


function Sign_up()
{
	
	var sign_up_username = document.getElementById("sign_up_username").value;
	var sign_up_password = document.getElementById("sign_up_password").value;
	var sign_up_email = document.getElementById("sign_up_email").value;
	
	if (sign_up_username == "")
	{
		alert ("Please Enter your username!");
	}
	else if (sign_up_email == "")
	{
		alert("Please Enter your email!");
	}
	else if (sign_up_password == "")
	{
		alert ("Please Enter your password!");
	}
	else
	{
		var request = new XMLHttpRequest();
		request.open('POST', url,true);
		request.setRequestHeader('Content-Type', 'application/json');

		request.onreadystatechange = function () {
		  if (this.readyState == 4&&this.status == 200) {
			/*console.log('Status:', this.status);
			console.log('Headers:', this.getAllResponseHeaders());
			console.log('Body:', this.responseText);*/
			//创建成功
			window.location.href="index.html"
			window.navigate("index.html");
		  }		
		    else {
					alert("Request was unsuccessful : " + this.status + " " + this.statusText);
				}
		  }
		};

		var body = {
		  'username': sign_up_username,
		  'password': sign_up_password,
		  'email': sign_up_email
		};
		
		request.send(JSON.stringify(body));
	
}

function Log_out()
{
	
	var request = new XMLHttpRequest();

	request.open('DELETE', url+"/DELETE/userlogout",true);

	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
		console.log('Status:', this.status);
		console.log('Headers:', this.getAllResponseHeaders());
		console.log('Body:', this.responseText);
		if((this.status == 200 ) ) {
					//注销成功
			sessionStorage.removeItem('uid');
			sessionStorage.removeItem('username');

			document.getElementById("before_login").style.display='inline';
			document.getElementById("after_login").style.display='none';
		}else {
			alert("Request was unsuccessful : " + this.status + " " + this.statusText);
		}
	  }
	};

			request.send(); 
			sessionStorage.removeItem('uid');
			sessionStorage.removeItem('username');

			document.getElementById("before_login").style.display='inline';
			document.getElementById("after_login").style.display='none';
	
}
function getParams(key) 
{
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
};
function Change_password()
{
	//闲置
}

function pages()
{
	var tempData = window.sessionStorage.getItem('uid');
	if (tempData!=null) {
		
		console.log(tempData);
		var welcome=document.getElementById("welcome");
		welcome.innerHTML="welcome, "+tempData;
		document.getElementById("before_login").style.display='none';
		document.getElementById("after_login").style.display='inline';
	}
	else{
		console.log("Not login");
	}
}

