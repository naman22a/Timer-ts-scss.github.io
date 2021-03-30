import '../scss/style.scss';

const mins = document.getElementById('mins') as HTMLSpanElement;
const secs = document.getElementById('secs') as HTMLSpanElement;
const cents = document.getElementById('cents') as HTMLSpanElement;

let currentTimer = 0;
let interval = 0;
let lastUpdateTime = new Date().getTime();

const pad = (n: number) => ("00" + n).substr(-2);

const update = () => {
  let now = new Date().getTime();
  let dt = now - lastUpdateTime;

  currentTimer += dt;
  let time = new Date(currentTimer);
  
  mins.innerText = pad(time.getUTCMinutes());
  secs.innerText = pad(time.getSeconds());
  cents.innerText = pad(Math.floor(time.getMilliseconds() / 10))

  lastUpdateTime = now;
}

const startTimer = () => {
  if (!interval) {
    interval = setInterval(update, 1);
    lastUpdateTime = new Date().getTime();
  }
}

const stopTimer = () => {
  clearInterval(interval);
  interval = 0;
}

const restartTimer = () => {
  stopTimer();

  currentTimer = 0;

  mins.innerText = secs.innerText = cents.innerText = pad(0);
}

const startBtn = document.getElementById('start') as HTMLButtonElement;
const stopBtn = document.getElementById('stop') as HTMLButtonElement;
const restartBtn = document.getElementById('restart') as HTMLButtonElement;

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
restartBtn.addEventListener('click', restartTimer);

// keyboard functionality

let noOfClicks = 0;

document.addEventListener('keypress', () => {
  noOfClicks++;

  if (noOfClicks % 2 == 0) {
    stopTimer();
  } else {
    restartTimer();
    startTimer();
  }
});