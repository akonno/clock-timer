<template>
<div class="content">
    <section class="hero">
        <div class="hero-body">
            <h1 class="title">
            About | Clock &amp; Timer
            </h1>
            <p class="subtitle">
                An analog clock and a digital timer on the same screen,
        designed to be comfortable to watch during long tasks and presentations.
            </p>
            <p>
        <a href="./">Open the app</a>
      </p>
        </div>
    </section>

    <section class="section">
      <h2 class="subtitle">What is this?</h2>
      <p>
        Clock &amp; Timer is a simple web application that displays
        the current time and a countdown timer at the same time.
      </p>
      <p>
        It is intended for situations such as presentations, lectures,
        or long working sessions, where knowing both
        <strong>how much time remains</strong> and
        <strong>what time it currently is</strong>
        is important.
      </p>
    </section>

    <section class="section">
      <h2 class="subtitle">Design focus</h2>
      <p>
        This app is built around a small but specific idea:
        watching time should feel comfortable.
      </p>
      <ul>
        <li>
          The clock and the timer are shown on the same screen,
          so you never have to choose between them.
        </li>
        <li>
          The movement of time should look consistent and predictable,
  with the timer and the clock changing together visually.
        </li>
        <li>
          Users should be able to choose between visual comfort and timing accuracy.
        </li>
      </ul>
    </section>

    <section class="section">
      <h2 class="subtitle">Timer modes</h2>

        <h3>Second-hand linked (Ticks with the clock)</h3>
        <p>
        In this mode, the timer decreases by 1 second each time the clock’s second hand advances.
        This keeps the timer’s second changes visually aligned with the second hand.
        </p>
        <p>
        Because the countdown ticks on the next second-hand movement,
        the first “second” may be slightly shorter unless Start is pressed exactly at the moment the second hand advances.
        This behavior is intentional.
        </p>

      <h3>Accurate (Counts by elapsed time)</h3>
        <p>
        In Accurate mode, the timer counts down based on real elapsed time,
        starting from the moment the Start button is pressed.
        </p>
        <p>
        This provides accurate timing,
        but the countdown does not necessarily align
        with the clock’s second hand.
        </p>

    </section>

    <section class="section">
    <h2 class="subtitle">Preventing accidental operations</h2>
    <p>
        During presentations or long tasks, accidentally stopping or resetting
        a timer can be frustrating.
    </p>
    <p>
        This app includes a lock option that disables pause and reset operations
        while the timer is running.
        When the lock is enabled, the only available action is to unlock it first.
    </p>
    <p>
    The lock is designed as a temporary protection against accidental operations.
    It can be released manually if needed,
    and it is always released automatically when the countdown finishes.
    </p>
    <p>
        This feature was added based on personal experience of
        unintentionally stopping a timer at the worst possible moment.
    </p>
    </section>

    <section class="section">
      <h2 class="subtitle">Basic usage</h2>
      <ul>
        <li>Set the desired time using minutes and seconds.</li>
        <li>Start, pause, or reset the timer using the control buttons.</li>
        <li>Select the timer mode from the settings according to your preference.</li>
        <li>Optionally enable Lock to prevent accidental pause/reset during countdown.</li>
      </ul>
    </section>

    <section class="section">
      <h2 class="subtitle">Additional features</h2>
      <ul>
        <li>Theme selection: light, dark, or system default</li>
        <li>Language selection: English or Japanese</li>
      </ul>
    </section>

    <section class="section">
      <h2 class="subtitle">Future ideas</h2>
      <p>
        The following features are being considered, although there is no fixed schedule:
      </p>
      <ul>
        <li>Multiple chimes (e.g. first, second, and final bell) for presentations</li>
        <li>Overtime display after the timer reaches zero</li>
      </ul>
    </section>

    <section class="section">
      <h2 class="subtitle">Credits &amp; license</h2>
      <p>
        Sound effects: <a href="https://maou.audio/" target="_blank" rel="noopener">
        MaouDamashii</a>
      </p>
      <p>
        This project is released under the MIT License.
      </p>
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
