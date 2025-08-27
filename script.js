// Game State
let gameState = {
    currentQuestion: 0,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalQuestions: 0,
    timeLeft: 10,
    timer: null,
    userData: null,
    selectedQuestions: [],
    isPaused: false,
    kycCompleted: false // Track if KYC was completed
};

// MRM Trivia Questions
const triviaQuestions = [
    {
        question: "What does MRM stand for?",
        options: [
            "Modern Roofing Materials",
            "Mabati Roofing Materials",
            "Milled Rolling Mabati",
            "Mabati Rolling Mills (MRM)"
        ],
        correct: [3],
        explanation: "Established in 1962, Mabati Rolling Mills Limited (MRM) stands as the flagship entity within the esteemed Safal Group and holds the distinction of being the largest steel manufacturer in Kenya."
    },
    {
        question: "What are some of the MRM products you know or are familiar with?",
        options: [
            "Home & Industrial Roofing solutions, Water harvesting solutions, Solar solutions",
            "Mabati (roofing solutions) Only",
            "Paper Products",
            "None of the above"
        ],
        correct: [0],
        explanation: "MRM Brands include: Home & Industrial Roofing solutions including- Fixinite Roofing Fasteners, Cleardek polycarbonate sheets; Water harvesting solutions- Rain Gain; Solar solutions- Saf Solar; Thermal insulation- Saf Therm; Building solutions- Saf Build; Light gauge steel truss system- Ultra-span; Cold rooms/ cold storage- Safcool"
    },
    {
        question: "Why is our price higher than the rest of the players in the market?",
        options: [
            "The Brand is well known",
            "MRM products are not locally made (imported)",
            "MRM products offer superior quality and have a warranty cover",
            "All of the above"
        ],
        correct: [3],
        explanation: "MRM products offer superior quality and have a warranty cover"
    },
    {
        question: "Why is MRM Superior?",
        options: [
            "MRM products are wider- MRM Box and tile profiles giving value for money",
            "It uses AZ 85 coating on steel that gives MRM sheets longer life without changing or rusting easily",
            "MRM uses superior paint products and technology to ensure the colours adhere and last longer hence the different warranty",
            "All answers are correct"
        ],
        correct: [3],
        explanation: "All answers are correct - MRM products are wider, use AZ 85 coating, superior paint products and technology, and have superior Quality Assurance Processes"
    },
    {
        question: "How do I know a roofing sheet is a legit MRM product?",
        options: [
            "Inkjet mark with the following: MRM brand names i.e Dumuzas, Resincot etc, Thickness in millimeters Batch number, Paint class, Standardization mark, Date & time of production",
            "MRM Embossing mark -The word \"MRM\" appears at the edge of each sheet. In cases where it does not, the inkjet mark is sufficient",
            "On Dumuzas, Blue mark for 32gauge & Red for 30gauge",
            "Trust the seller"
        ],
        correct: [0],
        explanation: "1, 2 & 3 are correct - Look for inkjet marks, MRM embossing mark, and color coding on Dumuzas"
    },
    {
        question: "What does the MRM warranty cover?",
        options: [
            "Perforation",
            "Fading & Peeling",
            "Manufacturing Defects & surface coating deterioration",
            "Theft"
        ],
        correct: [2],
        explanation: "The MRM warranty covers perforation, fading and peeling caused by weathering in the natural elements. For Lifestile premium stone-coated tiles, the warranty covers manufacturing defects and surface coating finish deterioration."
    },
    {
        question: "How do I activate my warranty?",
        options: [
            "Contact the seller",
            "Call customer care on 0788202020",
            "It's automatically activated upon purchase",
            "I don't know"
        ],
        correct: [0,1,3],
        explanation: "You can activate the warranty by either signing the warranty card, through USSD code *789*999#, through the online link, or by scanning the QR code. All these options will be provided at the point of purchase."
    },
    {
        question: "How do I claim my warranty?",
        options: [
            "Go with the product to the shop",
            "Visit the seller with your issue",
            "Call 0788202020 or email marketing.mrmbuildingsolutions@safalgroup.com",
            "All of the above"
        ],
        correct: [1,2],
        explanation: "To claim your warranty, either visit the shop where you purchased the material or call us on 0788202020 or email - marketing.mrmbuildingsolutions@safalgroup.com"
    },
    {
        question: "Can I earn a commission for recommending MRM products to my customers?",
        options: [
            "Yes",
            "No",
            "Only for certain products",
            "Only for registered dealers"
        ],
        correct: [0],
        explanation: "Yes- There is a commission-based system on every MRM product purchased under your name. Attend available MRM Fundi workshop and training to access. (Provide contact information and you will be informed when there is a training workshop in your area)."
    }
];

