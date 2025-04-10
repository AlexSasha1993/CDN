1. Simple HLS Player

Простой HLS-видеоплеер, реализованный с использованием библиотеки [HLS.js](https://github.com/video-dev/hls.js).  
Поддерживает воспроизведение `.m3u8`-потоков в браузерах без нативной поддержки HLS (Chrome, Firefox и др.).

---

2. Демонстрация

Используется примерный HLS-поток от Apple:  
`https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8`

---

3. Возможности

- Воспроизведение HLS (VOD) потока через HTML5 `<video>`
- Поддержка через HLS.js и MSE
- Отображение:
  - текущей позиции воспроизведения
  - текущего размера буфера (в секундах)
- Адаптация под браузеры с/без нативной HLS-поддержки


