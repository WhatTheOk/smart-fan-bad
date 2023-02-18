function tempFan () {
    minTemp = fanData[3]
    maxTemp = fanData[4]
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
        timeFan()
    }
    if (fanData[0] == 3) {
        tempFan()
    }
}
function timeFan () {
    ds.setHour(0)
    ds.setMinute(0)
    hour = Math.trunc(fanData[2] / 100)
    minute = fanData[2] % 100
    while (fanData[0] == 2 && terminate == false) {
        if (hour == ds.getHour() && minute == ds.getMinute()) {
            terminate = true
        }
        basic.pause(1000)
    }
    fanData[0] = 0
}
function adjustSpeed (speed: number) {
    pins.analogWritePin(AnalogPin.P4, speed * 1023 / 9)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P9, 0)
    pins.digitalWritePin(DigitalPin.P10, 0)
    if (speed > 6) {
        pins.digitalWritePin(DigitalPin.P8, 1)
    } else if (speed > 3) {
        pins.digitalWritePin(DigitalPin.P9, 1)
    } else if (speed > 0) {
        pins.digitalWritePin(DigitalPin.P10, 1)
    }
}
let terminate = false
let minute = 0
let hour = 0
let ds: DS1302.DS1302RTC = null
let fanData: number[] = []
let temper = 0
let maxTemp = 0
let minTemp = 0
minTemp = 0
maxTemp = 0
temper = 0
led.enable(true)
makerbit.connectIrReceiver(DigitalPin.P0, IrProtocol.Keyestudio)
fanData = [
2,
5,
230,
20,
30
]
ds = DS1302.create(DigitalPin.P13, DigitalPin.P14, DigitalPin.P15)
dht11_dht22.queryData(
DHTtype.DHT11,
DigitalPin.P1,
true,
false,
false
)
adjustMode()
