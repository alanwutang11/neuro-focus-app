# imports
import os
import sys
from tempfile import gettempdir
from subprocess import call
import numpy as np
from scipy.signal import butter, lfilter, lfilter_zi
from pylsl import StreamInlet, resolve_byprop  # Module to receive EEG data


# initialize notches for bandpass filter
NOTCH_B, NOTCH_A = butter(4, np.array([55, 65])/(256/2), btype='bandstop')

def record_eeg_filtered(r_length, freq, channel_i, notch = False, filter_state=None):
    streams = resolve_byprop('type', 'EEG', timeout=2)
    inlet = StreamInlet(streams[0], max_chunklen=12)

    """ Records EEG data from headset
    Arguments:
    r_length  -- how many seconds of data to record
    freq      -- sample rate
    channel_i -- channels to keep data from
    Returns:
    data      -- array of recorded data [sample, channel]
    """

    data, timestamps = inlet.pull_chunk(
        timeout=r_length + 1,
        max_samples=int(freq * r_length))

    data = np.array(data)[:, channel_i]

    if notch:
        if filter_state is None:
            filter_state = np.tile(lfilter_zi(NOTCH_B, NOTCH_A),
                                   (data.shape[1], 1)).T

        data, filter_state = lfilter(NOTCH_B, NOTCH_A, data, axis=0,
                                         zi=filter_state)
    return data

#def record_eeg(r_length, freq, channel_i):
#	streams = resolve_byprop('type', 'EEG', timeout=2)
#
#	inlet  = StreamInlet(streams[0], max_chunklen=12)
#	""" Records EEG data from headset
#	Arguments:
#	r_length  -- how many seconds of data to record
#	freq      -- sample rate
#	channel_i -- channels to keep data from
#	Returns:
#	data      -- array of recorded data [sample, channel]
#	"""
#
#	data, timestamps = inlet.pull_chunk(
#		timeout = r_length + 1,
#		max_samples = int(freq * r_length))
#
#	data = np.array(data)[:, channel_i]
#
#	return data


def update_buffer(data_buffer, new_data, notch = False, filter_state = None):
    """ Title: BCI Workshop Auxiliary Tools
	Author: Cassani
	Date: May 08 2015
	Availability: https://github.com/NeuroTechX/bci-workshop
	Updates the buffer with new data and applies butterworth filter
	Arguments:
	buffer       -- array for eeg data buffer [samples][channels]
	new_data     -- array with new data from channel [samples][channels]
	apply_filter -- (Boolean) when True, apply filter to buffer
	filter_state -- array of filtered values
	Returns:
	new_buffer   -- array of updated buffer [samples][channels]
	"""

    if new_data.ndim == 1:

        new_data = new_data.reshape(-1, data_buffer.shape[1])

    if notch:
        if filter_state is None:
            filter_state = np.tile(lfilter_zi(NOTCH_B, NOTCH_A),
                                   (data_buffer.shape[1], 1)).T

        new_data, filter_state = lfilter(NOTCH_B, NOTCH_A, new_data, axis=0,
                                         zi = filter_state)

    new_buffer = np.concatenate((data_buffer, new_data), axis=0)
    # new_buffer = new_buffer[new_data.shape[0]:, :]

    return new_buffer, filter_state



def epoch_array(eeg_data, epoch_length, overlap_length, freq):
	""" Title: BCI Workshop Auxiliary Tools
	Author: Cassani
	Date: May 08 2015
	Availability: https://github.com/NeuroTechX/bci-workshop """

	""" Divides eeg data into epochs of specified length
	Arguments:
	eeg_data  -- 2D array of eeg_data [samples, channels]
	n_samples -- number of samples for each epoch (int)
	overlap   -- number of samples that overlap from previous epoch
	freq      -- sample rate
	Returns:
	epochs    -- 3D array of epochs [epoch_samples, channels, epochs]
	"""
	freq = np.abs(freq)

	n_total_samples, n_channels = eeg_data.shape

	# convert seconds to number of samples
	epoch_n_samples   = 256 #epoch_length * freq
	overlap_n_samples = 205 #overlap_length * freq
	shift_n_samples  = 51 #epoch_n_samples - overlap_n_samples

	# total number of epochs
	n_epochs = int(np.floor((n_total_samples - epoch_n_samples)
	/ float(shift_n_samples)) + 1)

	# markers to indicate where epochs start and how many samples per epoch
	markers = np.asarray(range(0, n_epochs + 1)) * shift_n_samples
	markers = markers.astype(int)

	# initialize array to hold epoch data
	epochs = np.zeros((epoch_n_samples, n_channels, n_epochs))

	# divide eeg_data into epochs
	for i in range(0, n_epochs):
		epochs[:,:,i] = eeg_data[markers[i]:markers[i] + epoch_n_samples, :]

	return epochs


