// JavaScript Document
var url = "http://dap.apiblueprint.org/";
var g_dh_id;
var dataset =
{
	"window_data" : 
	[
	
		{
			"name" 			: 	"test_window_name",
			"position" 		:   "south of third floor",
			"type" 			: 	"western food",
			"wid" 			: 	"window_4",
			"imgurl"  		:   "images/7.jpg",
		},
		{
			"name" 			: 	"test_window_name",
			"position" 		:   "south of third floor",
			"type" 			: 	"western food",
			"wid" 			: 	"window_4",
			"imgurl"  		:   "images/7.jpg",
		},
		{
			"name" 			: 	"test_window_name",
			"position" 		:   "south of third floor",
			"type" 			: 	"western food",
			"wid" 			: 	"window_4",
			"imgurl"  		:   "images/7.jpg",
		},
		{
			"name" 			: 	"test_window_name",
			"position" 		:   "south of third floor",
			"type" 			: 	"western food",
			"wid" 			: 	"window_4",
			"imgurl"  		:   "images/7.jpg",
		}
	]
	
	
}

function loadWindow(win_id)
{
	
	var wod = document.getElementById('window_outern_div');
	
	
	/*
	<div id="window_1" class="col-md-12 services-overview-grid">
		<div class="services-overview-grd">
			<div class="col-md-6">
			<a href="images/7.jpg" class="b-link-stripe b-animate-go1   swipebox"  title="">
				<img src="images/7.jpg" alt=" " class="img-responsive" />
			</a>
			</div>
			<div class=" col-md-6 services-overview-gd ">
				<h4><a href="menu.html">window 1</a></h4>
				<p>Neque porro quisquam est, qui dolorem ipsum quia dolor 
					sit amet, consectetur, adipisci velit, sed quia non numquam 
					eius modi tempora incidunt ut labore et dolore magnam aliquam 
					quaerat voluptatem.</p>
			</div>
		</div>
	</div>
	*/
	var wn = document.createElement("h4");
	var alink = document.createElement("a");
	var name_node = document.createTextNode(dataset.window_data[win_id].name);///dataset used
	alink.appendChild(name_node);
	alink.setAttribute("name",dataset.window_data[win_id].wid);///dataset used
	alink.setAttribute("onClick","send_window_id(this.name)");
	alink.setAttribute("href","menu.html?DHID="+g_dh_id+"&WID="+dataset.window_data[win_id].wid);///dataset used
	wn.appendChild(alink);
	var des_p = document.createElement("p");
	var des_p1 = document.createElement("p");
	var des_node = document.createTextNode("Position: "+dataset.window_data[win_id].position);///dataset used
	var des_node1 = document.createTextNode("Type: "+dataset.window_data[win_id].type);///dataset used
	des_p.appendChild(des_node);
	des_p1.appendChild(des_node1);
	var right_div = document.createElement("div");
	right_div.setAttribute("class"," col-md-6 services-overview-gd ");
	right_div.appendChild(wn);
	right_div.appendChild(des_p);
	right_div.appendChild(des_p1);
	//right div created
	
	var img = document.createElement("img");
	img.setAttribute("src",dataset.window_data[win_id].imgurl);///dataset used
	img.setAttribute("alt"," ");
	img.setAttribute("class","img-responsive");
	var alink2 = document.createElement("a");
	alink2.setAttribute("href",dataset.window_data[win_id].imgurl);///dataset used
	alink2.setAttribute("class","b-link-stripe b-animate-go1   swipebox");
	alink2.setAttribute("title","");
	alink2.appendChild(img);
	var left_div = document.createElement("div");
	left_div.setAttribute("class","col-md-6");
	left_div.appendChild(alink2);
	//left div created
	
	var first_outern_div = document.createElement("div");
	first_outern_div.setAttribute("class","services-overview-grd");
	first_outern_div.appendChild(left_div);
	first_outern_div.appendChild(right_div);
	
	var second_outern_div = document.createElement("div");
	second_outern_div.setAttribute("class","col-md-12 services-overview-grid");
	second_outern_div.appendChild(first_outern_div);
	
	wod.appendChild(second_outern_div);
}

function receive()
{	
	//var obj = window.dialogArguments;
	g_dh_id = getParams("DHID");
	var DH_id = g_dh_id;
	//alert(DH_id);
	
	//todo: get table of windows data of Dinning Hall no.DH_id
	/*
		dataset.window_data[].[window_name | window_id | window_image | window_description]
	*/

	var request = new XMLHttpRequest();

	request.open('GET', url+'windows/?cid='+DH_id+'&wid='+'&from=0&to=20',true);   //不知道是不是这样

	request.setRequestHeader('Content-Type', 'application/json');

	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
		console.log('Status:', this.status);
		console.log('Headers:', this.getAllResponseHeaders());
		console.log('Body:', this.responseText);
		if((this.status == 200 ) ) {
			//获得成功
			dataset.window_data=this.responseText.result;
			for(var i = 0;i < dataset.window_data.length;i++)
			{
				loadWindow(i);
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
	
	/*for(var i = 0;i < dataset.window_data.length;i++)
	{
		loadWindow(i);
	}
	jQuery(function($) 
	{
		$(".swipebox").swipebox();
	});*/
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
        //console.log("参数param1:"+getParams("param1"));//输出aa
        //console.log("参数param2:"+getParams("param2"));//输出bb

function send_window_id(window_id)
{
	//todo： send window_id to server
	/*	--test area--
		alert(window_id);
	//*/
}