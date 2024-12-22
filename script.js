  "object" != typeof window.CP && (window.CP = {}),
  (window.CP.PenTimer = {
    programNoLongerBeingMonitored: !1,
    timeOfFirstCallToShouldStopLoop: 0,
    _loopExits: {},
    _loopTimers: {},
    START_MONITORING_AFTER: 2e3,
    STOP_ALL_MONITORING_TIMEOUT: 5e3,
    MAX_TIME_IN_LOOP_WO_EXIT: 2200,
    exitedLoop: function (E) {
      this._loopExits[E] = !0;
    },
    shouldStopLoop: function (E) {
      if (this.programKilledSoStopMonitoring) return !0;
      if (this.programNoLongerBeingMonitored) return !1;
      if (this._loopExits[E]) return !1;
      var _ = this._getTime();
      if (0 === this.timeOfFirstCallToShouldStopLoop)
        return (this.timeOfFirstCallToShouldStopLoop = _), !1;
      var o = _ - this.timeOfFirstCallToShouldStopLoop;
      if (o < this.START_MONITORING_AFTER) return !1;
      if (o > this.STOP_ALL_MONITORING_TIMEOUT)
        return (this.programNoLongerBeingMonitored = !0), !1;
      try {
        this._checkOnInfiniteLoop(E, _);
      } catch {
        return (
          this._sendErrorMessageToEditor(),
          (this.programKilledSoStopMonitoring = !0),
          !0
        );
      }
      return !1;
    },

    _checkOnInfiniteLoop: function (E, _) {
      if (!this._loopTimers[E]) return (this._loopTimers[E] = _), !1;
      if (_ - this._loopTimers[E] > this.MAX_TIME_IN_LOOP_WO_EXIT)
        throw "Infinite Loop found on loop: " + E;
    },
    _getTime: function () {
      return Date.now();
    },
  }),
  (window.CP.shouldStopExecution = function (E) {
    var _ = window.CP.PenTimer.shouldStopLoop(E);
    return 
  }),
  (window.CP.exitedLoop = function (E) {
    window.CP.PenTimer.exitedLoop(E);
  });
