# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT

""" Display compass heading data five times per second """
import time
from math import atan2, degrees
import board
import adafruit_lsm303dlh_mag

i2c = board.I2C()  # uses board.SCL and board.SDA
# i2c = board.STEMMA_I2C()  # For using the built-in STEMMA QT connector on a microcontroller
sensor = adafruit_lsm303dlh_mag.LSM303DLH_Mag(i2c)


def vector_2_degrees(x, y):
    angle = degrees(atan2(y, x))
    if angle < 0:
        angle += 360
    return angle


def get_heading(_sensor):
    mag = _sensor.magnetic
    magnet_x, magnet_y, _ = mag
    print("Magnetometer (micro-Teslas)): X=%0.3f Y=%0.3f Z=%0.3f"%mag)
    return vector_2_degrees(magnet_x, magnet_y)


while True:
    print("heading: {:.2f} degrees".format(get_heading(sensor)))
    time.sleep(0.2)