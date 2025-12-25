<template>
  <div id="app" v-cloak>
    <nav class="navbar">
        <div class="navbar-brand">
            <a class="navbar-item" href="#">
                <h1 class="title">Clock &amp; Timer</h1>
            </a>
            <a class="navbar-burger" :class="{ 'is-active': isBurgerActive }" role="button" aria-label="menu" aria-expanded="false" @click="isBurgerActive=!isBurgerActive">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu" :class="{ 'is-active' : isBurgerActive }">
            <div class="navbar-end">
                <a class="navbar-item" href="about.html" target="_blank" rel="noopener noreferrer"><span class="icon-text"><span class="icon"><i class="fa-solid fa-arrow-up-right-from-square"></i></span><span>About</span></span></a>
                <button class="navbar-item" @click="toggleSettingsModal"><span class="icon-text"><span class="icon"><i class="fa-solid fa-gear"></i></span><span>Settings</span></span></button>
            </div>
        </div>
    </nav>
    <section class="section">
        <div class="columns">
            <!-- Clock -->
            <!-- This clock is based on Web Tech Talk: https://youtu.be/cx0TU2ZMAdU?si=_eHIhZdUn01z29z4 -->
            <div class="column is-centered">
                <h2 class="subtitle"><span class="icon-text"><span class="icon"><i class="fas fa-clock"></i></span><span>Clock</span></span></h2>
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
            <h2 class="subtitle"><span class="icon-text"><span class="icon"><i class="fas fa-hourglass"></i></span><span>Timer</span></span></h2>
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
    <!-- modal -->
     <div class="modal" :class="{ 'is-active': isSettingsModalActive }">
        <div class="modal-background" @click="isSettingsModalActive = false;"></div>
        <div class="modal-content">
            <!-- Any other Bulma elements you want -->
            <div class="box">
                <h2 class="subtitle">{{ $t("message.settings") }}</h2>
                <div class="field is-grouped">
                    <label class="label"><span class="icon-text"><span class="icon"><i class="fas fa-desktop"></i></span><span>{{ $t("message.theme") }}</span></span></label>
                    <div class="control">
                        <label class="radio">
                        <input
                            type="radio"
                            name="theme"
                            value="light"
                            v-model="selectedTheme"
                            @change="setScreenMode(selectedTheme)"
                        />
                        <span class="icon-text"><span class="icon"><i class="fas fa-sun"></i></span><span>{{ $t("message.light") }}</span></span>
                        </label>
                        <label class="radio">
                        <input
                            type="radio"
                            name="theme"
                            value="dark"
                            v-model="selectedTheme"
                            @change="setScreenMode(selectedTheme)"
                        />
                        <span class="icon-text"><span class="icon"><i class="fas fa-moon"></i></span><span>{{ $t("message.dark") }}</span></span>
                        </label>
                        <label class="radio">
                        <input
                            type="radio"
                            name="theme"
                            value="system"
                            v-model="selectedTheme"
                            @change="setScreenMode(selectedTheme)"
                        />
                        <span class="icon-text"><span class="icon"><i class="fas fa-desktop"></i></span><span>{{ $t("message.system") }}</span></span>
                        </label>
                    </div>
                </div>
                <div class="field is-grouped">
                    <label class="label"><span class="icon-text"><span class="icon"><i class="fas fa-language"></i></span><span>Language</span></span></label>
                    <div class="control">
                        <label class="radio">
                        <input
                            type="radio"
                            name="lang"
                            value="en"
                            v-model="selectedLocale"
                            @change="locale = selectedLocale"
                        />
                        English
                        </label>
                        <label class="radio">
                        <input
                            type="radio"
                            name="lang"
                            value="ja"
                            v-model="selectedLocale"
                            @change="locale = selectedLocale"
                        />
                        Japanese / 日本語
                        </label>
                    </div>
                </div>
                <button class="button is-primary" @click="isSettingsModalActive = false;">{{ $t("message.close") }}</button>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="isSettingsModalActive = false;"></button>
     </div>
  </div>
</template>

