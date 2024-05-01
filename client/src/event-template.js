const events = [
  { name: "Событие 1", time: new Date('2024-05-01T16:32:00.000Z').getTime() },
  { name: "Событие 2", time: new Date('2024-05-01T16:31:30.000Z').getTime() },
  // Добавьте другие события здесь
];

// Функция для отслеживания наступления событий
function checkEventsTime() {
  const currentTime = new Date().getTime(); // текущее время
  events.forEach(event => {
    if (currentTime >= event.time && !event.notified) {
      // Если текущее время больше или равно времени события
      // и событие еще не отправлено
      // Здесь можно добавить логику отправки уведомления
      sendNotification(event.name);
      event.notified = true; // Помечаем событие как отправленное
    }
  });
  // Повторяем проверку через некоторый интервал времени
  setTimeout(checkEventsTime, 1000); // проверяем каждую секунду (можно настроить интервал по вашему усмотрению)
}

// Функция для отправки уведомления
function sendNotification(eventName) {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        const notification = new Notification("Наступило событие!", {
          body: `${eventName} началось`,
          // icon: "путь_к_вашей_иконке.png", // необязательно
        });
      }
    });
  }
}

// Запускаем отслеживание наступления событий
checkEventsTime();