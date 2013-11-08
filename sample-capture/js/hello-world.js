// JavaScript Document
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);


//-----------------------
var currentintype ;
var currentcommunity ;
var community_list;
var intype_list ;


// PhoneGap is ready
function onDeviceReady() {
    

    
    getLocation();
   // listCommunities1()
    
    //listactivity();  //--- depricated
    listintype1();
    listcommunity2();//--- thing for default com
    listevents();
    navigator.splashscreen.hide();
  

}





$('#eventlistpage').live('pageshow',function(event, ui){
       listevents();
           });



  


function getLocation() {
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
}
  
//=======================Say Hello (Page 1) Operations=======================//
function sayHello() {
    var sayHelloInputElem = document.getElementById('helloWorldInput');
    var sayHelloTextElem = document.getElementById('helloWorldText');
    var inputText = document.getElementById('txtName');
    
    sayHelloTextElem.innerHTML = 'Hello you bad ass, ' + inputText.value + '!';
    sayHelloTextElem.style.display = 'block';
    sayHelloInputElem.style.display = 'none';
}

function sayHelloReset() {
    var sayHelloInputElem = document.getElementById('helloWorldInput');
    var sayHelloTextElem = document.getElementById('helloWorldText');
    var inputText = document.getElementById('txtName');
    
    inputText.value = '';
    sayHelloTextElem.style.display = 'none';
    sayHelloInputElem.style.display = 'block';
}

//=======================Geolocation Operations=======================//
// onGeolocationSuccess Geolocation

//adw: global variable for last position, until we know how to do it better
var hoodeye_last_position;
function onGeolocationSuccess(position) {
    hoodeye_last_position = position;
    
    $("#event_latitude").val(hoodeye_last_position.coords.latitude);
    $("#event_longitude").val(hoodeye_last_position.coords.longitude);
    $("#panic_event_latitude").val(hoodeye_last_position.coords.latitude);
    $("#panic_event_longitude").val(hoodeye_last_position.coords.longitude);
      
 
    
    // Use Google API to get the location data for the current coordinates
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({ "latLng": latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if ((results.length > 1) && results[1]) {
                $("#myLocation").html(results[1].formatted_address);
                $("#myLocation1").html(results[1].formatted_address);
            }
        }
    });
    
    // Use Google API to get a map of the current location
    // http://maps.googleapis.com/maps/api/staticmap?size=280x300&maptype=hybrid&zoom=16&markers=size:mid%7Ccolor:red%7C42.375022,-71.273729&sensor=true
    //var googleApis_map_Url = 'http://maps.googleapis.com/maps/api/staticmap?size=300x200&maptype=street&zoom=13&sensor=true&markers=size:mid%7Ccolor:red%7C' + latlng + latlngalert ;
    
    
   // var latlngalert = "|-26.11305892469931,27.984621|-26.113058924691,27.984620891537|-26.1130589249,27.984620892"
     var latlngalert = ""
    var googleApis_map_Url = 'http://maps.googleapis.com/maps/api/staticmap?size=300x200&maptype=street&zoom=13&sensor=true&markers=size:mid%7Ccolor:red%7C' + latlng + latlngalert ;
    var mapImg = '<img src="' + googleApis_map_Url + '" />';
    $("#map_canvas").html(mapImg);
    
}



google.maps.event.addDomListener(window, 'load', initialize);

//        <img width="288" height="200" id="mapmarker" 
//        src="https://maps.googleapis.com/maps/api/staticmap?center=-26.11305892469931,27.9846208915375&amp;
//            zoom=11&amp;size=288x200&amp;
 //           markers=-26.11305892469931,27.984621|-26.113058924691,27.9846208915375&amp;
 //           sensor=false">

// onGeolocationError Callback receives a PositionError object
function onGeolocationError(error) {
    $("#myLocation").html("<span class='err'>" + error.message + "</span>");
}
//=======================Get Community from hoodeye=======================//

function listCommunities() {
    var mydevice =  device.uuid;
    var lat = hoodeye_last_position.coords.latitude;
    var long = hoodeye_last_position.coords.longitude;
    

    $.get('http://dev.hoodeye.com:4242/api/community?device='+mydevice+'&lat='+lat+'&long='+long, function(data) {
        
      var items = [];
      var options;
      $.each(data, function(key, community) { 
         items.push(community.name);
          options += '<option value="'+community._id+'">'+community.name+'</option>';
     });
     $("#community_index").html(items.join('<br/>'));
     $("#event_community").html(options);

    });
}

