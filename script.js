const progressCircle = document.getElementById("progressCircle");
const timeText = document.getElementById("timeText");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const minInput = document.getElementById("minInput");
const secInput = document.getElementById("secInput");

let totalTime = 0;
let remainingTime = 0;
let timerInterval = null;
const radius = 54;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;
let isRunning = false;

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return formattedMinutes + ":" + formattedSeconds;
}

function updateUI() {
  timeText.textContent = formatTime(remainingTime);
  const progress = remainingTime / totalTime;
  const offset = circumference * (1 - progress);
  progressCircle.style.strokeDashoffset = offset;
}

function startTimer() {
  if (!isRunning) {
    // Если таймер НЕ идёт → запускаем

    if (remainingTime === 0) {
      const minutes = parseInt(minInput.value) || 0;
      const seconds = parseInt(secInput.value) || 0;

      totalTime = minutes * 60 + seconds;

      if (totalTime <= 0) return;

      remainingTime = totalTime;
    }

    isRunning = true;
    startBtn.textContent = "Pause";

    timerInterval = setInterval(() => {
      remainingTime--;

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        remainingTime = 0;
        isRunning = false;
        startBtn.textContent = "Start";
      }

      updateUI();
    }, 1000);
  } else {
    // Если таймер идёт → ставим на паузу

    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = "Resume";
  }
}
function resetTimer() {
  clearInterval(timerInterval);

  remainingTime = 0;
  totalTime = 0;
  isRunning = false;

  progressCircle.style.strokeDashoffset = circumference;
  timeText.textContent = "00:00";
  startBtn.textContent = "Start";
}
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
