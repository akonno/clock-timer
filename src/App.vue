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
                        <div class="column is-narrow"><label class="label">{{ $t("message.min") }}</label></div>
                        <div class="column is-one-third">
                            <input class="input" type="text" v-bind:disabled="locked" v-model="secStr" maxlength="2" @keypress="isNumber($event)" @change="reset">
                        </div>
                        <div class="column is-narrow"><label class="label">{{ $t("message.sec") }}</label></div>
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
                <div class="field">
                    <label class="label">
                        <span class="icon-text">
                        <span class="icon"><i class="fas fa-stopwatch"></i></span>
                        <span>{{ $t("message.timermode") }}</span>
                        </span>
                    </label>
                    <div class="control">
                        <label class="radio">
                        <input type="radio" name="timerMode" value="sync" v-model="timerMode" />
                        {{ $t("message.sync") }}
                        </label>
                        <label class="radio">
                        <input type="radio" name="timerMode" value="accurate" v-model="timerMode" />
                        {{ $t("message.accurate") }}
                        </label>
                    </div>
                </div>
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

type TimerMode = "sync" | "accurate";

//----------------------------------------
// Theme initializations
// 初期設定：localStorageから取得したテーマを使い、即座に`data-theme`に反映させる
const initialTheme = localStorage.getItem('theme') || 'system';
document.documentElement.setAttribute('data-theme', initialTheme); // 初期テーマを適用

//----------------------------------------
// UI variables
// UI state
const isBurgerActive = ref(false);
const isSettingsModalActive = ref(false);

// Settings state
const theme = ref(initialTheme);
const { locale } = useI18n();
// デフォルトは同期モード
const timerMode = ref<TimerMode>(
  (localStorage.getItem("timerMode") as TimerMode) ?? "sync"
);

// Timer state
const playMode = ref(false);
const started = ref(false);
const finished = ref(false);
const locked = ref(false);

const minVal = ref(10);
const minStr = ref('10');
const secVal = ref(0);
const secStr = ref('0');
const timerStr = ref("10'00''");

// User preferences
const selectedTheme = ref('system');
const selectedLocale = ref(locale.value);

//----------------------------------------
// Functions
// Timer display and input helper
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

// Timer control functions
function start() {
  if (minVal.value !== 0 || secVal.value !== 0) {
    playMode.value = true;
    started.value = true;
    disableLockScreen();

    if (timerMode.value === "accurate") {
      // 精確モード：独立エンジン起動
      startAccurateEngineFromCurrentSetting();
    }
  }
}

function pause() {
  playMode.value = false;

  if (timerMode.value === "accurate") {
    pauseAccurateEngine();
  }
}

function reset() {
  // どのモードでも止める
  stopAccurateEngine();

  playMode.value = false;
  started.value = false;
  finished.value = false;
  locked.value = false;
  enableLockScreen();

  // Reset timer setting（あなたの既存処理そのまま）
  minVal.value = parseInt(minStr.value);
  if (isNaN(minVal.value) || minVal.value < 0) minVal.value = 0;

  secVal.value = parseInt(secStr.value);
  if (isNaN(secVal.value) || secVal.value < 0) secVal.value = 0;

  formatTimer();

  // 精確モードで resume 用の remainingMs を整合させたいならここで更新
  remainingMs = (minVal.value * 60 + secVal.value) * 1000;
}

// Timer engine
function tickDownOneSecond() {
  if (playMode.value === true) {
    if (secVal.value < 0 || minVal.value < 0) {
      console.error("error: secVal < 0 or minVal < 0");
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
          playMode.value = false;
          finished.value = true;
          locked.value = false;
          enableLockScreen();
          chimeSound.play();
        }
      }
      formatTimer();
    }
  }
}

// Logic for clock
// Based on Analog clock app by Web Tech Talk: https://youtu.be/cx0TU2ZMAdU?si=B7o3KjWcd2GRD26p
let prevSecond = -1;
let prevMinute = -1;
let secElem: HTMLElement | null = null;
let minElem: HTMLElement | null = null;
let hourElem: HTMLElement | null = null;

let accurateIntervalId: number | null = null;
let endAtMs = 0;        // performance.now() 基準
let remainingMs = 0;    // pause 時に保持
let hasBeeped = false;

function stopAccurateEngine() {
  if (accurateIntervalId != null) {
    clearInterval(accurateIntervalId);
    accurateIntervalId = null;
  }
}

function syncDisplayFromRemainingMs(ms: number) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000)); // 表示は秒単位
  minVal.value = Math.floor(totalSec / 60);
  secVal.value = totalSec % 60;
  formatTimer();
}

function startAccurateEngineFromCurrentSetting() {
  // 現在の minVal/secVal を「残り秒」として取り込む
  remainingMs = (minVal.value * 60 + secVal.value) * 1000;
  endAtMs = performance.now() + remainingMs;
  hasBeeped = false;

  stopAccurateEngine();

  // 表示更新は軽めでOK（200ms程度）
  accurateIntervalId = window.setInterval(() => {
    const now = performance.now();
    const msLeft = endAtMs - now;

    if (msLeft <= 0) {
      syncDisplayFromRemainingMs(0);

      if (!hasBeeped) {
        hasBeeped = true;
        playMode.value = false;
        finished.value = true;
        locked.value = false;
        enableLockScreen();
        chimeSound.play();
      }
      stopAccurateEngine();
      return;
    }

    syncDisplayFromRemainingMs(msLeft);
  }, 200);
}

function pauseAccurateEngine() {
  // 残り時間を固定して止める
  remainingMs = Math.max(0, endAtMs - performance.now());
  stopAccurateEngine();
}

function resumeAccurateEngine() {
  endAtMs = performance.now() + remainingMs;
  hasBeeped = false;
  stopAccurateEngine();

  accurateIntervalId = window.setInterval(() => {
    const now = performance.now();
    const msLeft = endAtMs - now;

    if (msLeft <= 0) {
      syncDisplayFromRemainingMs(0);

      if (!hasBeeped) {
        hasBeeped = true;
        playMode.value = false;
        finished.value = true;
        locked.value = false;
        enableLockScreen();
        chimeSound.play();
      }
      stopAccurateEngine();
      return;
    }

    syncDisplayFromRemainingMs(msLeft);
  }, 200);
}

// Settings modal toggle
function toggleSettingsModal() {
  isSettingsModalActive.value = !isSettingsModalActive.value;
}

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

function beep()
{
  // Chime sound: MaouDamashii https://maou.audio/
  chimeSound.play();
}

// Clock logic initialization
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
              if (timerMode.value === "sync") {
                tickDownOneSecond();
              }
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

watch(timerMode, (m) => {
    localStorage.setItem("timerMode", m);

      // 実行中なら “いまの表示値” を引き継いでエンジンを切り替える
  if (playMode.value) {
    if (m === "accurate") {
      startAccurateEngineFromCurrentSetting();
    } else {
      // syncへ：精確エンジン停止（以後はclock秒で tickDownOneSecond される）
      stopAccurateEngine();
    }
  } else {
    // 停止中は精確エンジンだけ止めておけばOK
    stopAccurateEngine();
  }
});

</script>