/////AL -testing and learning: working with the js and modifying subpage       
function testlist()
{
var txt1="<p>added</p>";              // Create text with HTML
var txt2=$("<p></p>").text("Text.");  // Create text with jQuery
var txt3=document.createElement("p");
txt3.innerHTML="Text.";               // Create text with DOM
$("#inputlistV").append(txt1,txt2,txt3);        // Append new elements
}

function listactivity()
{
var txt1="<option>bad person</option>";              // Create text with HTML
var txt2=$("<option ></option>").text("sad person");  // Create text with jQuery
var txt3=document.createElement("option");
txt3.innerHTML="ugly person";               // Create text with DOM
$("#activity").append(txt1,txt2,txt3);        // Append new elements
   
}



function listCommunities1() {
   $.get('http://dev.hoodeye.com:4242/api/community', function(data) {
        
      var items = [];
      var options;
      $.each(data, function(key, community) { 
        
          options += '<option>'+community.name+'</option>';
     });
     
     $("#communitylist1").html(options);

    });
}



function listintype() {
   $.get('http://dev.hoodeye.com:4242/api/intype', function(data) {
        
      var items = [];
      var options;
      $.each(data, function(key, intype) { 
         items.push(intype.label);
          options += '<option>'+intype.label+'</option>';
     });
     
     $("#intypelist").html(options);

    });
}








function assigncommunity (key) {
           currentcommunity = community_list[key] ;
    $("#eventcommunity").val(currentcommunity._id);
    listcommunity2();
    
}

function assignintype (key) {
           currentintype = intype_list[key] ;
      $("#eventintype").val(currentintype.label) ;
    
}

function listintype1() {
   $.get('http://dev.hoodeye.com:4242/api/community', function(data) {
      community_list = data;
        
      var items = [];
      var options;
      $.each(data, function(key, community) { 
       
          options += '<li><a onClick="assigncommunity('+key+')" href="#home"> <img src="images/redbullhorn.jpg" /> <h3> '+community.name+'</h3><p> '+'com-'+community._id+'</p></a></li>';
  
          
      });
     
     $("#intypelist").html(options);
       
       // default to public community
       currentcommunity = data[3];

    });
}

function listcommunity2() {
   
      
       intype_list = currentcommunity.intypes;
       
      var items = [];
      var options;
     
       $.each(currentcommunity.intypes, function(key, intype) { 
 
          options += '<li><a onClick="assignintype('+key+')" href="#reportpage"> <img style="width: 50px; height: 50px;" src="images/redface.jpg" /> <h3> '+intype.label+'</h3><p> '+'--thing of community---'+'</p></a></li>';
      
      });
   
     $("#communitylist2").html(options);

    
}



function listevents() {
   var params = 'community_id=' + currentcommunity._id;
   $("#eventlisttitle").html("inf " + currentcommunity.name);
   $.get('http://dev.hoodeye.com:4242/api/event?'+params,function(data) {
      var items_html;
      var count = 0;
      $.each(data, function(key, event) { 
         items_html += '<li><img src="images/imgviewalerts.png" style="width: 20px; height: 20px;" /> '+event.intype+''+event.detail+''+event.detail+'<br>|'+event.lat+','+event.long+'|</br></li>';
         count += 1;
      });
       	   if (count == 0) {
              items_html = "<li>No Events found.</li>";
          }
     $("#eventlist").html(items_html);

    });
}

 
      

 function submitEvent() {
       
  
     
     $("#eventcommunity").val(currentcommunity._id) ;
     $("#eventintype").val(currentintype.label) ;
     $("#eventdevicedetails").val("devicename : " + device.name + " deviceId: " + device.uuid + " deviceOs: " + device.platform + " deviceosversion : " + device.version) ;
   
     // add timestamp 
     var currentTime = new Date();
     $("#create_time").val(currentTime.toISOString());
     
     
     
     
     $.ajax({type:'POST', url: 'http://dev.hoodeye.com:4242/api/event', data:$('#EventForm').serialize(), success: function(response)
                            {
                            $('#result').html(response);
                            }});
                    return false;

 }







//------------------------ capture stuff

 