def get_last_data(eeg_buffer, n_samples):
	""" Title: BCI Workshop Auxiliary Tools
	Author: Cassani
	Date: May 08 2015
	Availability: https://github.com/NeuroTechX/bci-workshop """
	""" Grabs latest data from buffer
	Arguments:
	eeg_buffer -- array of raw eeg data [samples][channels]
	n_samples  -- number of samples to to pull from buffer
	Returns:
	last_data -- array that holds latest data [values]
	"""

	last_data = eeg_buffer[(eeg_buffer.shape[0] - n_samples):, :]

	return last_data


def next_pow_2(x):
	""" Gets the next power of two greater than x.
	Arguments:
	x -- input value
	Returns:
	y -- next power of 2
	"""

	n = 1
	while n < x:
		n = n * 2
	return n



def compute_band_powers(epoch, freq):
	""" Title: BCI Workshop Auxiliary Tools
	Author: Cassani
	Date: May 08 2015
	Availability: https://github.com/NeuroTechX/bci-workshop """

	""" Computes band powers as feature matrix from epoch
	Arguments:
	epoch       -- 2D array of epoch data [samples, channels]
	freq        -- (float) sample rate
	Returns:
	band_powers --  2D array containing features
	--  [feature values, different features (delta, theta etc...)]
	"""

	sample_length, n_channels = epoch.shape

	# Hammming Window
	hwin            = np.hamming(sample_length)
	data_centered   = epoch - np.mean(epoch, axis=0)
	h_data_centered = (data_centered.T * hwin).T

	# length of axis for FFT output
	n_axis = next_pow_2(sample_length)

	# compute one-dimensional FFT
	fastFT = np.fft.fft(h_data_centered, n = n_axis, axis = 0) / sample_length

	# compute Power Spectral Density (true theoretical FFT)
	PSD = 2 * np.abs(fastFT[0:int(n_axis / 2), :])

	# frequency bins so separate features
	freq_bin = freq / 2 * np.linspace(0, 1, int(n_axis / 2))


	# Separate band powers and take mean for the epoch
	# Delta < 4
	delta_index, = np.where(freq_bin < 4)
	meanDelta    = np.mean(PSD[delta_index, :], axis=0)

	# Theta 4-8
	theta_index, = np.where((freq_bin >= 4) & (freq_bin <= 8))
	meanTheta    = np.mean(PSD[theta_index, :], axis=0)

	# Alpha 8-12
	alpha_index, = np.where((freq_bin >= 8) & (freq_bin <= 12))
	meanAlpha    = np.mean(PSD[alpha_index, :], axis=0)

	# Beta 12-30
	beta_index,  = np.where((freq_bin >= 12) & (freq_bin < 30))
	meanBeta     = np.mean(PSD[beta_index, :], axis=0)

	band_powers  = np.concatenate((meanDelta, meanTheta,
	meanAlpha, meanBeta), axis=0)
	band_powers  = np.log10(band_powers)

	return band_powers


def compute_feature_matrix(epochs, freq):
    """ Title: BCI Workshop Auxiliary Tools
    Author: Cassani
    Date: May 08 2015
    Availability: https://github.com/NeuroTechX/bci-workshop """
    """ Computes band powers for multiple epochs
    Arguments:
    epochs         -- 3D array of epochs [epoch_samples, channels, epochs]
    freq           -- (float)sample rate
    Returns:
    feature_matrix -- matrix of epochs and corresponding features
    -- [epochs][band powers]
    """

    n_epochs = epochs.shape[2]
    print(n_epochs)

    # call compute_band_powers for each epoch
    for epoch in range(n_epochs):
        # first epoch initialze matrix
        if epoch == 0:
            feat = compute_band_powers(epochs[:, :, epoch], freq).T
            feature_matrix = np.zeros((n_epochs, feat.shape[0]))

        print(epoch)
        print(epochs[:, :, epoch])

        feature_matrix[epoch, :] = compute_band_powers(
            epochs[:, :, epoch], freq).T
        #print(feature_matrix)

    return feature_matrix



def calc_ratio(feature_matrix, baseline):
    ratio_arr = []

    for epoch in feature_matrix:
        ratio1 = epoch[0]/epoch[1]
        ratio2 = epoch[2]/epoch[3]
        ratio3 = epoch[4] / epoch[5]
        ratio4 = epoch[6] / epoch[7]
        ratio_avg = (1/ratio1 + 1/ratio2 + 1/ratio3 + 1/ratio4)/4
        percent_change = ((ratio_avg-baseline)/baseline)*100
        ratio_arr.append(percent_change)


    return ratio_arr

def calc_baseline(feature_matrix):
    ratio_arr = []

    for epoch in feature_matrix:
        ratio1 = epoch[0]/epoch[1]
        ratio2 = epoch[2]/epoch[3]
        ratio3 = epoch[4] / epoch[5]
        ratio4 = epoch[6] / epoch[7]
        ratio_avg = (ratio1 + ratio2 + ratio3 + ratio4)/4
        ratio_arr.append(ratio_avg)

    baseline_val = sum(ratio_arr)/len(ratio_arr)
    return baseline_val
