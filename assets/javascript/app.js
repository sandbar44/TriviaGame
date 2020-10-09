// TRIVIA GAME
//
// TIMER VARIABLES
// ==================================================
// Set number counter to 30.
var startingCounter = 30;
// Holds interval Id for startTimer function
var intervalId;

// TRIVIA
// ==================================================
// Question Array
var questions = [{
    question: "When is Taylor Swift's birthday?",
    choices: ["December 13, 1989", "May 5, 1989", "January 13, 1990", "March 10, 1991"],
    answer: "December 13, 1989",
    image: "assets/images/13.gif"
}, {
    question: "Who interrupted Taylor Swift's speech at the 2009 VMA's?",
    choices: ["Jay Z", "Kanye West", "Beyonce", "Ryan Seacrest"],
    answer: "Kanye West",
    image: "assets/images/kanye.gif"
}, {
    question: "Which one of these names is not one of Taylor's cats?",
    choices: ["Olivia", "Benjamin", "Bombalurina", "Meredith"],
    answer: "Bombalurina",
    image: "assets/images/cats.gif"
}, {
    question: "Where did Tswizzle spend her childhood?",
    choices: ["Pumpkin Patch", "Nashville Music Row", "Philly's Concrete Jungle", "A Christmas Tree Farm"],
    answer: "A Christmas Tree Farm",
    image: "assets/images/christmas.gif"
}, {
    question: "Taylor promoted her debut album by opening for what singer?",
    choices: ["Rascal Flatts", "Tim McGraw", "Faith Hill", "All of the above"],
    answer: "All of the above",
    image: "assets/images/young.gif"
}, {
    question: "Who did Tsway have ~Bad Blood~ with?",
    choices: ["Lady Gaga", "Selena Gomez", "Miley Cyrus", "Katy Perry"],
    answer: "Katy Perry",
    image: "assets/images/badblood.gif"
}, {
    question: "The epic song 'All Too Well' is written about which one of Taytay's exes?",
    choices: ["Jake Gyllenhaal", "Conor Kennedy", "Joe Jonas", "Harry Styles"],
    answer: "Jake Gyllenhaal",
    image: "assets/images/gyllenhaal.png"
}, {
    question: "As of 2020, how many albums has Tsway released?",
    choices: ["10", "5", "8", "7"],
    answer: "8",
    image: "assets/images/eras.png"
}]

// Game Object
var trivia = {

    // Trivia stats
    number: 0, // question number
    correct: 0,
    incorrect: 0,
    unanswered: 0,

    // Reset
    start: function () {
        trivia.number = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        $("#time-remaining").html(`Time Remaining: <span id="seconds">${startingCounter}</span> seconds`);
        trivia.startTimer();
        trivia.displayQuestion();
    },

    // Reset timer
    startTimer: function () {
        secondsRemaining = startingCounter;
        clearInterval(intervalId);
        intervalId = setInterval(trivia.countdown, 1000);
    },

    //  Countdown function
    countdown: function () {
        secondsRemaining--;
        $("#seconds").text(secondsRemaining);
        if (secondsRemaining <= 0) {
            stop();
            trivia.timeout();
        }
    },

    // Update question display
    displayQuestion: function () {
        // Restart timer
        trivia.startTimer();
        // Hide results
        $("#result").hide();
        // Display question
        $("#question").show().html(`${questions[trivia.number].question}`);
        // Clear choices list from previous question
        $("#choices").show().empty();
        // Display choices for current question
        $.each(questions[trivia.number].choices, function (index, answer) {
            $("#choices").append(`<button class="choice" value="${answer}">${answer}</button>`)
        });
    },

    //  Update results display
    checkAnswer: function () {
        // Pause timer
        clearInterval(intervalId);
        // Check Answer
        if (this.value === questions[trivia.number].answer) {
            // If correct: "Correct!"
            $("#result").show().html(`Correct!`);
            trivia.correct++;
        }
        else {
            // If wrong: "Nope!"
            // Also show: "The correct answer was: [answer]"
            $("#result").show().html(`Nope!`);
            $("#result").append(`<p>The correct answer was: ${questions[trivia.number].answer}</p>`);
            trivia.incorrect++;
        }
        //  Display results
        trivia.displayResults();
    },

    displayResults: function () {
        // Hide Questions
        $("#question").hide();
        $("#choices").hide();
        // Related image/gif
        $("#result").append(`<p><img src="${questions[trivia.number].image}"></p>`);
        trivia.nextQuestion()
    },

    nextQuestion: function () {
        // Move to next question
        trivia.number++;
        if (trivia.number === questions.length) {
            setTimeout(trivia.gameSummary, 5000)
        }
        else {
            setTimeout(trivia.displayQuestion, 5000);
        }
    },

    timeout: function () {
        // Pause timer
        clearInterval(intervalId);
        // If timeout: "Time's up!"
        // Also show: "The correct answer was: [answer]"
        $("#result").show().html(`Time's up!`);
        $("#result").append(`<p>The correct answer was: ${questions[trivia.number].answer}</p>`);
        trivia.unanswered++;
        //  Display results
        trivia.displayResults();
    },

    gameSummary: function () {
        $("#result").show().html(`How'd you do? ARE YOU A TRUE SWIFTIE?!`);
        $("#result").append(`<p>Correct: ${trivia.correct}</p>`);
        $("#result").append(`<p>Incorrect: ${trivia.incorrect}</p>`);
        $("#result").append(`<p>Unanswered: ${trivia.unanswered}</p>`);
        $("#result").append(`<button class="start">Play again?</button>`)
    }
}

// EXECUTE GAME
// ==================================================

// Start/restart game
$(document).on("click", ".start", trivia.start);

// User clicks choice
$(document).on("click", ".choice", trivia.checkAnswer);
