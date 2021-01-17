# imports
import argparse
import numpy as np
import bci_helper as BCI
from pylsl import StreamInlet, resolve_byprop
import os
from flask import jsonify
import json


class MuseStream:

    # Attributes
    BUFFER_LENGTH   = 5
    EPOCH_LENGTH    = 1
    OVERLAP_LENGTH  = 0.8
    SHIFT_LENGTH    = EPOCH_LENGTH - OVERLAP_LENGTH
    TRAINING_LENGTH = 1
    INDEX_CHANNEL   = [0, 1 , 2, 3] # use all four electrodes
    N_CHANNELS      = 4

    # Class Variables
    freq = 256
    eeg_raw = np.ndarray(shape = (8,4))
    recording = False
    filter_state = None
    baseline = []

    def __init__(self):

        print('Connecting...')
        streams = resolve_byprop('type', 'EEG', timeout=2)
        if len(streams) == 0:
            raise RuntimeError('Can\'t find EEG stream.')

        # set up Inlet
        inlet = StreamInlet(streams[0], max_chunklen=12)
        eeg_time_correction = inlet.time_correction()

        # Pull relevant information
        info            = inlet.info()
        self.desc       = info.desc()
        self.freq       = int(info.nominal_srate())

        ## TRAIN DATASET
        print('Recording Baseline')
        eeg_data_baseline = BCI.record_eeg_filtered(
                                    self.TRAINING_LENGTH,
                                    self.freq,
                                    self.INDEX_CHANNEL,
                                    True, )
        eeg_epochs_baseline = BCI.epoch_array(
                                    eeg_data_baseline,
                                    self.EPOCH_LENGTH,
                                    self.OVERLAP_LENGTH * self.freq,
                                    self.freq)
        feat_matrix_baseline = BCI.compute_feature_matrix(
                                    eeg_epochs_baseline,
                                    self.freq)
        self.baseline = BCI.calc_baseline(feat_matrix_baseline)

    def startRecording(self):
        self.recording = True
        try:
            while (self.recording == True):
                streams = resolve_byprop('type', 'EEG', timeout=2)
                inlet  = StreamInlet(streams[0], max_chunklen=12)
                # Obtain EEG data from the LSL stream
                eeg_data, timestamp = inlet.pull_chunk(
                    timeout=1, max_samples=int(self.SHIFT_LENGTH * self.freq))

                ch_data = np.array(eeg_data)[:, self.INDEX_CHANNEL]

                # Update EEG data and apply filter
                self.eeg_raw, self.filter_state = BCI.update_buffer(
                    self.eeg_raw,
                    ch_data,
                    notch=True,
                    filter_state = self.filter_state)

        except KeyboardInterrupt:
            print("Exception")
        #return json.dumps(self.eeg_raw)
        return " "

    # def processEEG(eeg_raw):


    def stopRecording(self):
        self.recording = False
        print(self.eeg_raw)
        eeg_epochs = BCI.epoch_array(self.eeg_raw,
                    self.EPOCH_LENGTH,
                    self.OVERLAP_LENGTH * self.freq,
                    self.freq)
        print(eeg_epochs.shape)
        feat_matrix = BCI.compute_feature_matrix(eeg_epochs,
                                            self.freq)


        percent_change = BCI.calc_ratio(feat_matrix, self.baseline)
        print(percent_change)
        q75, q25 = np.percentile(percent_change, [75, 25])
        iqr = q75 - q25
        lower_bound = q25 - (1.5 * iqr)
        upper_bound = q75 + (1.5 * iqr)
        for x in range(0,len(percent_change)):
            if (percent_change[x] > upper_bound):
                percent_change[x] = np.median(percent_change)
            if (percent_change[x] < lower_bound):
                percent_change[x] = np.median(percent_change)
        # return percent_change
        #data = self.processEEG(self.eeg_raw)

        return jsonify(percent_change)
