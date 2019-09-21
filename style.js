let container = document.getElementById('container');
let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start-button');
let title = document.getElementById('title');
let text = document.getElementById('text');
let quizAnswers = document.getElementById('quiz-answers');
let answerButtons = document.getElementsByClassName('answer-button');
let answerMessage = document.getElementById('answer-message');
let inputField = document.getElementById('input-field');


//sets variables
let timerSecs = 75;
let rightAnswers = 0;
let currentQuestion = 0
let score = 0;

// confirming that questions are being referenced
console.log(questions);

// starts game
function startQuiz() {
    // starts question page
    nextQuestion();

    // start countdown
    countdown();

    // make the start button disappear
    startButton.style.display = 'none';
}

// changes display to next question
function nextQuestion() {
    // checks what current score is
    console.log("Current score: " + score);

    // changes appearance of page
    container.className = "quiz-page mt-5"
    title.textContent = 'Question ' + (currentQuestion + 1);
    title.setAttribute('class', 'h2')
    text.textContent = questions[currentQuestion].title;
    text.className = "h4";

    // displays the answer buttons
    quizAnswers.style.display = 'block';

    // takes the answer options from the current index in the questions array
    // and assigns them one by one to each of the answer buttonsj
    // could be made into a for loop?
    answerButtons[0].textContent = questions[currentQuestion].choices[0];
    answerButtons[1].textContent = questions[currentQuestion].choices[1];
    answerButtons[2].textContent = questions[currentQuestion].choices[2];
    answerButtons[3].textContent = questions[currentQuestion].choices[3];

    // clicking one of the buttons calls the checkAnswer function
    quizAnswers.addEventListener('click', checkAnswer);
    
    // checking that currentQuestion has increased one after pressing answer button
    console.log(currentQuestion);
}

// checks whether chosen answer matches answer
function checkAnswer(event) {
    // checking that the button and answer values are the same
    console.log("User chose: " + event.target.textContent);
    console.log("Correct answer: " + questions[currentQuestion].answer);

    // displays correct and increases score and currentQuestion variables
    if (event.target.textContent === questions[currentQuestion].answer) {
        answerMessage.style.display = "block";
        answerMessage.textContent = "Correct!";
        answerMessage.className = "answer-message";
        currentQuestion ++;
        score ++;

        // message disappears after set time
        setTimeout(function() {
            answerMessage.style.display = "none";
        }, 800);

        // end game if current question is 5
        if (currentQuestion === 5) {
            endGame();

        // else go to next question
        } else {
            nextQuestion();
        };

    // displays incorrect and decreases total time and increases currentQuestion
    } else {
        answerMessage.style.display = "block";
        answerMessage.textContent = "Incorrect!";
        answerMessage.className = "answer-message";
        currentQuestion ++;
        timerSecs -= 10;

        // message disappears after set time
        setTimeout(function() {
            answerMessage.style.display = "none";
        }, 800);

        // end game if current question is 5
        if (currentQuestion === 5) {
            endGame();

        // else go to next question
        } else {
            nextQuestion();
        };
    }
}

// triggers end game page
function endGame() {
    // changes page display
    quizAnswers.style.display = "none";
    container.className = "quiz-page mt-5"
    title.textContent = 'All done!';
    title.setAttribute('class', 'h2');
    text.removeAttribute("class");
    text.textContent = "Your final score is " + score + ". Enter your initials to see the high scores!";
    inputField.style.display = "block";

    // when submit button is clicked, initals are stored
    // and user is brought to high score page
    inputField.addEventListener('click', storeHighScore);
}

// counts down from starting timerSecs 
function countdown() {
    // interval function that counts down
    timerInterval = setInterval(function() {
        timerSecs --;
        timerDisplay.textContent = timerSecs;

        // alert that user has run out of tiem and end game
        // if timer runs out
        if (timerSecs === 0) {
            clearInterval(timerInterval);
            alert("You've run out of time!");
            endGame();
        }

        // clear timer if current question hits 5
        if (currentQuestion === 5) {
            clearInterval(timerInterval);
        }
    }, 1000)
}

// event listener for when you click the start button
startButton.addEventListener('click', startQuiz);