// DOM Elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    kyc: document.getElementById('kyc-screen'),
    game: document.getElementById('game-screen'),
    results: document.getElementById('results-screen')
};

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
});

function initializeGame() {
    // Use all 8 questions in original order
    gameState.totalQuestions = triviaQuestions.length;
    gameState.selectedQuestions = [...triviaQuestions];
    
    // Update total questions display
    document.getElementById('total-questions').textContent = triviaQuestions.length;
}

function getRandomQuestions(count) {
    const shuffled = [...triviaQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function setupEventListeners() {
    // Welcome screen
    document.getElementById('start-btn').addEventListener('click', showKYCScreen);
    
    // KYC form
    document.getElementById('kyc-form').addEventListener('submit', handleKYCSubmit);
    
    // Skip button
    document.getElementById('skip-btn').addEventListener('click', handleSkipKYC);
    
    // Game options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', handleOptionClick);
    });
    
    // Results screen
    document.getElementById('play-again-btn').addEventListener('click', restartGame);
    document.getElementById('download-btn').addEventListener('click', downloadResults);
    
    // Pause button (will be added dynamically)
    document.addEventListener('click', function(e) {
        if (e.target.id === 'pause-btn' || e.target.closest('#pause-btn')) {
            togglePause();
        }
    });
}

// Screen Navigation
function showScreen(screenId) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenId].classList.add('active');
}

function showKYCScreen() {
    showScreen('kyc');
}

function showGameScreen() {
    showScreen('game');
    startGame();
}

function showResultsScreen() {
    showScreen('results');
    displayResults();
    if (gameState.score >= 70) {
        createConfetti();
    }
}

// KYC Handling
function handleKYCSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    gameState.userData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        timestamp: new Date().toISOString()
    };
    
    // Mark KYC as completed
    gameState.kycCompleted = true;
    
    showGameScreen();
}

function handleSkipKYC() {
    // Set default user data for skipped registration
    gameState.userData = {
        name: 'Anonymous Player',
        phone: 'N/A',
        email: 'N/A',
        timestamp: new Date().toISOString(),
        skipped: true
    };
    
    // Mark KYC as not completed
    gameState.kycCompleted = false;
    
    showGameScreen();
}

// Game Logic
function startGame() {
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.correctAnswers = 0;
    gameState.incorrectAnswers = 0;
    gameState.isPaused = false;
    
    loadQuestion();
}

function loadQuestion() {
    if (gameState.currentQuestion >= gameState.totalQuestions) {
        endGame();
        return;
    }
    
    const question = gameState.selectedQuestions[gameState.currentQuestion];
    
    // Update question counter
    document.getElementById('current-question').textContent = gameState.currentQuestion + 1;
    
    // Update question text
    document.getElementById('question-text').textContent = question.question;
    
    // Update options
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.querySelector('.option-text').textContent = question.options[index];
        option.className = 'option';
        option.disabled = false;
    });
    
    // Reset timer display
    const timerElement = document.querySelector('.timer');
    timerElement.innerHTML = '<i class="fas fa-clock"></i><span id="time-left">10</span>';
    
    // Add pause button if not already present
    if (!document.getElementById('pause-btn')) {
        const pauseBtn = document.createElement('button');
        pauseBtn.id = 'pause-btn';
        pauseBtn.className = 'pause-btn';
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        pauseBtn.title = 'Pause/Resume';
        timerElement.appendChild(pauseBtn);
    } else {
        // Show pause button if it was hidden
        const pauseBtn = document.getElementById('pause-btn');
        pauseBtn.style.display = 'block';
    }
    
    // Start timer
    startTimer();
    
    // Update progress bar
    updateProgressBar();
}

function startTimer() {
    gameState.timeLeft = 10;
    gameState.isReadingExplanation = false;
    document.getElementById('time-left').textContent = gameState.timeLeft;
    
    gameState.timer = setInterval(() => {
        if (!gameState.isPaused) {
            gameState.timeLeft--;
            document.getElementById('time-left').textContent = gameState.timeLeft;
            
            if (gameState.timeLeft <= 0) {
                clearInterval(gameState.timer);
                handleTimeUp();
            }
        }
    }, 1000);
}

function handleTimeUp() {
    // Disable all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.add('disabled');
    });
    
    // Show all correct answers
    const question = gameState.selectedQuestions[gameState.currentQuestion];
    const correctAnswers = Array.isArray(question.correct) ? question.correct : [question.correct];
    
    correctAnswers.forEach(correctIndex => {
        const correctOption = document.querySelector(`[data-index="${correctIndex}"]`);
        correctOption.classList.add('correct');
    });
    
    // Show explanation if available
    if (question.explanation) {
        showExplanation(question.explanation);
        showNextButton();
    } else {
        // If no explanation, show next button immediately
        showNextButton();
    }
}

