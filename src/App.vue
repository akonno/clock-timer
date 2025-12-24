<template>
  <div id="app">
    <section class="hero">
        <div class="hero-body">
            <h1 class="title">
            Clock &amp; Timer
            </h1>
            <p class="subtitle">
                Analog clock and digital timer on the same screen
            </p>
        </div>
    </section>
    <section class="section">
        <div class="columns">
            <!-- Clock -->
            <!-- This clock is based on Web Tech Talk: https://youtu.be/cx0TU2ZMAdU?si=_eHIhZdUn01z29z4 -->
            <div class="column is-centered">
                <h2 class="subtitle"><i class="fas fa-clock"></i>Clock</h2>
                <div class="clock-dial">
                <div class="brand">CLOCK</div>        
                <div class="minute-hand-wrapper" id="minute-hand">
                    <div class="minute-hand">
                        <div class="hand"></div>
                    </div>
                </div>
        
                <div class="hour-hand-wrapper" id="hour-hand">
                    <div class="hour-hand">
                        <div class="hand"></div>
                    </div>
                </div>
        
                <div class="second-hand-wrapper" id="second-hand">
                    <div class="second-hand">
                        <div class="hand"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Timer -->
        <div id="app" class="column">
            <h2 class="subtitle"><i class="fas fa-hourglass"></i>Timer</h2>
            <div class="container">
                <div class="column has-text-centered timer-face">{{ timerStr }}</div>
                <div v-if="finished" class="notification has-text-centered is-success"><span class="icon-text"><span class="icon"><i class="fas fa-lightbulb"></i></span><span>finished!!</span></span></div>
            </div>
            <div class="field">
                <div class="control">
                    <div class="columns">
                        <div class="column is-one-third">
                            <input class="input" type="text" v-bind:disabled="locked" v-model="minStr" maxlength="3" @keypress="isNumber($event)" @change="reset">
                        </div>
                        <div class="column is-narrow"><label class="label">min.</label></div>
                        <div class="column is-one-third">
                            <input class="input" type="text" v-bind:disabled="locked" v-model="secStr" maxlength="2" @keypress="isNumber($event)" @change="reset">
                        </div>
                        <div class="column is-narrow"><label class="label">sec.</label></div>
                    </div>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button v-bind:disabled="!started || locked" class="button is-primary" @click="reset"><i class="fas fa-step-backward"></i> Reset</button>
                </div>
                <div class="control">
                    <button v-bind:disabled="finished" v-if="!playMode" class="button is-primary" @click="start"><i class="fas fa-play"></i> Start</button>
                </div>
                <div class="control">
                    <button v-bind:disabled="locked" v-if="playMode" class="button is-primary" @click="pause"><i class="fas fa-pause"></i> Pause</button>
                </div>
                <div class="control">
                    <label class="checkbox"><input type="checkbox" v-model="locked"><i class="fas fa-lock"></i>Lock</label>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button v-bind:disabled="locked" class="button is-primary" @click="beep"><i class="fas fa-bell"></i> Test Sound</button>
                </div>
            </div>
        </div>
    </div>
    </section>
    <section class="section">
        <p><a href="about.html">About Clock &amp; Timer</a></p>
        <p>Music: <a href="https://maou.audio/">MaouDamashii</a></p>
    </section>
    <footer class="footer">
        <div class="content has-text-centered">
            <p>
                <a href="https://github.com/akonno/clock-timer"><strong>Clock &amp; Timer</strong></a> by KONNO Akihisa
            </p>
        </div>
    </footer>
  </div>
</template>

<style scoped>
/* CSS for analog clock
 * original: https://youtu.be/cx0TU2ZMAdU?si=KoXGb1i3KwttAT0J
 * modified to use percentage
 */
/* cqw: container query width == 1% of parent container */
.clock-dial {
    width: auto;
    height: 80%;
    aspect-ratio: 1;
    /* border: 1cqw solid #00818a;
    border-radius: 50%;
    */
    background-image: url('./assets/img/clock-face.png');
    background-position: center;
    background-size: contain;
    margin: 0 auto;
    position: relative;
    font-family: 'Lato', Arial, Helvetica, sans-serif;
}

.point {
    width: 4%;
    height: 4%;
    background-color: #283149;
    border-radius: 50%;
    position: absolute;
    top: 48%;
    left: 48%;
}

