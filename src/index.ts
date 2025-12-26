// Clock-Timer src/index.ts
// Copyright (C) 2024-205 KONNO Akihisa <konno@researchers.jp>

import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';

// Vue I18n
const messages = {
    en: {
        message: {
            min: 'min.',
            sec: 'sec.',
            reset: 'Reset',
            play: 'Start',
            pause: 'Pause',
            // modal
            settings: 'Settings',
            timermode: 'Timer mode',
            sync: 'Second-hand linked (Ticks with the clock)',
            accurate: 'Accurate (independent timing)',
            theme: 'Theme',
            light: 'Light',
            dark: 'Dark',
            system: 'System',
            close: 'Close'
        },
    },
    ja: {
        message: {
            min: '分',
            sec: '秒',
            reset: '最初に戻る',
            play: '開始',
            pause: '一時停止',
            // modal
            settings: '設定',
            timermode: 'タイマーモード',
            sync: '秒針連動（時計と同時にカウント）',
            accurate: '精確（独立計時）',
            theme: 'テーマ',
            light: 'ライト',
            dark: 'ダーク',
            system: 'システム',
            close: '閉じる'
        },
    }
};

const i18n = createI18n({
    legacy: false,
    locale: navigator.language.split('-')[0],
    fallbackLocale: 'en',
    messages,
});

// Import Bulma and Font Awesome here to apply globally
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// setup Vue app
const app = createApp(App);
app.use(i18n);
app.mount("#app");
