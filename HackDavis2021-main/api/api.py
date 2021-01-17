#imports
import time
import test
from musestream import MuseStream
from flask import Flask, request


app = Flask(__name__)

# create instance of muse stream
MuseStream = MuseStream()

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/')
def home():
    return "nothing here"

@app.route('/start')
def startRecord():
    return MuseStream.startRecording()

@app.route('/done', methods = ['GET'])
def stopRecording():
    return MuseStream.stopRecording()


""" @app.route('/record', methods=['POST','GET'])
def MuseRecording():
    # http://127.0.0.1:5000/record
    if request.method == 'POST':
        # RUN RECORDING FUNCTION HERE
        return MuseStream.startRecording()
    if request.method == 'GET':
        # STOP RECORDING, RETURN JSONIFIED DATA
        return MuseStream.stopRecording()
    else:
        return "Method Not Allowed"  """
