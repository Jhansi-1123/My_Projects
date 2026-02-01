/*


const toggleBtn = document.getElementById('toggle-ingredients');
const ingredients = document.getElementById('ingredients');
const startBtn = document.getElementById('start-cooking');
const steps = document.querySelectorAll('#steps li');
const progress = document.getElementById('progress');
const timerDisplay = document.getElementById('timer');
const ingredientItems = document.querySelectorAll('.ingredient-item');
const animationBox = document.getElementById('animation-box');

let currentStep = 0;
let countdown;
let totalTime = 45 * 60; // 45 minutes in seconds

// Toggle ingredients visibility
toggleBtn.addEventListener('click', () => {
  ingredients.classList.toggle('hidden');
  toggleBtn.textContent = ingredients.classList.contains('hidden') ? '▶ Show Ingredients' : '▼ Hide Ingredients';
});

// Start cooking steps and timer
startBtn.addEventListener('click', () => {
  if (currentStep === 0) {
    startTimer();
  }

  if (currentStep < steps.length) {
    steps[currentStep].style.backgroundColor = '#00ffcc';
    steps[currentStep].style.color = '#000';
    progress.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    currentStep++;
    startBtn.textContent = currentStep < steps.length ? '🍽 Next Step' : '✅ Done!';
  } else {
    startBtn.disabled = true;
    startBtn.textContent = '🎉 Completed!';
    startBtn.classList.remove('glow');
  }
});

// Countdown Timer
function startTimer() {
  countdown = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "Time's up! ⏰";
      return;
    }

    totalTime--;
    const mins = String(Math.floor(totalTime / 60)).padStart(2, '0');
    const secs = String(totalTime % 60).padStart(2, '0');
    timerDisplay.textContent = `Time Left: ${mins}:${secs}`;
  }, 1000);
}

// Ingredient click animation
ingredientItems.forEach(item => {
  item.addEventListener('click', () => {
    animationBox.textContent = `🥣 Adding ${item.textContent}...`;
    animationBox.classList.add('show');
    setTimeout(() => {
      animationBox.classList.remove('show');
    }, 1500);
  });
});
*/


const toggleBtn = document.getElementById('toggle-ingredients');
const ingredientsArea = document.getElementById('ingredients-area');
const startBtn = document.getElementById('start-cooking');
const stepList = document.querySelectorAll('#step-list li');
const progress = document.getElementById('progress');
const timerDisplay = document.getElementById('timer');
const ingredientItems = document.querySelectorAll('.ingredient-item');
const toast = document.getElementById('toast');

let currentStep = 0;
let initialTime = 45 * 60;
let time = initialTime;
let timerInterval;
let timerRunning = false;

// 1. Ingredients Show/Hide
toggleBtn.onclick = () => {
    ingredientsArea.classList.toggle('hidden');
    toggleBtn.textContent = ingredientsArea.classList.contains('hidden') ? '📜 View Ingredients' : '❌ Close List';
};

// 2. Next Step & Progress Logic
startBtn.onclick = () => {
    if (!timerRunning && currentStep < stepList.length) startTimer();

    if (currentStep < stepList.length) {
        stepList.forEach(s => s.classList.remove('active'));
        stepList[currentStep].classList.add('active');
        currentStep++;
        
        progress.style.width = (currentStep / stepList.length) * 100 + "%";
        startBtn.textContent = currentStep < stepList.length ? 'Next Step 🥄' : 'Reset & Bake Again? 🥧';
    } else {
        resetProject();
    }
};

// 3. Timer logic
function startTimer() {
    timerRunning = true;
    timerInterval = setInterval(() => {
        time--;
        let m = Math.floor(time / 60);
        let s = time % 60;
        timerDisplay.textContent = `Baking Time: ${m}:${s < 10 ? '0' + s : s} 🕒`;
        if (time <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Baking Finished! 🎂";
        }
    }, 1000);
}

// 4. Reset Everything
function resetProject() {
    clearInterval(timerInterval);
    timerRunning = false;
    time = initialTime;
    currentStep = 0;
    progress.style.width = "0%";
    stepList.forEach(s => s.classList.remove('active'));
    timerDisplay.textContent = "Ready to bake? 🕒";
    startBtn.textContent = "Start Cooking 🥄";
}

// 5. Ingredient Toast with Full Text
ingredientItems.forEach(item => {
    item.onclick = () => {
        toast.textContent = `Adding ${item.textContent.trim()} 🥣`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1500);
    };
});