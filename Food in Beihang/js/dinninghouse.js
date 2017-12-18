// JavaScript Document

var url = "http://dap.apiblueprint.org/";
function send_DH_id(DH_id)
{
	//todo: send DH_id to server
	/*	--test area--
		alert(DH_id);
	//*/	
}


var dataset =
{
	"dinning_hall" :
	[
		{
				"name" : "second floor dinning hall",
				"position" : "near the 3rd apartment",
				"cid" : 1,
				"imgurl" : "images/7.jpg"
		},
		{
				"name" : "third floor dinning hall",
				"position" : "near the 3rd apartment",
				"cid" : 2,
				"imgurl" : "images/8.jpg"
		},
		{
				"name" : "basement 1 dinning hall",
				"position" : "near the 3rd apartment",
				"cid" : 3,
				"imgurl" : "images/9.jpg"
		},
	],
}
/*
<div class="col-md-12 services-overview-grid">
	<div class="services-overview-grd">
		<div class="col-md-6">
		<a href="images/7.jpg" class="b-link-stripe b-animate-go1   swipebox"  title="">
			<img src="images/7.jpg" alt=" " class="img-responsive" />
		</a>
		</div>
		<div class=" col-md-6 services-overview-gd ">
			<h4><a  name="DH1" onClick="send_DH_id(this.name)" href="window.html?DHID=123">Underground Dinning Hall</a></h4>
			<p>Neque porro quisquam est, qui dolorem ipsum quia dolor 
				sit amet, consectetur, adipisci velit, sed quia non numquam 
				eius modi tempora incidunt ut labore et dolore magnam aliquam 
				quaerat voluptatem.</p>
		</div>
	</div>
</div>
*/
function load_dinning_hall(dh_no)
{
	var cod = document.getElementById('canteen_outern_div');
	

	
	var wn = document.createElement("h4");
	var alink = document.createElement("a");
	var name_node = document.createTextNode(dataset.dinning_hall[dh_no].name);///dataset used
	alink.appendChild(name_node);
	alink.setAttribute("name",dataset.dinning_hall[dh_no].cid);///dataset used
	alink.setAttribute("onClick","send_window_id(this.name)");
	alink.setAttribute("href","window.html?DHID="+dataset.dinning_hall[dh_no].cid);///dataset used
	wn.appendChild(alink);
	var des_p = document.createElement("p");
	//var des_p1 = document.createElement("p");
	var des_node = document.createTextNode("Position: "+dataset.dinning_hall[dh_no].position);///dataset used
	//var des_node1 = document.createTextNode("Type: "+dataset.window_data[win_id].type);///dataset used
	des_p.appendChild(des_node);
	//des_p1.appendChild(des_node1);
	var right_div = document.createElement("div");
	right_div.setAttribute("class"," col-md-6 services-overview-gd ");
	right_div.appendChild(wn);
	right_div.appendChild(des_p);
	//right_div.appendChild(des_p1);
	//right div created
	
	var img = document.createElement("img");
	img.setAttribute("src",dataset.dinning_hall[dh_no].imgurl);///dataset used
	img.setAttribute("alt"," ");
	img.setAttribute("class","img-responsive");
	var alink2 = document.createElement("a");
	alink2.setAttribute("href",dataset.dinning_hall[dh_no].imgurl);///dataset used
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
	
	cod.appendChild(second_outern_div);
}
function receive_dinninghall()
{
	/*var request = new XMLHttpRequest();

	request.open('GET', url+'canteens?cid='+'&from=0&to=10');

	request.setRequestHeader('Content-Type', 'application/json');

	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
		console.log('Status:', this.status);
		console.log('Headers:', this.getAllResponseHeaders());
		console.log('Body:', this.responseText);
		
		if((this.status == 200 ) ) {
			//接受成功
			dataset.dinning_hall=this.responseText.result;
			for(var i = 0;i < dataset.dinning_hall.length; i++)
			{
				load_dinning_hall(i);
			}
			jQuery
			(
				function($) 
				{
					$(".swipebox").swipebox();
				}
			);
		}else {
			alert("Request was unsuccessful : " + this.status + " " + this.statusText);
		}
			
		}
	};



	request.send(); */
	
	for(var i = 0;i < dataset.dinning_hall.length; i++)
			{
				load_dinning_hall(i);
			}
			jQuery
			(
				function($) 
				{
					$(".swipebox").swipebox();
				}
			);
	
}