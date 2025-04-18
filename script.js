let timeLeft = 25 * 60; // 25 minutes in seconds
let isWorkPeriod = true; // Track if we're in work or rest period
let timerId = null;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

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
                isWorkPeriod = !isWorkPeriod; // Toggle between work and rest
                timeLeft = isWorkPeriod ? 25 * 60 : 5 * 60; // Set appropriate time
                alert(isWorkPeriod ? 'Rest time is over! Time to work!' : 'Work time is over! Take a break!');
                updateDisplay();
                startTimer(); // Automatically start the next period
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