const container = document.querySelector(".container");

const now = new Date();
let secs = now.getSeconds();
let mins = now.getMinutes();
let hours = now.getHours();

console.log(secs, mins, hours);

let secRotate = Math.round(secs * 6); // 6 градусов на секунду
let bigRotate = Math.round(mins * 6 + secs * 0.1); // минутная стрелка
let smallRotate = Math.round((hours % 12) * 30 + mins * 0.5); // часовая стрелка

console.log("Начальные углы:", secRotate, bigRotate, smallRotate);

function handleSecGSAP() {
  secRotate += 6;
  return gsap.to(".sec-hand", {
    duration: 0.1,
    rotation: secRotate,
    ease: "power2.out",
    onComplete: () => {
      setTimeout(handleSecGSAP, 900); // Задержка до следующей секунды
    },
  });
}

function handleBigGSAP() {
  return gsap.to(".big-hand", {
    duration: 60, // 60 секунд на полный оборот минутной стрелки
    rotation: "+=6",
    ease: "none",
    repeat: -1,
  });
}

function handleSmallGSAP() {
  return gsap.to(".small-hand", {
    duration: 3600, // 3600 секунд = 1 час
    rotation: "+=30",
    ease: "none",
    repeat: -1,
  });
}

function initClock() {
  // Устанавливаем начальные позиции
  gsap.set(".sec-hand", {
    rotation: secRotate,
    transformOrigin: "bottom center",
  });
  gsap.set(".big-hand", {
    rotation: bigRotate,
    transformOrigin: "bottom center",
  });
  gsap.set(".small-hand", {
    rotation: smallRotate,
    transformOrigin: "bottom center",
  });

  // Запускаем анимации
  handleSecGSAP();
  handleBigGSAP();
  handleSmallGSAP();
}

// Запускаем часы
initClock();
