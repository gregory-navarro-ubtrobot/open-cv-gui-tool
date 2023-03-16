# Flask App for OpenCV Parameter Manipulation

This Flask app provides a browser-based interface for manipulating the parameters of the OpenCV methods thresholding, adaptive thresholding, and Hough line transform.

The purpose of htis tool is to interactively test a range of input parameters across a variety of OpenCV methods in order to identify techniques taht can be applied to an automated image processing pipeline.

## Prerequisites

Before running the Flask app, you need to install the following dependencies:

- Python 3.6 or later
- Flask 2.0 or later
- OpenCV 4.5 or later

## Installation

1. Clone the repository to your local machine:
`git clone https://github.com/gregory-navarro-ubtrobot/opencv-flask-app.git`
2. Change into the app directory:
`cd opencv-flask-app`
3. Optionally, set up a virtual environment with `venv` or `conda`
4. Install the dependencies listed in Prerequisites

## Usage

To start the Flask app, run either sequence of commands:
1. Using environment variables, specify the app that flask should run. Then start the server.
`export FLASK_APP=opencvguitool`
`python3 -m flask run`
2. Using the command line arguments, specify the app to run.
`python3 -m flask --app opencvguitool run` 

This will start the app on http://localhost:5000/.

### Selecting an image to process

To process an image: 
1. Put the image into the `opencvguitool/static/images/unprocessed-maps` directory.
2. On line 16 of `opencvguitool/__init.py` set the image name:
`image_name=<filename of image>`
3. Start the app.

### Saving processed images

All processed images are saved in the `opencvguitool/static/images/processed-maps` directory. The filenames encode the values used to generate each image. The encoding schemes are as follows.

#### Thresholding encoding scheme
 `<name of image>_<threshold type>_<threshold value>_<max value><extension>`
  
#### Adaptive Thresholding encoding scheme
 `<name of image>_<max value>_<block size>_<constant><extension>`

#### Hough Line Transform encoding scheme
 `<name of image>_<threshold value>_<rho>_<theta>_<min line length>_<max line length><extension>`

### Thresholding

The thresholding page allows you to apply a binary threshold to an input image.

1. Click on the "Thresholding" link in the navigation menu.

2. Choose a thresholding method from the dropdown menu.

3. Adjust the threshold value and max value using the sliders. 

4. The image will be processed and reloaded asynchronously each time these are changed. Optionally, click the "Apply" button to apply the threshold to the image.

### Adaptive Thresholding

The adaptive thresholding page allows you to apply an adaptive binary threshold to an input image.

1. Click on the "Adaptive Thresholding" link in the navigation menu.

2. Choose an adaptive thresholding method from the dropdown menu.

3. Adjust the block size and constant values using the sliders.

4. The image will be processed and reloaded asynchronously each time these are changed. Optionally, click the "Apply" button to apply the threshold to the image.


### Hough Line Transform

The Hough line transform page allows you to detect straight lines in an input image using the Hough line transform.

1. Click on the "Hough Line Transform" link in the navigation menu.

2. Adjust the Hough line transform parameters using the sliders.

3. The image will be processed and reloaded asynchronously each time these are changed. Optionally, click the "Apply" button to apply the threshold to the image.


