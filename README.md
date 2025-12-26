# clock-timer

Analog clock and digital timer on the same screen.

Designed for presentations and long tasks where monitoring both  
the remaining time and the current time is essential.

## Website

[Clock & Timer](https://akonno.github.io/clock-timer/) (GitHub Pages)

## Motivation / Design choice

There are countless clock and timer applications available.  
This app focuses on a specific experience: **the clock’s second hand and the timer countdown moving together**.

By default, the timer prioritizes visual synchronization with the clock,
as this consistency is often more comfortable to watch during presentations.
For users who prefer timing accuracy over synchronization, an alternative mode is provided.

## Features

- Analog clock and digital timer displayed simultaneously
- Timer modes:
  - **Second-hand linked (sync)**: timer ticks in sync with the clock’s second hand
  - **Accurate**: independent timing prioritizing accuracy
- Lock option to prevent accidental stop or reset while the timer is running
- Theme selection: light / dark / system
- Language selection: English / Japanese
- Screen lock prevention during timer operation (NoSleep.js)

## Timer accuracy note

In *Second-hand linked* mode, the timer advances by one second
each time the clock’s second hand moves.
Because of this, the countdown follows the clock visually
rather than measuring exact elapsed time.

Users requiring precise timing should use the *Accurate* mode instead.

## Development

```bash
npm ci
npm run dev
npm run build
```

Built with Vite and Vue 3.

## License

MIT License

## Credits

Music: [MaouDamashii](https://maou.audio/)
