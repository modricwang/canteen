var g_dh_id;
var g_w_id;
var url = "http://dap.apiblueprint.org/";
var dataset={
	//load 12 dishes once a time
	"dishes":[
	{
        "name":"peking roast duck",
        "did":1,
        "price":12.00,
        "score":6.66,
        "label":"peking dishes;",
		"imgurl":"images/7.jpg"
    },
    {
        "name":"italian fruit pizza",
        "did":2,
        "price":27.00,
        "score":6.66,
        "label":"italy",
		"imgurl":"images/7.jpg"
    },
	{
        "name":"北京烤鸭",
        "did":3,
        "price":12.00,
        "score":6.66,
        "label":"北京菜;",
		"imgurl":"images/7.jpg"
    },
    {
        "name":"意式水果披萨",
        "did":2,
        "price":27.00,
        "score":6.66,
        "label":"意式;水果;披萨",
		"imgurl":"images/7.jpg"
    },
	{
        "name":"北京烤鸭",
        "did":1,
        "price":12.00,
        "score":6.66,
        "label":"北京菜;",
		"imgurl":"images/7.jpg"
    },
    {
        "name":"意式水果披萨",
        "did":2,
        "price":27.00,
        "score":6.66,
        "label":"意式;水果;披萨",
		"imgurl":"images/7.jpg"
    },
	{
        "name":"北京烤鸭",
        "did":1,
        "price":12.00,
        "score":6.66,
        "label":"北京菜;",
		"imgurl":"images/7.jpg"
    },
    {
        "name":"意式水果披萨",
        "did":2,
        "price":27.00,
        "score":6.66,
        "label":"意式;水果;披萨",
		"imgurl":"images/7.jpg"
    },
	{
        "name":"北京烤鸭",
        "did":1,
        "price":12.00,
        "score":6.66,
        "label":"北京菜;",
		"imgurl":"images/7.jpg"
    },
    {
        "name":"意式水果披萨",
        "did":2,
        "price":27.00,
        "score":6.66,
        "label":"意式;水果;披萨",
		"imgurl":"images/7.jpg"
    },{
        "name":"北京烤鸭",
        "did":1,
        "price":12.00,
        "score":6.66,
        "label":"北京菜;",
		"imgurl":"images/7.jpg"
    },
    {
        "name":"意式水果披萨",
        "did":2,
        "price":27.00,
        "score":6.66,
        "label":"意式;水果;披萨",
		"imgurl":"images/7.jpg"
    },
	
	
	
],
	"dishesNum":0,
	"clickId":0,
	
	}
var ifEmpty=0;
function addNewFood()
{
	dataset.dishesNum=dataset.dishesNum+dataset.dishes.length;
	var div=document.getElementById("mainDish");
	for(var i=0;i<dataset.dishesNum;i++)
	{
		var newDiv=document.createElement('div');
		newDiv.setAttribute("class","col-md-4 menu-grids-info");
		var img=document.createElement('img');
		img.setAttribute("src",dataset.dishes[i].imgurl);
		img.setAttribute("id",dataset.dishes[i].did);
		newDiv.appendChild(img);
		newDiv.innerHTML+="<h4><a href='comment.html?DHID="+g_dh_id+"&WID="+g_w_id+"&DID="+dataset.dishes[i].did+"&DName="+dataset.dishes[i].name+"&DImg="+dataset.dishes[i].imgurl+"&DLabel="+dataset.dishes[i].label+"' onclick='herfclick("+dataset.dishes[i].did+")'>"+dataset.dishes[i].name+"</a></h4>";
		newDiv.innerHTML+="<p><a href='comment.html?DHID="+g_dh_id+"&WID="+g_w_id+"&DID="+dataset.dishes[i].did+"&DName="+dataset.dishes[i].name+"&DImg="+dataset.dishes[i].imgurl+"&DLabel="+dataset.dishes[i].label+"' onclick='herfclick("+dataset.dishes[i].did+")'>"+dataset.dishes[i].label+"</a></p>";
		newDiv.innerHTML+="<div class='menu-rate'><h5>average score "+dataset.dishes[i].score+"</h5></div>"
		div.appendChild(newDiv);	
	}
}
	
function herfclick(id)
{
	//alert(id);
	//clickId=getParams(WID);
	//alert(clickId);
	//console.log(clickId);
}

function pages()
{
	g_dh_id = getParams("DHID");
	g_w_id = getParams("WID");
	
	
	
	var window_id = g_w_id;//present window id
	var DH_id = g_dh_id;//present canteen id
	///*
	//alert(DH_id);
	//alert(window_id);
	//*/
	//get dishes from window No.window_id

	var request = new XMLHttpRequest();

	request.open('GET', url+'dishes/?cid='+g_dh_id+'&wid='+g_w_id+'&from=0&to=12');

	request.setRequestHeader('Content-Type', 'application/json');

	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
		console.log('Status:', this.status);
		console.log('Headers:', this.getAllResponseHeaders());
		console.log('Body:', this.responseText);
		if((this.status == 200 ) ) {
			//接受成功
			dataset.dishes=this.responseText.result;
			
			addNewFood();
		}else {
			alert("Request was unsuccessful : " + this.status + " " + this.statusText);
		}
	  }
	};

	request.send();
	
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
//文档高度
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
	
	var request = new XMLHttpRequest();
	var Num=dataset.dishesNum+12;
	request.open('GET', url+'dishes/?cid='+g_dh_id+'&wid='+g_w_id+'&from='+dataset.dishesNum+'&to='+Num);

	request.setRequestHeader('Content-Type', 'application/json');

	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
		console.log('Status:', this.status);
		console.log('Headers:', this.getAllResponseHeaders());
		console.log('Body:', this.responseText);
		if((this.status == 200 ) ) {
			//接受成功
			dataset.dishes=this.responseText.result;
			
			addNewFood();
		}else {
			alert("Request was unsuccessful : " + this.status + " " + this.statusText);
		}
	  }
	};

	

	request.send();
	
}
var a=10; 
window.onscroll = function () {
    //监听事件内容
	
    if( (1+0.1*a)*getDocumentTop() > getWindowHeight() + getScrollHeight()){
		if(a>2)
		a-=2;
		if(ifEmpty==0)
		{
			//reLoadData();
    		//addNewFood();
		}
		
        //ajax_function()
    }
}