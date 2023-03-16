console.log("threshold.js loaded");

function threshold() {
  var src = cv.imread("canvasInput");
  var dst = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(src, dst, 100, 200, cv.THRESH_BINARY);
  cv.imshow("canvasOutput", dst);
  src.delete();
  dst.delete();
}

// Path: opencvguitool/static/js/adaptiveThreshold.js
console.log("adaptiveThreshold.js loaded");

function adaptiveThreshold() {
  var src = cv.imread("canvasInput");
  var dst = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.adaptiveThreshold(
    src,
    dst,
    200,
    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv.THRESH_BINARY,
    3,
    2
  );
  cv.imshow("canvasOutput", dst);
  src.delete();
  dst.delete();
}

// Declare global variables for the parameters of ../open_cv_utilities.threshold_image_from_file
var MAX_GRAY_VALUE = 255;
var threshold_value = 100;
var max_value = 200;
var threshold_type = "cv.THRESH_BINARY";
// Declare an dictionary to map the numerical string values of threshold-typeinput option elements to the corresponding cv.THRESH_... values
var threshold_type_dict = {
  0: "cv.THRESH_BINARY",
  1: "cv.THRESH_BINARY_INV",
  2: "cv.THRESH_TRUNC",
  3: "cv.THRESH_TOZERO",
  4: "cv.THRESH_TOZERO_INV",
};

// Declare global variables for the parameters of ../open_cv_utilities.adaptive_threshold_image_from_file
var adaptive_threshold_image_from_file_block_size = 3;
var adaptive_threshold_image_from_file_c = 2;
var adaptive_threshold_image_from_file_threshold_type =
  "cv.ADAPTIVE_THRESH_GAUSSIAN_C";

var input_container = document.getElementById("input-container");
// Declare variables for the html input elements #input-container in index.html
var threshold_value_text_input = document.getElementById(
  "threshold_text_input"
);
var threshold_range_input = document.getElementById("threshold_range_input");
var max_value_text_input = document.getElementById("max_value_text_input");
var max_value_range_input = document.getElementById("max_value_range_input");
var threshold_type_input = document.getElementById("threshold_type_input");
var button = document.getElementById("button");

// Update threshold_value when the corresponding *_text_input and *_range_input values are changed
threshold_value_text_input.addEventListener("change", function () {
  if (
    threshold_value_text_input.value > 0 &&
    threshold_value_text_input.value < MAX_GRAY_VALUE
  ) {
    threshold_value = threshold_value_text_input.value;
    threshold_range_input.value = threshold_value;
    threshold_image_from_file();
  }
});
threshold_range_input.addEventListener("change", function () {
  threshold_value = threshold_range_input.value;
  threshold_value_text_input.value = threshold_value;
  threshold_image_from_file();
});

// Update max_value when the corresponding *_text_input and *_range_input values are changed
max_value_text_input.addEventListener("change", function () {
  if (
    max_value_text_input.value > 0 &&
    max_value_text_input.value < MAX_GRAY_VALUE
  ) {
    max_value = max_value_text_input.value;
    max_value_range_input.value = max_value;
    threshold_image_from_file();
  }
});
max_value_range_input.addEventListener("change", function () {
  max_value = max_value_range_input.value;
  max_value_text_input.value = max_value;
  threshold_image_from_file();
});

// Update threshold_type when the corresponding *_input value is changed
threshold_type_input.addEventListener("change", function () {
  threshold_type = threshold_type_dict[threshold_type_input.value];
  threshold_image_from_file();
});

// When button is clicked, send the parameters to the server with a POST request
button.addEventListener("click", function () {
  threshold_image_from_file();
});

// // Function that sends a POST request to the server on the route /threshold using the XMLHttpRequest API
function threshold_image_from_file() {
  var data = new FormData();
  data.append("threshold_value", threshold_value);
  data.append("max_value", max_value);
  data.append("threshold_type", threshold_type);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/threshold", true);
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
  xhr.send(data);
}

// // Function that sends a POST request to the server on the route /threshold using the fetch API
// function threshold_image_from_file_fetch() {
//     fetch("/threshold", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             threshold_value: threshold_image_from_file_threshold_value,
//             max_value: threshold_image_from_file_max_value,
//             threshold_type: threshold_image_from_file_threshold_type
//         })
//     });
// }
