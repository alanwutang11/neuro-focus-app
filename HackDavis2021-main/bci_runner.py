"""BCI Eye Classifier"""

# imports
import argparse
import numpy as np
import matplotlib.pyplot as plt
from pylsl import StreamInlet, resolve_byprop
import os
import bci_helper as BCI
import socket

# INITIALIZE PARAMETERS
BUFFER_LENGTH = 5
EPOCH_LENGTH = 1
OVERLAP_LENGTH = 0.8
SHIFT_LENGTH = EPOCH_LENGTH - OVERLAP_LENGTH
TRAINING_LENGTH = 20
INDEX_CHANNEL = [0, 1, 2, 3]  # use all four electrodes
N_CHANNELS = 4

if __name__ == "__main__":

    """ CONNECT TO MUSE STREAM"""
    print('Connecting...')
    streams = resolve_byprop('type', 'EEG', timeout=2)
    if len(streams) == 0:
        raise RuntimeError('Can\'t find EEG stream.')
    # set up Inlet
    inlet = StreamInlet(streams[0], max_chunklen=12)
    eeg_time_correction = inlet.time_correction()

    # Pull relevant information
    info = inlet.info()
    desc = info.desc()
    freq = int(info.nominal_srate())

    """ RECORD DATA  """
    # Record each feature
    print('Recording Baseline')
    eeg_data_baseline = BCI.record_eeg_filtered(20, freq, INDEX_CHANNEL, True, )
    print('Recording Main')
    eeg_data_main = BCI.record_eeg_filtered(TRAINING_LENGTH, freq, INDEX_CHANNEL)


    # Divide data into epochs
    eeg_epochs_baseline = BCI.epoch_array(eeg_data_baseline, EPOCH_LENGTH, OVERLAP_LENGTH * freq, freq)
    eeg_epochs_main = BCI.epoch_array(eeg_data_main, EPOCH_LENGTH, OVERLAP_LENGTH * freq, freq)



    # Computer corresponding features
    feat_matrix_baseline = BCI.compute_feature_matrix(eeg_epochs_baseline, freq)
    feat_matrix_main = BCI.compute_feature_matrix(eeg_epochs_main, freq)

    baseline = BCI.calc_baseline(feat_matrix_baseline)
    percent_change = BCI.calc_ratio(feat_matrix_main, baseline)

    q75, q25 = np.percentile(percent_change, [75, 25])
    iqr = q75 - q25
    lower_bound = q25 - (1.5 * iqr)
    upper_bound = q75 + (1.5 * iqr)
    print(iqr)
    print(percent_change)
    print(baseline)
    for x in range(0,len(percent_change)):
        if (percent_change[x] > upper_bound):
            percent_change[x] = np.median(percent_change)
        if (percent_change[x] < lower_bound):
            percent_change[x] = np.median(percent_change)
    print(percent_change)










