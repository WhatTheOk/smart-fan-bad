function tempFan (minTemp: number, maxTemp: number) {
    while (fanData[0] == 1) {
        temper = randint(21, 29)
        if (temper < minTemp) {
            adjustSpeed(0)
        } else if (temper > maxTemp) {
            adjustSpeed(9)
        } else {
            adjustSpeed((temper - minTemp) / (maxTemp - minTemp) * 9)
        }
        basic.pause(2000)
    }
}
function adjustMode () {
    if (fanData[0] == 0) {
        adjustSpeed(0)
    }
    if (fanData[0] == 1) {
        adjustSpeed(fanData[1])
    }
    if (fanData[0] == 2) {
        tempFan(fanData[2], fanData[3])
    }
}
function adjustSpeed (speed: number) {
    pins.analogWritePin(AnalogPin.P10, speed * 1023 / 9)
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.digitalWritePin(DigitalPin.P15, 0)
    if (speed > 6) {
        pins.digitalWritePin(DigitalPin.P15, 1)
    } else if (speed > 3) {
        pins.digitalWritePin(DigitalPin.P14, 1)
    } else if (speed > 0) {
        pins.digitalWritePin(DigitalPin.P13, 1)
    }
}
let temper = 0
let fanData: number[] = []
led.enable(true)
makerbit.connectIrReceiver(DigitalPin.P0, IrProtocol.Keyestudio)
fanData = [
1,
5,
20,
30
]
dht11_dht22.queryData(
DHTtype.DHT11,
DigitalPin.P0,
true,
false,
false
)
adjustMode()
