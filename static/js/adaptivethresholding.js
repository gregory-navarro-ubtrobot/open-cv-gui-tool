// Declare variables for openCV Adaptive Threshold parameters
var max_value = 255;
var block_size = 5;
var constant = 2;
var adaptive_method= "cv.ADAPTIVE_THRESH_GAUSSIAN_C";


// Declare variables for the html input elements #input-container in index.html
var max_value_text_input = document.getElementById("max_value_text_input");
var max_value_range_input = document.getElementById("max_value_range_input");
var block_size_input = document.getElementById("block_size_input");
var increment_block_size = document.getElementById("increment_block_size");
var decrement_block_size = document.getElementById("decrement_block_size");
var constant_input = document.getElementById("constant_input");
var increment_constant = document.getElementById("increment_constant");
var decrement_constant = document.getElementById("decrement_constant");
var threshold_type_input = document.getElementById("threshold_type_input");
var button = document.getElementById("button");

// Update max_value when the corresponding *_text_input and *_range_input values are changed
max_value_text_input.addEventListener("change", function() {
    if (max_value_text_input.value > 0 && max_value_text_input.value < 256) {
        max_value = max_value_text_input.value;
        max_value_range_input.value = max_value;
        threshold_image_from_file();
    }
});

max_value_range_input.addEventListener("change", function() {
    max_value = max_value_range_input.value;
    max_value_text_input.value = max_value;
    threshold_image_from_file();
});

// Update adaptive_methodwhen the corresponding *_input value is changed
threshold_type_input.addEventListener("change", function() {
    adaptive_method= threshold_type_input.value;
    threshold_image_from_file();
});

// Update block_size when the corresponding values are changed
block_size_input.addEventListener("change", function() {
    if (block_size_input.value > 0 && block_size_input.value < 256 && block_size_input.value % 2 == 1) {
        block_size = block_size_input.value;
        threshold_image_from_file();
    }
});

increment_block_size.addEventListener("click", function() {
    block_size += 2;
    block_size_input.value = block_size;
    threshold_image_from_file();
});

decrement_block_size.addEventListener("click", function() {
    block_size -= 2;
    block_size_input.value = block_size;
    threshold_image_from_file();
}
);

// Update constant when the corresponding values are changed
constant_input.addEventListener("change", function() {
    if (constant_input.value > 0 && constant_input.value < 256) {
        constant = constant_input.value;
        constant_input.value = constant;
        threshold_image_from_file();
    }
})

increment_constant.addEventListener("click", function() {
    constant += 1;
    constant_input.value = constant;
    threshold_image_from_file();
});

decrement_constant.addEventListener("click", function() {
    constant -= 1;
    constant_input.value = constant;
    threshold_image_from_file();
});

// Update the image when the button is clicked
button.addEventListener("click", function() {
    threshold_image_from_file();
}
);



// Function that sends a POST request to the server on the route /threshold using the XMLHttpRequest API
function threshold_image_from_file() {
  var data = new FormData();
  data.append("threshold_value", 127);
  data.append("max_value", max_value);
  data.append("threshold_type", "cv.THRESH_BINARY");
  data.append("adaptive_threshold_type", adaptive_method);
  data.append("block_size", block_size);
  data.append("constant", constant);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/adaptivethreshold", true);
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

threshold_image_from_file();



