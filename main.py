def tempFan(minTemp: number, maxTemp: number):
    global temper
    while fanData[0] == 1:
        temper = randint(21, 29)
        if temper < minTemp:
            adjustSpeed(0)
        elif temper > maxTemp:
            adjustSpeed(9)
        else:
            adjustSpeed((temper - minTemp) / (maxTemp - minTemp) * 9)
        basic.pause(2000)

def on_button_pressed_a():
    fanData[0] = 0
    adjustMode()
input.on_button_pressed(Button.A, on_button_pressed_a)

def adjustMode():
    if fanData[0] == 0:
        adjustSpeed(0)
    if fanData[0] == 1:
        tempFan(fanData[2], fanData[3])
    if fanData[0] == 2:
        adjustSpeed(fanData[1])
def adjustSpeed(speed: number):
    pins.analog_write_pin(AnalogPin.P10, speed * 1023 / 9)
    pins.digital_write_pin(DigitalPin.P13, 0)
    pins.digital_write_pin(DigitalPin.P14, 0)
    pins.digital_write_pin(DigitalPin.P15, 0)
    if speed > 6:
        pins.digital_write_pin(DigitalPin.P15, 1)
    elif speed > 3:
        pins.digital_write_pin(DigitalPin.P14, 1)
    elif speed > 0:
        pins.digital_write_pin(DigitalPin.P13, 1)
temper = 0
fanData: List[number] = []
led.enable(True)
makerbit.connect_ir_receiver(DigitalPin.P0, IrProtocol.KEYESTUDIO)
fanData = [1, 9, 20, 30]
dht11_dht22.query_data(DHTtype.DHT11, DigitalPin.P0, True, False, False)
adjustMode()