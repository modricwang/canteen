var url="http://dap.apiblueprint.org/";
var g_dh_id;
var g_w_id;
var g_d_id;

var g_d_name;
var g_d_img;
var g_d_label;


var comment_num=0;
var uid;
var dataset =
{
	"remarks" :
	[
		{
			"rid" 		:	1,
			"remarker"  :	"user 1",
			"score"		:	4.5,
			"content"	:	
			{
				"text"  	: 	"i like so.",	
				"imgurl"	:	"images/img12.jpg"		
			}
		}
	],
	"dish" :
	[
		{
			"name"		:	"peking roast chicken",
			"did"		:	1,
			"price" 	:	12.00,
			"score" 	:	6.66,
			"label" 	:	"peking dishes;",
			"imgurl"	:	"images/9.jpg"
		}
	]
}
/*
	<div class="col-md-12 services-overview-grid">
		<div class="services-overview-grd">
			<div class=" col-md-12 services-overview-gd ">
				<h4>User 1:</h4>
				<p>Neque porro quisquam est, qui dolorem ipsum quia dolor 
					sit amet, consectetur, adipisci velit, sed quia non numquam 
					eius modi tempora incidunt ut labore et dolore magnam aliquam 
					quaerat voluptatem.</p>
			</div>
			<div class="col-md-12 services-overview-gd">
			<a href="images/7.jpg" class="b-link-stripe b-animate-go1   swipebox"  title="">
				<img src="images/7.jpg" alt=" " class="img-responsive " style="width:200px; height:165px" />
			</a>
			</div>
		</div>
	</div>
*/

function loadComments(com_id)
{
	var cod = document.getElementById('comment_outern_div');
	
	
	var user_name = document.createElement("h4");
	var node_remarker = document.createTextNode(dataset.remarks[com_id].remarker);///dataset used
	user_name.appendChild(node_remarker);
	
	var des_p = document.createElement("p");
	var des_p1 = document.createElement("p");
	var des_node = document.createTextNode("Score: "+dataset.remarks[com_id].score);///dataset used
	var des_node1 = document.createTextNode("Comment: "+dataset.remarks[com_id].content.text);///dataset used
	des_p.appendChild(des_node);
	des_p1.appendChild(des_node1);
	var above_div = document.createElement("div");
	above_div.setAttribute("class"," col-md-12 services-overview-gd ");
	above_div.appendChild(user_name);
	above_div.appendChild(des_p);
	above_div.appendChild(des_p1);
	//above div created
	
	var img = document.createElement("img");
	img.setAttribute("src",dataset.remarks[com_id].content.imgurl);///dataset used
	img.setAttribute("alt"," ");
	img.setAttribute("class","img-responsive");
	img.setAttribute("style","width:200px; height:165px");
	var alink2 = document.createElement("a");
	alink2.setAttribute("href",dataset.remarks[com_id].content.imgurl);///dataset used
	alink2.setAttribute("class","b-link-stripe b-animate-go1   swipebox");
	alink2.setAttribute("title","");
	alink2.appendChild(img);
	var below_div = document.createElement("div");
	below_div.setAttribute("class","col-md-12 services-overview-gd");
	below_div.appendChild(alink2);
	//below div created
	
	var first_outern_div = document.createElement("div");
	first_outern_div.setAttribute("class","services-overview-grd");
	first_outern_div.appendChild(above_div);
	first_outern_div.appendChild(below_div);
	
	var second_outern_div = document.createElement("div");
	second_outern_div.setAttribute("class","col-md-12 services-overview-grid");
	second_outern_div.appendChild(first_outern_div);
	
	cod.appendChild(second_outern_div);
}
/*
<div class=" col-md-2 " >
	<a id = "dish_link" href="images/7.jpg" class="b-link-stripe b-animate-go1   swipebox"  title="">
	<img  id="dish_img" src="images/7.jpg" alt=" " class="img-responsive " style="width:178px; height:125px" />
	</a>
</div>
<div class=" col-md-8 " >
	<h4 id ="dish_name">User 1:</h4>
	<p id="dish_des">Neque porro quisquam est, qui dolorem ipsum quia dolor 
		sit amet, consectetur, adipisci velit, sed quia non numquam 
		eius modi tempora incidunt ut labore et dolore magnam aliquam 
		quaerat voluptatem.
	</p>
</div>
*/
function load_dish()
{
	var alink = document.getElementById("dish_link");
	alink.setAttribute("href",dataset.dish[0].imgurl);
	var dish_img = document.getElementById("dish_img");
	dish_img.setAttribute("src",dataset.dish[0].imgurl);
	var dish_name = document.getElementById("dish_name");
	dish_name.textContent=dataset.dish[0].name;
	
	var dish_des = document.getElementById("dish_price");
	dish_des.textContent = "Price:  "+dataset.dish[0].price;
	var dish_des = document.getElementById("dish_score");
	dish_des.textContent = "Score:  "+dataset.dish[0].score;
	var dish_des = document.getElementById("dish_des");
	dish_des.textContent = dataset.dish[0].label;
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
function receive_comments()
{ 	 
	uid = window.sessionStorage.getItem('uid');
	if (uid!=null) {
		document.getElementById("Add").style.display="inline";
		document.getElementById("Login").style.display="none";
	}
	else{
		console.log("Not login");
	}
	
	 g_dh_id = getParams("DHID");
	 g_w_id = getParams("WID");
	 g_d_id = getParams("DID");
	 g_d_name = getParams("DName");
	 g_d_img = getParams("DImg");
	 g_d_label = getParams("DLabel");
	
	
	
	var DH_id = g_dh_id;
	var window_id = g_w_id;
	var dish_id = g_d_id;
	
	/*  --test area--
	
		alert(DH_id);
		alert(window_id);
		alert(dish_id);
		
		alert(g_d_name);
		alert(g_d_img);
		alert(g_d_label);
		
	
	//*/
/*
	var request = new XMLHttpRequest();

	request.open('PUT', url+'dishes/?cid='+g_dh_id+'&wid='+g_w_id+'&did='+g_d_id);

	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
		console.log('Status:', this.status);
		console.log('Headers:', this.getAllResponseHeaders());
		console.log('Body:', this.responseText);
		if((this.status == 200 ) ) {
			//接受成功
			dataset.dish=this.responseText.result;
			load_dish();
			getComments(comment_num,comment_num+12);
		}else {
			alert("Request was unsuccessful : " + this.status + " " + this.statusText);
		}
	  }
	};

	request.send();
*/
	
	
	load_dish();
	for(var i = 0;i < dataset.remarks.length; i++)
	{
			loadComments(i);
	}
	jQuery(function($) 
	{
		$(".swipebox").swipebox();
	});
}

function getComments(f,t)
{
	var request = new XMLHttpRequest();

	request.open('GET', url+'remarks/'+g_dh_id+'/'+g_w_id+'/'+g_d_id+'/'+f+'/'+t);  

	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
		console.log('Status:', this.status);
		console.log('Headers:', this.getAllResponseHeaders());
		console.log('Body:', this.responseText);
		
		if((this.status == 200 ) ) {
			//接受成功
			dataset.remarks=this.responseText;
			num=num+dataset.remarks.length;
			for(var i = 0;i < dataset.remarks.length; i++)
			{
					loadComments(i);
			}
			jQuery(function($) 
			{
				$(".swipebox").swipebox();
			});
		}else {
			alert("Request was unsuccessful : " + this.status + " " + this.statusText);
		}
		
	  }
	};
	request.send();
}

