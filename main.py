def tempFan():
    global minTemp, maxTemp, temper
    minTemp = fanData[3]
    maxTemp = fanData[4]
    while fanData[0] == 1:
        temper = randint(21, 29)
        if temper <= minTemp:
            adjustSpeed(0)
        elif temper >= maxTemp:
            adjustSpeed(9)
        else:
            adjustSpeed((temper - minTemp) / (maxTemp - minTemp) * 9)
        basic.pause(2000)
def adjustMode():
    if fanData[0] == 0:
        adjustSpeed(0)
    if fanData[0] == 1:
        adjustSpeed(fanData[1])
    if fanData[0] == 2:
        timeFan()
    if fanData[0] == 3:
        tempFan()
def timeFan():
    global hour, minute
    adjustSpeed(fanData[1])
    ds.set_hour(0)
    ds.set_minute(0)
    ds.set_second(0)
    hour = int(fanData[2] / 100)
    minute = fanData[2] % 100
    while fanData[0] == 2:
        if ds.get_hour() == hour and ds.get_minute() == minute:
            fanData[0] = 0
        basic.pause(1000)
def adjustSpeed(speed: number):
    pins.analog_write_pin(AnalogPin.P4, 348 + speed * 75)
    pins.digital_write_pin(DigitalPin.P8, 0)
    pins.digital_write_pin(DigitalPin.P9, 0)
    pins.digital_write_pin(DigitalPin.P10, 0)
    if speed > 6:
        pins.digital_write_pin(DigitalPin.P8, 1)
    elif speed > 3:
        pins.digital_write_pin(DigitalPin.P9, 1)
    elif speed > 0:
        pins.digital_write_pin(DigitalPin.P10, 1)
minute = 0
hour = 0
temper = 0
maxTemp = 0
minTemp = 0
ds: DS1302.DS1302RTC = None
fanData: List[number] = []
led.enable(False)
makerbit.connect_ir_receiver(DigitalPin.P0, IrProtocol.KEYESTUDIO)
fanData = [0, 5, 230, 20, 30]
ds = DS1302.create(DigitalPin.P13, DigitalPin.P14, DigitalPin.P15)
dht11_dht22.query_data(DHTtype.DHT11, DigitalPin.P1, True, False, False)
adjustMode()