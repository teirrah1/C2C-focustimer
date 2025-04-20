let timeLeft = 25 * 60; // 25 minutes in seconds
let isWorkPeriod = true; // Track if we're in work or rest period
let timerId = null;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                audio.play();
                isWorkPeriod = !isWorkPeriod;
                timeLeft = isWorkPeriod ? 25 * 60 : 5 * 60;
                alert(isWorkPeriod ? 'Rest time is over! Time to work!' : 'Work time is over! Take a break!');
                updateDisplay();
                startTimer();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerId);
    isRunning = false;
    isWorkPeriod = true; // Reset to work period
    timeLeft = 25 * 60;
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);

// Initialize display
updateDisplay(); 