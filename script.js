// Получаем ссылки на DOM-элементы: видеоплеер и текстовые блоки для отображения состояния
const video = document.getElementById('video');
const currentTimeDisplay = document.getElementById('currentTime');
const bufferSizeDisplay = document.getElementById('bufferSize');

// URL тестового HLS-потока
const videoSrc =
  'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8';

//  Используем Hls.js, если текущий браузер поддерживает Media Source Extensions (MSE).
//  Это нужно для корректной работы HLS в браузерах, где отсутствует нативная поддержка (например, Chrome, Firefox).

if (Hls.isSupported()) {
  const hls = new Hls();
  // Загружаем плейлист с основного .m3u8 URL
  hls.loadSource(videoSrc);
  // Связываем Hls.js с HTMLMediaElement, чтобы отправлять туда буферизированные сегменты
  hls.attachMedia(video);

  // Автоматически запускаем воспроизведение после успешного разбора плейлиста
  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    video.play();
  });

  setInterval(() => {
    currentTimeDisplay.textContent = video.currentTime.toFixed(1);
    // Проверяем, есть ли вообще буферизированные участки
    if (video.buffered.length) {
      const bufferEnd = video.buffered.end(video.buffered.length - 1);
      const bufferSize = bufferEnd - video.currentTime;
      bufferSizeDisplay.textContent = bufferSize.toFixed(1);
    } else {
      bufferSizeDisplay.textContent = '0';
    }
  }, 500); // Обновляем метрики дважды в секунду

  //  Если браузер (например, Safari) поддерживает HLS нативно через MIME-тип,
  // подключаем поток напрямую, без Hls.js
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = videoSrc;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
}