//文档高度
var ifEmpty = 0;
function getDocumentTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

//可视窗口高度
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

//滚动条滚动高度
function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
function reLoadData()
{
	//tell the server to reload dataset to add 6 more dishes
	//input the length of dishes
	//getComments(comment_num,comment_num+12);
}
var a=25; 
window.onscroll = function () {
    //监听事件内容
	
    if( (1.15+a*0.1)*getDocumentTop() > getWindowHeight()+getScrollHeight()){
		if(a>1)
			a-=1;
		if(ifEmpty==0)
		{
			reLoadData();
			for(var i = 0;i < 1;i++)
			{
				loadComments(i);
			}
		}
        //ajax_function()
    }
}

function newComment()
{
	var score;
	alert("start");
	var obj = document.getElementsByName("radio");
	 for(i=0; i<obj.length;i++)    
	 {
               if(obj[i].checked)
			   score=i;
     }
	if(score==null )
	{
		alert("Please select the ranking");
	}
	else if(document.getElementById("content").value=="")
	{
		alert("Please type the comment");
	}
	else
	{
				
		var fileinput = document.getElementById('picture');
		if(fileinput.files.length==0 ) 
		{
			Send(score,null);
		}
		else
		{
			var request = new XMLHttpRequest();

			request.open('POST', url+'images');

			request.setRequestHeader('Content-Type', 'multipart/form-data');

			request.onreadystatechange = function () {
			  if (this.readyState === 4) {
				console.log('Status:', this.status);
				console.log('Headers:', this.getAllResponseHeaders());
				console.log('Body:', this.responseText);
				if((this.status == 200 ) ) 
				{
					//收到图片url再发送完整评论内容
					Send(score,this.responseText.url);
				}
				else 
				{
					alert("Request was unsuccessful : " + this.status + " " + this.statusText);
				}
			  }
			};

			var body = {
					
					'img': fileinput.files[0],
					'owner':uid
			}

			request.send(body);
		}
	}
	
}
function Send(s,Image_url)
{
	var request = new XMLHttpRequest();
	
	request.open('POST', url+'remarks/');

	request.setRequestHeader('Content-Type', 'application/json');

	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
		console.log('Status:', this.status);
		console.log('Headers:', this.getAllResponseHeaders());
		console.log('Body:', this.responseText);
		if((this.status == 200 ) ) 
			{
				//发送完成。。清空桌面
				document.getElementById("content").value="";
				var obj = document.getElementsByName("radio");
				for(i=0; i<obj.length;i++)    
				 {
						   obj[i].checked=false;
						   //obj[i].removeAttribute("checked");
				 }
				 obj[0].checked=true;
				 for(i=1; i<obj.length;i++)    
				 {
						   obj[i].checked=false;
				 }
				
			}
			else 
			{
				alert("Request was unsuccessful : " + this.status + " " + this.statusText);
			}
	  }
	};

	var body = {
		'cid':g_dh_id,
		'wid':g_w_id,
		'did':g_d_id,
		'owner':uid,
		'score':s,
		'content':
		{
			'text':document.getElementById("content").value,
			'imgurl':Image_url
		}

	};

	request.send(JSON.stringify(body));
}
function Back()
{
	window.location.href="index.html?back=1";
}