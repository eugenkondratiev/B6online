function numberEnding(number) {
    if (number === 0) return ""
    if (number > 4 && number < 21) return ""
    const units = number % 10
    if (units == 0 || units > 4) return ""
    return units === 1 ? "у" : "и"

}


module.exports = (timeStart, timeEnd) => {
    const _mss = +timeEnd - +timeStart
    if (_mss < 0) return ` Помилковий час`

    const _mseconds = (_mss - _mss % 1000) / 1000

    const _mins = (_mseconds - _mseconds % 60) / 60

    const _minutes = +(_mins % 60)
    const _hours = +((_mins - _minutes) / 60)


    const hoursString = _hours == 0 ? "" : ` ${_hours} годин${numberEnding(_hours)}`
    const minutesString = _minutes == 0 ? "" : ` ${_minutes} хвилин${numberEnding(_minutes)}`



    return hoursString + minutesString

}
