console.log("threshold.js loaded");

// Declare variables for the parameters of cv2.HoughLinesP
var rho = 1; 
var theta = Math.PI / 2;
console.log(theta)
var threshold = 50;
var min_line_length = 50;
var max_line_gap = 10;

// Function that updates theta given a multiplier for Math.PI
function update_theta(multiplier) {
  theta = multiplier * Math.PI / 2;
}

// Declare variables for the input elements in index.html
var rho_text_input = document.getElementById("rho_text_input");
rho_text_input.value = rho;
var rho_range_input = document.getElementById("rho_range_input");
rho_range_input.value = rho;
var theta_text_input = document.getElementById("theta_text_input");
theta_text_input.value = 1;
var theta_range_input = document.getElementById("theta_range_input");
theta_range_input.value = 1;
var threshold_text_input = document.getElementById("threshold_text_input");
threshold_text_input.value = threshold;
var threshold_range_input = document.getElementById("threshold_range_input");
threshold_range_input.value = threshold;
var min_line_length_text_input = document.getElementById(
  "min_line_length_text_input"
);
min_line_length_text_input.value = min_line_length;
var min_line_length_range_input = document.getElementById(
  "min_line_length_range_input"
);
min_line_length_range_input.value = min_line_length;
var max_line_gap_text_input = document.getElementById(
  "max_line_gap_text_input"
);
max_line_gap_text_input.value = max_line_gap;
var max_line_gap_range_input = document.getElementById(
  "max_line_gap_range_input"
);
max_line_gap_range_input.value = max_line_gap;
var button = document.getElementById("button");

// Update rho when the corresponding *_text_input and *_range_input values are changed
rho_text_input.addEventListener("change", function () {
  if (rho_text_input.value > 0) {
    rho = rho_text_input.value;
    rho_range_input.value = rho;
    hough_lines_p_from_file();
  }
});
rho_range_input.addEventListener("change", function () {
  rho = rho_range_input.value;
  rho_text_input.value = rho;
  hough_lines_p_from_file();
});

// Update theta when the corresponding *_text_input and *_range_input values are changed
theta_text_input.addEventListener("change", function () {
  if (theta_text_input.value > 0) {
    update_theta(theta_text_input.value);
    theta_range_input.value = theta;
    hough_lines_p_from_file();
  }
});
theta_range_input.addEventListener("change", function () {
  update_theta(theta_range_input.value);
  theta_text_input.value = theta;
  hough_lines_p_from_file();
});

// Update threshold when the corresponding *_text_input and *_range_input values are changed
threshold_text_input.addEventListener("change", function () {
  if (threshold_text_input.value > 0 && threshold_text_input.value < 256) {
    threshold = threshold_text_input.value;
    threshold_range_input.value = threshold;
    hough_lines_p_from_file();
  }
});
threshold_range_input.addEventListener("change", function () {
  threshold = threshold_range_input.value;
  threshold_text_input.value = threshold;
  hough_lines_p_from_file();
});

// Update min_line_length when the corresponding *_text_input and *_range_input values are changed
min_line_length_text_input.addEventListener("change", function () {
  if (min_line_length_text_input.value > 0) {
    min_line_length = min_line_length_text_input.value;
    min_line_length_range_input.value = min_line_length;
    hough_lines_p_from_file();
  }
});

min_line_length_range_input.addEventListener("change", function () {
  min_line_length = min_line_length_range_input.value;
  min_line_length_text_input.value = min_line_length;
  hough_lines_p_from_file();
});

// Update max_line_gap when the corresponding *_text_input and *_range_input values are changed
max_line_gap_text_input.addEventListener("change", function () {
  if (max_line_gap_text_input.value > 0) {
    max_line_gap = max_line_gap_text_input.value;
    max_line_gap_range_input.value = max_line_gap;
    hough_lines_p_from_file();
  }
});

max_line_gap_range_input.addEventListener("change", function () {
  max_line_gap = max_line_gap_range_input.value;
  max_line_gap_text_input.value = max_line_gap;
  hough_lines_p_from_file();
});

// Function that sends a POST request to the server on the route /houghlines using the XMLHttpRequest API

function hough_lines_p_from_file() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/houghlines", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function (e) {
    if (this.status == 200) {
      var response = JSON.parse(this.response);
      console.log(response);
      // Declare variables for the unprocessed image and the processed image in the response
      var unprocessed_image = response.unprocessed_image;
      var processed_image = response.processed_image;
      // Set source of html elements #image-container-1 and #image-container-2 to the unprocessed and processed images
      document.getElementById("image-container-1").src = unprocessed_image;
      document.getElementById("image-container-2").src = processed_image;
      console.log("threshold.js: POST request to /threshold successful");
    }
  };
  var data = JSON.stringify({
    rho: rho,
    theta: theta,
    threshold: threshold,
    min_line_length: min_line_length,
    max_line_gap: max_line_gap,
  });
  xhr.send(data);
}

// Attach a click event listener to the button that calls the hough_lines_p_from_file function
button.addEventListener("click", hough_lines_p_from_file);
