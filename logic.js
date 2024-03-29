// Clock & Timer
import { createApp } from 'vue';

// Logic for clock
// Based on Analog clock app by Web Tech Talk: https://youtu.be/cx0TU2ZMAdU?si=B7o3KjWcd2GRD26p
let prevSecond = -1;
let prevMinute = -1;
const secElem = document.getElementById("second-hand");
const minElem = document.getElementById("minute-hand");
const hourElem = document.getElementById("hour-hand");

setInterval(
    function() {
        const d = new Date();
        const second = d.getSeconds();
        const minute = d.getMinutes();
        const hour = d.getHours();
        if (prevSecond != second) {
            const minuteDeg = minute * 6 + second / 10;
            secElem.style.transform = "rotate(" + 6 * second + "deg)"
            minElem.style.transform = "rotate(" + minuteDeg + "deg)"
            prevSecond = second;
            // Let timer app know the event.
            app.tick();
            if (prevMinute != minute) {
                const hourDeg = hour * 30 + minute / 2;
                hourElem.style.transform = "rotate(" + hourDeg + "deg)"
                prevMinute = minute;
            }
        }
    }, 100
);

// Timer (Vue)

const chimeSound = new Audio("maou_se_jingle03.mp3");
// In some browsers, Audio objects do not load the sound file
// immediately upon creation but load it only when playback is
// requested. Therefore, if you are offline when a timer ends,
// the end sound might not play.
// However, if you test the sound ("Test Sound") while online,
// the sound file will be loaded, ensuring the end sound can
// still play even if you go offline afterwards.

const noSleep = new NoSleep();
noSleep.disable();

function disableLockScreen() {
  // Enable wake lock.
  // (must be wrapped in a user input event handler e.g. a mouse or touch handler)
  document.addEventListener('click', function enableNoSleep() {
    document.removeEventListener('click', enableNoSleep, false);
    noSleep.enable();
  }, false);
}

function enableLockScreen() {
  noSleep.disable();
}

// setup Vue app
const app = createApp({
    data() {
      return {
        playMode: false,
        hourVal: 0,
        minVal: 10,
        minStr: '10',
        secVal: 0,
        secStr: '0',
        timerStr: "10'00''",
        started: false,
        finished: false,
        locked: false
      };
    },
    methods: {
      start()
      {
        if (this.minVal !== 0 || this.secVal !== 0) {
            this.playMode = true;
            this.started = true;
            disableLockScreen();
        }
      },
      pause()
      {
          this.playMode = false;
      },
      reset()
      {
        this.playMode = false;
        this.started = false;
        this.finished = false;
        this.locked = false;
        enableLockScreen();

        // Reset timer setting
        this.minVal = parseInt(this.minStr);
        if (isNaN(this.minVal) || this.minVal < 0) {
            this.minVal = 0;
        }
        this.secVal = parseInt(this.secStr);
        if (isNaN(this.secVal) || this.secVal < 0) {
            this.secVal = 0;
        }
        if (this.secVal > 60) {
            this.minVal += Math.floor(this.secVal / 60);
            this.secVal = this.secVal % 60;
        }
        this.formatTimer();
      },
      timerChanged()
      {
          this.reset();
      },
      tick()
      {
        if (this.playMode === true) {
            if (this.secVal < 0 || this.minVal < 0) {
                // error
                console.error('error: secVal < 0 or minVal < 0');
                this.minVal = 0;
                this.secVal = 0;
                this.playMode = false;
                enableLockScreen();
            } else if (this.secVal === 0 && this.minVal === 0) {
                this.playMode = false;
                this.finished = true;
                enableLockScreen();
            } else {
                if (this.secVal === 0) {
                    this.secVal = 59;
                    --this.minVal;
                } else {
                    --this.secVal;
                    if (this.secVal === 0 && this.minVal === 0) {
                        // timer finished!
                        this.playMode = false;
                        this.finished = true;
                        this.locked = false;
                        enableLockScreen();
                        // Chime sound: MaouDamashii https://maou.audio/
                        chimeSound.play();
                    }
                }
                this.formatTimer();
            }
        }
      },
      formatTimer()
      {
        this.timerStr = this.minVal.toString().padStart(2, '0') + "'" + this.secVal.toString().padStart(2, '0') + "''";
      },
      isNumber(evt)
      {
        // https://stackoverflow.com/questions/39782176/filter-input-text-only-accept-number-and-dot-vue-js
        // evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (48 <= charCode && charCode <= 57) {
          // '0' - '9'
          return true;
        } else {
          evt.preventDefault();;
          return false;
        }
      },
      beep()
      {
        // Chime sound: MaouDamashii https://maou.audio/
        chimeSound.play();
      }
    }
  }).mount("#app");

// eof
