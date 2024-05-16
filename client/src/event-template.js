const events = [
  { name: "Событие 1", time: new Date('2024-05-16T13:20:00').getTime() },
  { name: "Событие 2", time: new Date('2024-05-16T13:20:10').getTime() },
];

function checkEventsTime() {
  const currentTime = new Date().getTime();
  events.forEach(event => {
    if (currentTime >= event.time && !event.notified) {
      sendNotification(event.name);
      event.notified = true;
    }
  });
}

function sendNotification(eventName) {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        const notification = new Notification("Наступило событие!", {
          body: `${eventName} началось`,
        });
      }
    });
  }
}

setInterval(() => {
  checkEventsTime();
}, 1000)