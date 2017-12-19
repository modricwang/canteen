var xmlhttp;
function loadXMLDoc(url, cfunc) {
    if (window.XMLHttpRequest) {// IE7+, Firefox, Chrome, Opera, Safari 代码
        xmlhttp = new XMLHttpRequest();
    }
    else {// IE6, IE5 代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = cfunc;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function myFunction() {
    loadXMLDoc("/try/ajax/ajax_info.txt", function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
        }
    });
}
