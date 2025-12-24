// Clock-Timer src/index.ts
// Copyright (C) 2024-205 KONNO Akihisa <konno@researchers.jp>

import { createApp } from 'vue';
import App from './AboutApp.vue';

// Import Bulma and Font Awesome here to apply globally
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// setup Vue app
const app = createApp(App);
app.mount("#app");