<style>
/* ここは scoped なし */
:root {
  --clock-face: url('./assets/img/clock-face-black.png');
}

:root[data-theme="dark"] {
  --clock-face: url('./assets/img/clock-face-white.png');
}

/* system のときだけ OS 設定に追随 */
:root[data-theme="system"] {
  --clock-face: url("./assets/img/clock-face-black.png"); /* いったん light 相当 */
}

@media (prefers-color-scheme: dark) {
  :root[data-theme="system"] {
    --clock-face: url("./assets/img/clock-face-white.png");
  }
}

/* hand color */
:root {
  --hand-color: #404b69; /* light / system のデフォルト */
}

:root[data-theme="dark"] {
  --hand-color: #e0e0e0;
}

/* system の場合は OS 設定に追随 */
@media (prefers-color-scheme: dark) {
  :root[data-theme="system"] {
    --hand-color: #e0e0e0;
  }
}

[v-cloak] {
  display: none;
}
</style>

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
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 0 auto;
    position: relative;
    font-family: 'Lato', Arial, Helvetica, sans-serif;

    background-image: var(--clock-face);
}

/* アプリ指定: light */
:root[data-theme="light"] {
  --clock-face: url("./assets/img/clock-face-black.png");
}

/* アプリ指定: dark */
:root[data-theme="dark"] {
  --clock-face: url("./assets/img/clock-face-white.png");
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
    background-color: var(--hand-color);
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
    background-color: var(--hand-color);
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
    background-color: var(--hand-color);
    position: absolute;
    left: 49.4%;
}

/* for timer face */
.timer-face {
    font-size: 14cqw;
    font-weight: bold;
    /* color: #283149; */
}
</style>

<script setup lang="ts">
// Clock & Timer
import { ref, onMounted, watch } from 'vue';
import NoSleep from "nosleep.js";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const isBurgerActive = ref(false);
const isSettingsModalActive = ref(false);

const selectedTheme = ref('system');
const selectedLocale = ref(locale.value);

function toggleSettingsModal() {
  isSettingsModalActive.value = !isSettingsModalActive.value;
}

// Logic for clock
// Based on Analog clock app by Web Tech Talk: https://youtu.be/cx0TU2ZMAdU?si=B7o3KjWcd2GRD26p
let prevSecond = -1;
let prevMinute = -1;
let secElem: HTMLElement | null = null;
let minElem: HTMLElement | null = null;
let hourElem: HTMLElement | null = null;

onMounted(() => {
    if (secElem === null) {
        try {
            secElem = document.getElementById("second-hand");
            minElem = document.getElementById("minute-hand");
            hourElem = document.getElementById("hour-hand");
        } catch (e) {
            console.error("Error: cannot get second-hand element: ", e);
            return;
        }
    }

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

// 初期設定：localStorageから取得したテーマを使い、即座に`data-theme`に反映させる
const initialTheme = localStorage.getItem('theme') || 'system';
document.documentElement.setAttribute('data-theme', initialTheme); // 初期テーマを適用
const theme = ref(initialTheme);

// Watches
// テーマが変わるたびに`data-theme`属性を更新する
watch(theme, (newTheme: string) => {
    document.documentElement.setAttribute('data-theme', newTheme);
});

function setScreenMode(mode: string) {
    if (mode === 'light' || mode === 'dark' || mode === 'system') {
        theme.value = mode;
        localStorage.setItem('theme', mode);
    }
}
// Timer (Vue)

// Chime sound: MaouDamashii https://maou.audio/
function preloadAudio(src: string): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src);
    audio.preload = "auto";

    audio.addEventListener("canplaythrough", () => {
      resolve(audio);
    }, { once: true });

    audio.addEventListener("error", () => {
      reject(new Error(`Failed to load audio: ${src}`));
    }, { once: true });

    audio.load();
  });
}

let chimeSound: HTMLAudioElement;

preloadAudio("./assets/sound/maou_se_jingle03.mp3")
  .then(audio => {
    chimeSound = audio;
  })
  .catch(err => {
    console.error(err);
  });

// NoSleep.js to prevent screen lock
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
