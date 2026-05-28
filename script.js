const video = document.getElementById('quiz-video');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const completionContainer = document.getElementById('completion-container');

// Define your "Softlock" timestamps (in seconds) and corresponding questions
const quizStops = [
    {
        time: 2, // Stops at 0:02
        question: "What is the quiz about?",
        options: ["Mental Fitness", "Making fun of people", "Sleeping 12 hours a day"],
        correctIndex: 1
    },
    {
        time: 35, // Stops at 0:35
        question: "Which of these is a proven technique for mindfulness?",
        options: ["Scrolling social media", "Deep diaphragmatic breathing", "Multitasking at work"],
        correctIndex: 1
    }
];

let currentStopIndex = 0;
let isPausedForQuiz = false;

// Monitor video playback time
video.addEventListener('timeupdate', () => {
    if (currentStopIndex >= quizStops.length) return;

    const currentStop = quizStops[currentStopIndex];
    
    // Trigger the softlock when the video reaches the stop time
    if (Math.floor(video.currentTime) >= currentStop.time && !isPausedForQuiz) {
        video.pause();
        isPausedForQuiz = true;
        showQuiz(currentStop);
    }
});

// Display the quiz question
function showQuiz(stopData) {
    video.controls = false; // Hide controls so they can't skip ahead
    quizContainer.classList.remove('hidden');
    questionText.textContent = stopData.question;
    
    optionsContainer.innerHTML = '';
    stopData.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option-btn');
        btn.onclick = () => checkAnswer(index, stopData.correctIndex);
        optionsContainer.appendChild(btn);
    });
}

// Check the selected answer
function checkAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        // Correct answer: resume video
        quizContainer.classList.add('hidden');
        video.controls = true;
        isPausedForQuiz = false;
        currentStopIndex++;
        video.play();
    } else {
        // Wrong answer
        alert("Incorrect. Take a moment to reflect and try again!");
    }
}

// When video finishes, show completion message
video.addEventListener('ended', () => {
    video.classList.add('hidden');
    completionContainer.classList.remove('hidden');
});
