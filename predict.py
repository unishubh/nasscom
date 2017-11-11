from keras.models import load_model

model = load_model('/home/shubh/Downloads/lstm.h5')
model.compile(loss='binary_crossentropy',
              optimizer='rmsprop',
              metrics=['accuracy'])
import pandas as pd
import numpy as np
import glob, os
import time
import pickle
import matplotlib.pyplot as plt
import math
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, TimeDistributed
from keras.layers import LSTM, GRU
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from keras.optimizers import SGD
import random
#np.seed(7)

with open('/home/shubh/Downloads/Code/code/preprocess.pickle', 'rb') as handle:
    [X,  Y] = pickle.load(handle)
Y.drop(['RecordID'],1, inplace=True)
Y = np.array(Y)

from sklearn.model_selection import StratifiedShuffleSplit
sss = StratifiedShuffleSplit(n_splits=1, test_size=0.4, random_state=2)
sss.get_n_splits(X, Y)

for train_index, test_index in sss.split(X, Y):
    #print("TRAIN:", train_index, "TEST:", test_index)
    train_X, test1_X = X[train_index], X[test_index]
    train_Y, test1_Y = Y[train_index], Y[test_index]

sss1 = StratifiedShuffleSplit(n_splits=1, test_size=0.5, random_state=0)
sss1.get_n_splits(test1_X, test1_Y)

for test_index, val_index in sss1.split(test1_X, test1_Y):
    #print("TRAIN:", train_index, "TEST:", test_index)
    test_X, val_X = test1_X[test_index], test1_X[val_index]
    test_Y, val_Y = test1_Y[test_index], test1_Y[val_index]

print train_X.shape, test_X.shape, train_Y.shape, test_Y.shape, val_X.shape, val_Y.shape

print(len(train_X), len(test_X))
print(len(train_Y), len(test_Y))
za = random.randint(1,20)
test_X1 =test_X[za:za+1,:49,:37]
# print test_X1
test_out = model.predict(test_X1,batch_size =1)
print str(test_out[0][0])
f = open('../myOutput.txt', 'w+')
f.write(str(test_out[0][0])+'\n')  # python will convert \n to os.linesep
f.close()  