let navBar = document.querySelector('nav');
let highscoresLink = document.getElementById('highscores-link');
let container = document.getElementById('container');
let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start-button');
let title = document.getElementById('title');
let text = document.getElementById('text');
let quizAnswers = document.getElementById('quiz-answers');
let answerButtons = document.getElementsByClassName('answer-button');
let answerMessage = document.getElementById('answer-message');
let inputField = document.getElementById('input-field');
let initials = document.getElementById('initials');
let submitButton = document.getElementById('submit-button');


//sets variables
let timerSecs = 0;
let rightAnswers = 0;
let currentQuestion = 0
let score = 0;
let scoreArray = [];
let timerInterval = false;

// confirming that questions are being referenced
console.log(questions);

// starts game
function startQuiz() {
    // starts timer
    timerSecs = 75;
    timerDisplay.textContent = timerSecs;

    // start countdown
    countdown();

    // starts question page
    nextQuestion();

    // make the start button disappear
    startButton.style.display = 'none';
}

// changes display to next question
function nextQuestion() {

    // checks what current score is
    console.log("Current score: " + score);

    // changes appearance of page
    container.className = "results-page mt-5"
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
    for (i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener('click', checkAnswer);
    }
    
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
        currentQuestion ++;
        answerMessage.style.display = "block";
        answerMessage.textContent = "Incorrect!";
        answerMessage.className = "answer-message";

        setTimeout(function() {
            answerMessage.style.display = "none";
        }, 800);

        if (timerSecs < 10) {
            timerSecs -= 10;
            endGame();
        } else if (currentQuestion === 5) {
            endGame();
        } else {
            timerSecs -= 10;
            nextQuestion();
        };
    }
};

// triggers end game page
function endGame() {
    // changes page display
    quizAnswers.style.display = "none";
    container.className = "quiz-page mt-5"
    title.setAttribute('class', 'h2');
    text.removeAttribute("class");
    text.textContent = "Your final score is " + score + ". Enter your initials to see the high scores!";
    inputField.style.display = "block";

    // changes title display depending on whether user ran out of time
    if (timerSecs <= 0) {
        title.textContent = 'You ran out of time!';
    } else {
        title.textContent = 'All done!';
    }

    // when submit button is clicked, initals are stored
    // and user is brought to high score page
    submitButton.addEventListener('click', storeHighScore);
}

// stores input from initials input and puts it in local storage
// then takes user to high score page to see high scores
function storeHighScore(event) {
    event.preventDefault();

    // if no input is detected nothing happens
    if (initials.value.length === 0) {
        return
    
    // otherwise initial/score combo is pushed to score array
    } else {
        newScore = {
            userName: initials.value.trim(),
            userScore: score
        };
        scoreArray.push(newScore);

        // array is made into a string and pushed to local storage
        localStorage.setItem("score", JSON.stringify(scoreArray));
    
        // user is taken to highscore page
        seeHighScores();
    }
}

// initially load scores from local storage into scores array
function loadHighScore() {
    // parses string value from local storage into new array
    storedScores = JSON.parse(localStorage.getItem("score"));

    // if new array isn't empty (no previously saved scores)
    // then save into scoreArray
    if (storedScores !== null) {
        scoreArray = storedScores;

        // return the new scoreArray value
        return scoreArray;
    }
}

// shows highs scores
function seeHighScores() {
    // clears timerInterval if countdown has been initiated
    if (timerInterval) {
        clearInterval(timerInterval);
    };

    // creates new list and button elements and appends them to container
    container.className = 'score-page mt-5';
    let ul = document.createElement('ul');
    let returnButton = document.createElement('button');
    let clearButton = document.createElement('button');
    returnButton.textContent = "Go Back";
    clearButton.textContent = "Clear High Scores";
    container.appendChild(ul);
    container.appendChild(returnButton);
    container.appendChild(clearButton);

    // removes navbar and other elements
    startButton.style.display = 'none';
    navBar.style.visibility = 'hidden';
    title.textContent = "High Scores";
    text.textContent = '';
    quizAnswers.style.display = 'none';
    inputField.style.display = 'none';

    // render a new li for each highscore
    for (i = 0; i < scoreArray.length; i++) {
        let score = scoreArray[i].userName + " : " + scoreArray[i].userScore;

        li = document.createElement('li');
        li.textContent = score;
        ul.appendChild(li);
    }

    // adds event listener for return button to bring person back to index.html
    returnButton.addEventListener('click', function() {
        location.href = "index.html"
    });

    // adds event listener for clear button that clears local storage
    clearButton.addEventListener('click', function() {
        localStorage.clear();
        ul.innerHTML = '';
    });
};

// counts down from starting timerSecs 
function countdown() {
    // interval function that counts down
    timerInterval = setInterval(function() {
        timerSecs --;
        timerDisplay.textContent = timerSecs;

        // alert that user has run out of time and end game
        // if timer runs out
        if (timerSecs < 1) {
            timerDisplay.textContent = 0;
            endGame();
            clearInterval(timerInterval);
        };

        // clear timer if current question hits 5 (game is over)
        if (currentQuestion === 5) {
            timerDisplay.textContent = timerSecs;
            clearInterval(timerInterval);
        }
    }, 1000)
}

// code to prevent blue focus outline from showing unless user is a keyboard user
function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}

// loads parsed local storage data into score array
loadHighScore();

// event listener for when you click the start button
startButton.addEventListener('click', startQuiz);

// event listener for when you click highscores link in navbar
highscoresLink.addEventListener('click', seeHighScores);

// checks if user is keyboard user
window.addEventListener('keydown', handleFirstTab);

