let trama = ""
let MIN_ACTUAL = 0
weatherbit.startWeatherMonitoring()
weatherbit.startRainMonitoring()
weatherbit.startWindMonitoring()
serial.redirect(
SerialPin.P15,
SerialPin.P14,
BaudRate.BaudRate9600
)
serial.writeLine("FECHA" + ";" + "HORA" + ";" + "TEMP (°C)" + ";" + "PRESION (msnm)" + ";" + "PRECI(mm)" + ";" + "VIENT(DIR)" + ";" + "VEL/VIENTO(Km/h)" + ";" + "ALT(M)")
let MIN_ANTERIOR = DS1307.getMinute()
basic.forever(function () {
    basic.pause(60000)
    MIN_ACTUAL = DS1307.getMinute()
    if (MIN_ACTUAL % 1 == 0 && MIN_ACTUAL != MIN_ANTERIOR) {
        basic.showIcon(IconNames.Ghost)
        MIN_ANTERIOR = MIN_ACTUAL
        trama = "" + DS1307.getDay() + "/" + DS1307.getMonth() + "/" + DS1307.getYear() + ";" + DS1307.getHour() + ":" + DS1307.getMinute() + ";" + (weatherbit.temperature() + 100) + ";" + (weatherbit.pressure() + 25600) + ";" + (weatherbit.rain() + 25.4) + ";" + weatherbit.windDirection() + ";" + weatherbit.windSpeed() * 1.6 + ";" + weatherbit.altitude()
        basic.pause(2000)
        serial.writeLine(trama)
        basic.clearScreen()
    }
})