.brand {
    font-size: large;
    font-weight: bold;
    color: #00818a;
    position: absolute;
    top: 25%;
    left: 50%;
    margin-right: -50%;
    transform:translate(-50%, -50%);
}

.minute-hand-wrapper {
    width: 80%;
    height: 80%;
    position: absolute;
    top: 10%;
    left: 10%;
    border-radius: 50%;
}

.minute-hand .hand {
    width: 2%;
    height: 50%;
    background-color: #404b69;
    position: absolute;
    left: 49%;
}

.hour-hand-wrapper {
    width: 68%;
    height: 68%;
    position: absolute;
    top: 16%;
    left: 16%;
    border-radius: 50%;
}

.hour-hand .hand {
    width: 3.2%;
    height: 50%;
    background-color: #404b69;
    position: absolute;
    left: 48.4%;
}

.second-hand-wrapper {
    width: 70%;
    height: 70%;
    position: absolute;
    top: 15%;
    left: 15%;
    border-radius: 50%;
}

.second-hand .hand {
    width: 1.2%;
    height: 50%;
    background-color: #404b69;
    position: absolute;
    left: 49.4%;
}

/* for timer face */
.timer-face {
    font-size: 14cqw;
    font-weight: bold;
    color: #283149;
}
</style>

<script setup lang="ts">
// Clock & Timer
import { ref, onMounted } from 'vue';
import NoSleep from "nosleep.js";

// Logic for clock
// Based on Analog clock app by Web Tech Talk: https://youtu.be/cx0TU2ZMAdU?si=B7o3KjWcd2GRD26p
let prevSecond = -1;
let prevMinute = -1;

onMounted(() => {
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
              tick();
              if (prevMinute != minute) {
                  const hourDeg = hour * 30 + minute / 2;
                  hourElem.style.transform = "rotate(" + hourDeg + "deg)"
                  prevMinute = minute;
              }
          }
      }, 100
  );
    // Initialize timer values
    reset();
});

// Timer (Vue)

const chimeSound = new Audio("./assets/sound/maou_se_jingle03.mp3");
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

const playMode = ref(false);
const hourVal = ref(0);
const minVal = ref(10);
const minStr = ref('10');
const secVal = ref(0);
const secStr = ref('0');
const timerStr = ref("10'00''");
const started = ref(false);
const finished = ref(false);
const locked = ref(false);

function start()
{
  if (minVal.value !== 0 || secVal.value !== 0) {
      playMode.value = true;
      started.value = true;
      disableLockScreen();
  }
}
function pause()
{
    playMode.value = false;
}
function reset()
{
  playMode.value = false;
  started.value = false;
  finished.value = false;
  locked.value = false;
  enableLockScreen();

  // Reset timer setting
  minVal.value = parseInt(minStr.value);
  if (isNaN(minVal.value) || minVal.value < 0) {
      minVal.value = 0;
  }
  secVal.value = parseInt(secStr.value);
  if (isNaN(secVal.value) || secVal.value < 0) {
      secVal.value = 0;
  }
  if (secVal.value > 60) {
      minVal.value += Math.floor(secVal.value / 60);
      secVal.value = secVal.value % 60;
  }
  formatTimer();
}
function timerChanged()
{
    reset();
}
function tick()
{
  if (playMode.value === true) {
      if (secVal.value < 0 || minVal.value < 0) {
          // error
          console.error('error: secVal < 0 or minVal < 0');
          minVal.value = 0;
          secVal.value = 0;
          playMode.value = false;
          enableLockScreen();
      } else if (secVal.value === 0 && minVal.value === 0) {
          playMode.value = false;
          finished.value = true;
          enableLockScreen();
      } else {
          if (secVal.value === 0) {
              secVal.value = 59;
              --minVal.value;
          } else {
              --secVal.value;
              if (secVal.value === 0 && minVal.value === 0) {
                  // timer finished!
                  playMode.value = false;
                  finished.value = true;
                  locked.value = false;
                  enableLockScreen();
                  // Chime sound: MaouDamashii https://maou.audio/
                  chimeSound.play();
              }
          }
          formatTimer();
      }
  }
}
function formatTimer()
{
  timerStr.value = minVal.value.toString().padStart(2, '0') + "'" + secVal.value.toString().padStart(2, '0') + "''";
}
function isNumber(evt)
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
}
function beep()
{
  // Chime sound: MaouDamashii https://maou.audio/
  chimeSound.play();
}
</script>
