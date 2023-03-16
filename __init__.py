
from flask import Flask, render_template, request
from opencvguitool.open_cv_utilities import grayscale_image_from_file, threshold_image_from_file, adaptive_threshold_image_from_file, hough_transform_image_from_file, probabalistic_hough_transform_image_from_file, hough_transform_pipeline_from_file
import opencvguitool.helloworld
import os 
import cv2
import json 

print('opencvguitool/__init__.py')

app = Flask(__name__)
server_image_folder = 'opencvguitool/static/images/'
client_images_folder = '/static/images/'
app.config['UPLOAD_FOLDER'] = server_image_folder

# path of unprocessed image for server and client
image_name = "InstructPix2pixTest1.png"# 'cubicles-1.png'
image_directory = 'unprocessed-maps'
server_image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_directory, image_name)
client_image_path = os.path.join(client_images_folder, image_directory, image_name)

# path for saving processed image
processed_image_folder = 'processed-maps/binary-threshold'
server_processed_image_folder = os.path.join(app.config['UPLOAD_FOLDER'], processed_image_folder)
client_processed_image_folder = os.path.join(client_images_folder, processed_image_folder)
processed_image_base_name = image_name.replace('.png', '')
processed_image_extension = '.png'  


@app.route('/')
def index():
  return render_template('thresholding.html', unprocessed_image=client_image_path, processed_image=client_image_path)

# POST route for collecting data from the form and calling the function threshold_image_from_file with unprocessed_image_path and threshold_value from the form
@app.route('/threshold', methods=['GET', 'POST'])
def threshold():
  if request.method == 'GET':
    return render_template('thresholding.html', unprocessed_image=client_image_path, processed_image=client_image_path)
  threshold_value = int(request.form['threshold_value'])
  max_value = int(request.form['max_value'])
  threshold_type = str(request.form['threshold_type'])
  threshold_image = threshold_image_from_file(server_image_path, threshold_value=threshold_value, max_value=max_value, threshold_type=threshold_type)
  # save image to file 
  processed_image_name = processed_image_base_name + "_" + threshold_type.replace("cv.", "") + "_" + str(threshold_value) + "_" + str(max_value) + processed_image_extension
  processed_image_path = os.path.join(app.config['UPLOAD_FOLDER'], processed_image_folder, processed_image_name)
  cv2.imwrite(processed_image_path, threshold_image)
  client_processed_image_path = os.path.join(client_processed_image_folder, processed_image_name)
  return json.dumps({'success':True, 'unprocessed_image': client_image_path, 'processed_image': client_processed_image_path}), 200, {'ContentType':'application/json'}

# POST route for collecting data from the form and calling the function adaptive_threshold_image_from_file with unprocessed_image_path and threshold_value from the form
@app.route('/adaptivethreshold', methods=['GET', 'POST'])
def adaptive_threshold():
  if request.method == 'GET':
    return render_template('adaptivethresholding.html', unprocessed_image=client_image_path, processed_image=client_image_path)
  max_value = int(request.form['max_value'])
  adaptive_threshold_type = str(request.form['adaptive_threshold_type'])
  block_size = int(request.form['block_size'])
  constant = int(request.form['constant'])
  adaptive_threshold_image = adaptive_threshold_image_from_file(server_image_path, max_value=max_value, block_size=block_size, C=constant)
  # save image to file 
  processed_image_name = processed_image_base_name + "_" + adaptive_threshold_type.replace("cv.", "") + "_" + str(max_value) + "_" + str(block_size) + "_" + str(constant) + processed_image_extension
  processed_image_path = os.path.join(app.config['UPLOAD_FOLDER'], processed_image_folder, processed_image_name)
  cv2.imwrite(processed_image_path, adaptive_threshold_image)
  client_processed_image_path = os.path.join(client_processed_image_folder, processed_image_name)
  return json.dumps({'success':True, 'unprocessed_image': client_image_path, 'processed_image': client_processed_image_path}), 200, {'ContentType':'application/json'}


# POST route for collecting data from the form and calling the function threshold_image_from_file with unprocessed_image_path and threshold_value from the form
@app.route('/houghlines', methods=['GET', 'POST'])
def houghlines():
  if request.method == 'GET':
    return render_template('houghlines.html', unprocessed_image=client_image_path, processed_image=client_image_path)
  data = request.get_json()
  threshold_value = int(data['threshold'])
  rho_value = int(data['rho'])
  theta_value = int(data['theta'])
  minLineLength_value = int(data['min_line_length'])
  maxLineGap_value = int(data['max_line_gap'])
  processed_image = hough_transform_pipeline_from_file(server_image_path, threshold=threshold_value, rho=rho_value, theta=theta_value, min_line_length=minLineLength_value, max_line_gap=maxLineGap_value)
  # save image to file 
  processed_image_name = processed_image_base_name + "_" + str(threshold_value) + "_" + str(rho_value) + "_" + str(theta_value) + "_" + str(minLineLength_value) + "_" + str(maxLineGap_value) + processed_image_extension
  processed_image_path = os.path.join(app.config['UPLOAD_FOLDER'], processed_image_folder, processed_image_name)
  cv2.imwrite(processed_image_path, processed_image)
  client_processed_image_path = os.path.join(client_processed_image_folder, processed_image_name)
  return json.dumps({'success':True, 'unprocessed_image': client_image_path, 'processed_image': client_processed_image_path}), 200, {'ContentType':'application/json'}