function handleOptionClick(e) {
    console.log('Option clicked:');
    const selectedIndex = parseInt(e.currentTarget.dataset.index);
    const question = gameState.selectedQuestions[gameState.currentQuestion];
    
    // Debug logging
    console.log('Selected index:', selectedIndex);
    console.log('Question correct answers:', question.correct);
    console.log('Question:', question.question);
    console.log('Options:', question.options);
    
    // Clear timer
    clearInterval(gameState.timer);
    
    // Disable all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.add('disabled');
    });
    
    // Check answer - handle both single and multiple correct answers
    const correctAnswers = Array.isArray(question.correct) ? question.correct : [question.correct];
    
    console.log('Correct answers array:', correctAnswers);
    console.log('Is selected index in correct answers?', correctAnswers.includes(selectedIndex));
    
    if (correctAnswers.includes(selectedIndex)) {
        handleCorrectAnswer(e.currentTarget);
    } else {
        handleIncorrectAnswer(e.currentTarget, correctAnswers);
    }
    
    // Show explanation if available
    if (question.explanation) {
        showExplanation(question.explanation);
        showNextButton();
    } else {
        // If no explanation, show next button immediately
        showNextButton();
    }
}

function showExplanation(explanation) {
    // Create explanation element
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'explanation';
    explanationDiv.innerHTML = `
        <div class="explanation-content">
            <i class="fas fa-lightbulb"></i>
            <p>${explanation}</p>
        </div>
    `;
    
    // Add to question container
    const questionContainer = document.querySelector('.question-container');
    questionContainer.appendChild(explanationDiv);
    
    // Store reference for removal
    gameState.currentExplanation = explanationDiv;
}





function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    
    const pauseBtn = document.getElementById('pause-btn');
    if (gameState.isPaused) {
        pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        pauseBtn.classList.add('paused');
    } else {
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        pauseBtn.classList.remove('paused');
    }
}

function handleCorrectAnswer(selectedOption) {
    selectedOption.classList.add('correct');
    gameState.score += 10;
    gameState.correctAnswers++;
    
    // Show correct answer animation
    selectedOption.style.animation = 'correctAnswer 0.6s ease';
}

function handleIncorrectAnswer(selectedOption, correctAnswers) {
    selectedOption.classList.add('incorrect');
    selectedOption.classList.add('shake');
    gameState.incorrectAnswers++;
    
    // Show all correct answers
    correctAnswers.forEach(correctIndex => {
        const correctOption = document.querySelector(`[data-index="${correctIndex}"]`);
        correctOption.classList.add('correct');
    });
}

function updateProgressBar() {
    const progress = (gameState.currentQuestion / gameState.totalQuestions) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
}

function endGame() {
    // Save results to localStorage
    saveGameResults();
    showResultsScreen();
}

// Results Display
function displayResults() {
    const accuracy = Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100);
    
    document.getElementById('final-score').textContent = gameState.score;
    document.getElementById('correct-answers').textContent = gameState.correctAnswers;
    document.getElementById('incorrect-answers').textContent = gameState.incorrectAnswers;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    // Load partner images
    loadPartnerImages();
    startShowcaseRotation();
}

// Data Management
function saveGameResults() {
    const gameResult = {
        userData: gameState.userData,
        score: gameState.score,
        correctAnswers: gameState.correctAnswers,
        incorrectAnswers: gameState.incorrectAnswers,
        totalQuestions: gameState.totalQuestions,
        accuracy: Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100),
        timestamp: new Date().toISOString(),
        questions: gameState.selectedQuestions.map((q, index) => ({
            question: q.question,
            userAnswer: null, // Could be enhanced to track user answers
            correct: true // Simplified for this version
        }))
    };
    
    // Save to localStorage for backup
    const existingResults = JSON.parse(localStorage.getItem('mrmGameResults') || '[]');
    existingResults.push(gameResult);
    localStorage.setItem('mrmGameResults', JSON.stringify(existingResults));
    
    // Save to Supabase only if KYC was completed
    if (gameState.kycCompleted && gameState.userData && !gameState.userData.skipped) {
        saveToSupabase();
    }
}

