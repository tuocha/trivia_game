$(document).ready(function () {

    $("#remaining-time").hide();
    $("#start").on("click", trivia.startGame)
    $(document).on("click", ".option", trivia.guessChecker);
})

var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    current: 0,
    timer: 20,
    timerOn: false,
    timerId: '',

    questions: {
        q1: "What is Peter Baelish's nickname?",
        q2: "Samwell Tarly's family home is called what?"
    },
    options: {
        q1: ["The Hound", "Little Lion", "Littlefinger", "The Sword of the Morning"],
        q2: ["Horn Hill", "The Eyrie", "Harrenhall", "Stokeworth"],
    },
    answers: {
        q1: "Littlefinger",
        q2: "Horn Hill"
    },

    startGame: function () {
        trivia.current = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        $("#game").show();
        $("#results").html('')
        $("#timer").text(trivia.timer)
        $("#start").hide();
        $("#remaining-time").show();

        trivia.nextQuestion();
    },

    nextQuestion: function () {
        trivia.timer = 5;
        $("#timer").text(trivia.timer);

        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.runTimer, 1000);
        }

        var questionFill = Object.values(trivia.questions)[trivia.current];
        $("#question-display").text(questionFill)

        var optionsFill = Object.values(trivia.options)[trivia.current];
        $.each(optionsFill, function (index, key) {
            $("#choices-display").append($("<button class='option'>" + key + "</button>"));
        })
    },

    runTimer: function () {
        if (trivia.timer > -1 && trivia.current < Object.keys(trivia.questions).length) {
            $("#timer").text(trivia.timer);
            trivia.timer--;
        }
        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.resultId = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.questionRemove, 1000);
            $("#results").html("<h1> Out of time! The answer was " + Object.values(trivia.answers)[trivia.current] +"</h1>");
            
        }
        else if (trivia.current === Object.keys(trivia.questions).length) {
            $("#results")
                .html('<h3>Valar morghulis</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>You win the game of thrones or you die.</p>');

            $("#start").show();
        }
    },

    guessChecker: function () {
        var resultId;
        var currentAnswer = Object.values(trivia.answers)[trivia.current];

        if ($(this).text() === currentAnswer) {
            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.questionRemove, 1000);
            $("#results").html("<h1>Correct.</h1>");
        }
        else {
            trivia.incorrect++;
            clearInterval(timer.timerId);
            resultId = setTimeout(trivia.questionRemove, 1000);
            $("#results").html("<h1>Incorrect. The answer was " + Object.values(trivia.answers)[trivia.current] + "</h1>");
        }
    },

    questionRemove: function () {

        trivia.current++;
        $(".option").remove();
        $("#results h1").remove();

        trivia.nextQuestion();
    }

}

