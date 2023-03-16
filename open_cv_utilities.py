import numpy as np
import cv2

def show_image(image, window_name='image'):
    cv2.imshow(window_name, image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def show_image_from_file(image_file, window_name='image'):
    image = cv2.imread(image_file)
    show_image(image, window_name)

def show_image_from_url(image_url, window_name='image'):
    image = cv2.imread(image_url)
    show_image(image, window_name)

def grayscale_image(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def grayscale_image_from_file(image_file):
    image = cv2.imread(image_file)
    return grayscale_image(image)

# Apply a threshold to an image
def threshold_image(image, threshold_value=127, max_value=255, threshold_type=cv2.THRESH_BINARY):
    threshold_lookup = {
        'cv.THRESH_BINARY': cv2.THRESH_BINARY,
        'cv.THRESH_BINARY_INV': cv2.THRESH_BINARY_INV,
        'cv.THRESH_TRUNC': cv2.THRESH_TRUNC,
        'cv.THRESH_TOZERO': cv2.THRESH_TOZERO,
        'cv.THRESH_TOZERO_INV': cv2.THRESH_TOZERO_INV,
        'cv.THRESH_BINARY+cv.THRESH_OTSU': cv2.THRESH_BINARY+cv2.THRESH_OTSU,
    }
    ret,thresh1 = cv2.threshold(image, threshold_value, max_value, threshold_lookup[threshold_type])
    return thresh1

def threshold_image_from_file(image_file, threshold_value=127, max_value=255, threshold_type=cv2.THRESH_BINARY):
    image = cv2.imread(image_file, cv2.IMREAD_GRAYSCALE)
    blur = cv2.GaussianBlur(image,(5,5),0)
    return threshold_image(blur, threshold_value, max_value, threshold_type)

# Apply an adaptive threshold to an image
def adaptive_threshold_image(image, max_value=255, adaptive_method=cv2.ADAPTIVE_THRESH_MEAN_C, threshold_type=cv2.THRESH_BINARY, block_size=11, C=2):
    return cv2.adaptiveThreshold(image, max_value, adaptive_method, threshold_type, block_size, C)

def adaptive_threshold_image_from_file(image_file, max_value=255, adaptive_method=cv2.ADAPTIVE_THRESH_MEAN_C, threshold_type=cv2.THRESH_BINARY, block_size=11, C=2):
    image = cv2.imread(image_file, cv2.IMREAD_GRAYSCALE)
    return adaptive_threshold_image(image, max_value, adaptive_method, threshold_type, block_size, C)

# Apply a Canny edge detection to an image
def canny_edge_image(image, threshold1=100, threshold2=200):
    return cv2.Canny(image, threshold1, threshold2)

def canny_edge_image_from_file(image_file, threshold1=100, threshold2=200):
    image = cv2.imread(image_file, cv2.IMREAD_GRAYSCALE)
    return canny_edge_image(image, threshold1, threshold2)

# Apply a Sobel edge detection to an image
def sobel_edge_image(image, ddepth=cv2.CV_64F, dx=1, dy=0, ksize=5):
    return cv2.Sobel(image, ddepth, dx, dy, ksize)

def sobel_edge_image_from_file(image_file, ddepth=cv2.CV_64F, dx=1, dy=0, ksize=5):
    image = cv2.imread(image_file, cv2.IMREAD_GRAYSCALE)
    return sobel_edge_image(image, ddepth, dx, dy, ksize)

# Apply a Laplacian edge detection to an image
def laplacian_edge_image(image, ddepth=cv2.CV_64F, ksize=5):
    return cv2.Laplacian(image, ddepth, ksize)

def laplacian_edge_image_from_file(image_file, ddepth=cv2.CV_64F, ksize=5):
    image = cv2.imread(image_file, cv2.IMREAD_GRAYSCALE)
    return laplacian_edge_image(image, ddepth, ksize)

# Apply a Gaussian blur to an image
def gaussian_blur_image(image, ksize=(5,5), sigmaX=0):
    return cv2.GaussianBlur(image, ksize, sigmaX)

def gaussian_blur_image_from_file(image_file, ksize=(5,5), sigmaX=0):
    image = cv2.imread(image_file, cv2.IMREAD_GRAYSCALE)
    return gaussian_blur_image(image, ksize, sigmaX)

# Apply a median blur to an image
def median_blur_image(image, ksize=5):
    return cv2.medianBlur(image, ksize)

def median_blur_image_from_file(image_file, ksize=5):
    image = cv2.imread(image_file, cv2.IMREAD_GRAYSCALE)
    return median_blur_image(image, ksize)

# Apply a hough transform to an image
def hough_transform_image(image, rho=1, theta=np.pi/180, threshold=100, min_line_length=100, max_line_gap=10):
    return cv2.HoughLinesP(image, rho, theta, threshold, np.array([]), minLineLength=min_line_length, maxLineGap=max_line_gap)

def hough_transform_image_from_file(image_file, rho=1, theta=np.pi/180, threshold=100, min_line_length=100, max_line_gap=10):
    image = cv2.imread(image_file, cv2.IMREAD_GRAYSCALE)
    print(image)
    print(image.shape)
    print(image.size)
    print(image[0].size)
    i = 0
    for row in image:
        if row.size != image[0].size:
            print(i, row)
            print(row.size)
        i += 1
    print(i)
    return hough_transform_image(image, rho, theta, threshold, min_line_length, max_line_gap)

# Apply a probabalistic hough transform to an image
def probabalistic_hough_transform_image(image, rho=1, theta=np.pi/180, threshold=100, min_line_length=100, max_line_gap=10):
    return cv2.HoughLinesP(image, rho, theta, threshold, np.array([]), minLineLength=min_line_length, maxLineGap=max_line_gap)

def probabalistic_hough_transform_image_from_file(image_file, rho=1, theta=np.pi/180, threshold=100, min_line_length=100, max_line_gap=10):
    image = cv2.imread(image_file)
    return probabalistic_hough_transform_image(image, rho, theta, threshold, min_line_length, max_line_gap)

# Apply image processing pipeline from https://docs.opencv.org/3.4/d9/db0/tutorial_hough_lines.html
# Loads an image, converts it to grayscale, applies a Gaussian blur, applies a Canny edge detection, applies a Hough transform, and draws the lines on the original image
def hough_transform_pipeline(image, rho=1, theta=np.pi/2, threshold=100, min_line_length=90, max_line_gap=35):
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Apply Gaussian blur
    blur = cv2.GaussianBlur(gray,(5,5),0)
    # Apply Canny edge detection
    edges = cv2.Canny(blur, 50, 200) # , apertureSize = 3)
    # Apply Hough transform
    lines = cv2.HoughLinesP(edges, rho, theta, threshold, min_line_length, max_line_gap)
    # Draw lines on original image
    if lines is None:
        print("No lines found")
        return image
    else:
        print("Lines found:" + str(len(lines)) + " lines")
    for line in lines:
        for x1,y1,x2,y2 in line:
            cv2.line(image,(x1,y1),(x2,y2),(0,255,0),2)
    return image

def hough_transform_pipeline_from_file(image_file, rho=1, theta=np.pi/180, threshold=100, min_line_length=100, max_line_gap=10):
    image = cv2.imread(image_file, cv2.IMREAD_COLOR)
    return hough_transform_pipeline(image, rho, theta, threshold, min_line_length, max_line_gap)