// Supabase Integration
async function saveToSupabase() {
    try {
        const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/mrm_game_results`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_CONFIG.anonKey,
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
            },
            body: JSON.stringify({
                player_name: gameState.userData.name,
                phone_number: gameState.userData.phone,
                email: gameState.userData.email,
                score: gameState.score
            })
        });
        
        if (response.ok) {
            console.log('Game results saved to Supabase successfully');
        } else {
            console.error('Failed to save to Supabase:', response.statusText);
        }
    } catch (error) {
        console.error('Error saving to Supabase:', error);
    }
}

// Excel Export
function downloadResults() {
    const results = JSON.parse(localStorage.getItem('mrmGameResults') || '[]');
    
    if (results.length === 0) {
        alert('No results to download');
        return;
    }
    
    // Create CSV content
    let csvContent = 'Name,Phone,Email,Score,Correct Answers,Incorrect Answers,Total Questions,Accuracy,Date\n';
    
    results.forEach(result => {
        csvContent += `"${result.userData.name}","${result.userData.phone}","${result.userData.email}",${result.score},${result.correctAnswers},${result.incorrectAnswers},${result.totalQuestions},${result.accuracy}%,"${new Date(result.timestamp).toLocaleDateString()}"\n`;
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `MRM_Trivia_Results_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Download from Supabase (for admin use)
async function downloadFromSupabase() {
    try {
        const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/mrm_game_results?select=*`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_CONFIG.anonKey,
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            
            // Create CSV content
            let csvContent = 'ID,Name,Phone,Email,Score\n';
            
            data.forEach(result => {
                csvContent += `${result.id},"${result.player_name}","${result.phone_number}","${result.email}",${result.score}\n`;
            });
            
            // Create and download file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.setAttribute('href', url);
            link.setAttribute('download', `MRM_Supabase_Results_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('Failed to fetch from Supabase:', response.statusText);
        }
    } catch (error) {
        console.error('Error downloading from Supabase:', error);
    }
}

// Confetti Animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Game Restart
function restartGame() {
    // Reset game state
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.correctAnswers = 0;
    gameState.incorrectAnswers = 0;
    gameState.userData = null;
    gameState.isPaused = false;
    gameState.kycCompleted = false; // Reset KYC completion status
    
    // Use questions in original order
    gameState.totalQuestions = triviaQuestions.length;
    gameState.selectedQuestions = [...triviaQuestions];
    
    // Update display
    document.getElementById('total-questions').textContent = triviaQuestions.length;
    
    // Show KYC screen
    showKYCScreen();
    
    // Reset form
    document.getElementById('kyc-form').reset();
}

// Utility Functions
function formatTime(seconds) {
    return seconds.toString().padStart(2, '0');
}

// Enhanced animations
function addShakeEffect(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

// Mobile touch optimization
document.addEventListener('touchstart', function() {}, {passive: true});

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

function showNextButton() {
    // Remove any existing next button
    const existingNextBtn = document.querySelector('.next-btn');
    if (existingNextBtn) {
        existingNextBtn.remove();
    }
    
    // Hide pause button when showing next button
    const pauseBtn = document.getElementById('pause-btn');
    if (pauseBtn) {
        pauseBtn.style.display = 'none';
    }
    
    // Create next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'next-btn btn-primary';
    nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Next Question';
    nextBtn.addEventListener('click', handleNextButtonClick);
    
    // Add to question container
    const questionContainer = document.querySelector('.question-container');
    questionContainer.appendChild(nextBtn);
}

function handleNextButtonClick() {
    // Remove next button
    const nextBtn = document.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.remove();
    }
    
    // Remove explanation if it exists
    if (gameState.currentExplanation && gameState.currentExplanation.parentNode) {
        gameState.currentExplanation.remove();
    }
    
    // Move to next question
    gameState.currentQuestion++;
    loadQuestion();
}

// Partner Images Functions
function loadPartnerImages() {
    const bannerScroll = document.getElementById('banner-scroll');
    const imageCount = 22; // Number of images in the images folder
    
    // Create banner images
    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement('img');
        img.src = `images/${i}.png`;
        img.alt = `Partner ${i}`;
        img.loading = 'lazy';
        bannerScroll.appendChild(img);
    }
    
    // Duplicate images for seamless scrolling
    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement('img');
        img.src = `images/${i}.png`;
        img.alt = `Partner ${i}`;
        img.loading = 'lazy';
        bannerScroll.appendChild(img);
    }
}

function startShowcaseRotation() {
    const showcaseImage = document.getElementById('current-showcase');
    const imageCount = 22;
    let currentIndex = 1;
    
    // Change showcase image every 3 seconds
    setInterval(() => {
        currentIndex = currentIndex >= imageCount ? 1 : currentIndex + 1;
        showcaseImage.src = `images/${currentIndex}.png`;
        showcaseImage.alt = `Partner ${currentIndex}`;
        
        // Add fade effect
        showcaseImage.style.opacity = '0';
        setTimeout(() => {
            showcaseImage.style.opacity = '1';
        }, 150);
    }, 3000);
}
