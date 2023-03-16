// Attaches a click handler to the "thresholding" button that will make a GET request to the server on the /thresholding endpoint without jquery
// The server will respond with a html page that will be rendered in the browser

document
  .getElementById("threshold")
  .addEventListener("click", function() {
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log(this.responseText);
    //     }
    // };
    // xhttp.open("GET", "/threshold", true);
    // xhttp.send();
    window.location.href = "/threshold";
});

// Attaches a click handler to the "adaptivethresholding" button that will make a GET request to the server on the /adaptivethresholding endpoint without jquery
// The server will respond with a html page that will be rendered in the browser
document
  .getElementById("adaptivethreshold")
  .addEventListener("click", function() {
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log(this.responseText);
    //     }
    // };
    // xhttp.open("GET", "/adaptivethreshold", true);
    // console.log(xhttp)
    // xhttp.send();
    window.location.href = "/adaptivethreshold";
});

// Attaches a click handler to the "houghlines" button that will make a GET request to the server on the /houghlines endpoint without jquery
// The server will respond with a html page that will be rendered in the browser
document
  .getElementById("houghlines")
  .addEventListener("click", function () {
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function () {
    //   if (this.readyState == 4 && this.status == 200) {
    //     console.log(this.responseText);
    //   }
    // };
    // xhttp.open("GET", "/houghlines", true);
    // xhttp.send();
    window.location.href = "/houghlines";
  });

