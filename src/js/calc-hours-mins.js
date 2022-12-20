module.exports = (timeStart, timeEnd) => {
    const _mss = +timeEnd - +timeStart
    if (_mss < 0) return ` Помилковий час`

    const _mseconds = (_mss - _mss % 1000) / 1000

    const _mins = (_mseconds - _mseconds % 60) / 60

    const _minutes = _mins % 60
    const _hours = (_mins - _minutes) / 60

    return ` ${_hours} годин${_hours === 0 || _hours > 4 ? "" : _hours === 1 ? "у" : "и"} ${_minutes} хвилин${_minutes === 0 || _minutes > 4 ? "" : _minutes === 1 ? "у" : "и"}`
}
