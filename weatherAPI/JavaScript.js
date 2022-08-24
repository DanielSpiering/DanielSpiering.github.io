const forecastDIV = document.querySelector('#display-forecast');
const htmlButton = document.querySelector('#get-forecast');
var txtLatitude;
var txtLongitude;
var navLatitude;
var navLongitude;
var lat;
var long;

//add event function to html button
htmlButton.addEventListener('click', function () { getInput(), getWeatherForecast(); })

function getInput() {
    txtLatitude = document.getElementById('get-latitude').value;   
    txtLongitude = document.getElementById('get-longitude').value;
}//end function

//USED AS A CALLBACK FOR THE AJAX REQUEST
function requestData() {
    var responseStatusOk = this.status === 200;   //STATUS 200 means OK
    var responseComplete = this.readyState === 4; //readyState 4 means response is ready

    if (responseStatusOk && responseComplete) {
        //console.log(this.responseText); //debug

        //PARSE THE RESPONSE
        let responseData = JSON.parse(this.responseText);

        //GET THE forecast FROM THE RESPONSE TEXT
        secondRequest(responseData.properties.forecast);
        
    } else {
        //SOMETHING WENT WRONG
        this.onerror = onerror();
    }//end if
}//end function

function checkTextBoxes() {
    if (txtLatitude == "" || txtLongitude == "") {
        lat = navLatitude;
        long = navLongitude;
    } else {
        lat = Number(txtLatitude);
        long = Number(txtLongitude);
    }//end if
}//end function

function getCoordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setVariables);
    } else {
        document.getElementById("display-forecast").innerHTML = "Something went wrong";
    }
}

function setVariables(position) {
    navLatitude = position.coords.latitude;
    navLongitude = position.coords.longitude;
}//end function

function getWeatherForecast() {
    checkTextBoxes();

    //request variables
    const ajax = new XMLHttpRequest;  //asynchronous javascript and xml
    const requestUrl = `https://api.weather.gov/points/${lat},${long}`;  //location of weather api
    const requestMethod = 'GET';  //give me data
    const asyncRequest = false;  //dont hold up wepage when waiting response, originally was set to true

    //send ajax request to the url
    ajax.open(requestMethod, requestUrl, asyncRequest);

    //set callback function (this function gets called automatically when the response gets back)
    ajax.onreadystatechange = requestData;

    //send request
    var data = ajax.send();
}//end function

function secondRequest(url) {
    const ajax = new XMLHttpRequest;  //asynchronous javascript and xml
    const requestUrl = `${url}`;  //location of weather api
    const requestMethod = 'GET';  //give me data
    const asyncRequest = false;  //dont hold up wepage when waiting response

    //send ajax request to the url
    ajax.open(requestMethod, requestUrl, asyncRequest);

    //set callback function (this function gets called automatically when the response gets back)
    ajax.onreadystatechange = secondRequestData;

    //send request
    var data = ajax.send();
}//end function

function secondRequestData() {
    var responseStatusOk = this.status === 200;   //STATUS 200 means OK
    var responseComplete = this.readyState === 4; //readyState 4 means response is ready

    if (responseStatusOk && responseComplete) {
        //console.log(this.responseText); //debug

        //PARSE THE RESPONSE
        let responseData = JSON.parse(this.responseText);

        //GET THE forecast FROM THE RESPONSE TEXT
        let weather = responseData.properties.periods[0].detailedForecast;
        
        //UPDATE HTML
        forecastDIV.innerHTML = weather;
    } else {
        //SOMETHING WENT WRONG
        this.onerror = onerror();
    }//end if
}//end function



function onerror() {
    forecastDIV.textContent = 'There was an error!';
}//end function