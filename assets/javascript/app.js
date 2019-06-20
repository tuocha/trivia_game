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
        q2: "Samwell Tarly's family home is called what?",
        q3: "What did Oberyn Martell study at the Citadel?",
        q4: "Catelyn Stark bore how many children?",
        q5: "What are the Targaryen colors?",
        q6: "The Arbor is in which province?",
        q7: "Jon Sn ow was elected which Lord Commander of the Night's Watch?",
        q8: "Who is said to have built the Wall?"
    },
    options: {
        q1: ["The Hound", "Little Lion", "Littlefinger", "The Sword of the Morning"],
        q2: ["Horn Hill", "The Eyrie", "Harrenhall", "Stokeworth"],
        q3: ["Alchemy", "Poisons", "Swordfighting", "Ravenry"],
        q4: ["2", "3", "5", "6"],
        q5: ["Red and gold", "Blue and white", "Red and orange", "Red and black"],
        q6: ["The Reach", "The Veil", "Dorne", "None, it's in Essos"],
        q7: ["1000th", "998th", "1001st", "500th"],
        q8: ["Lann the Clever", "King Aegon I", "The Night's King", "Brann the Builder"]
    },
    answers: {
        q1: "Littlefinger",
        q2: "Horn Hill",
        q3: "Poisons",
        q4: "5",
        q5: "Red and black",
        q6: "The Reach",
        q7: "998th",
        q8: "Brann the Builder"
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
            resultId = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.questionRemove, 1000);
            $("#results").html("<h1> Out of time! The answer was " + Object.values(trivia.answers)[trivia.current] +"</h1>");
            
        }
        else if (trivia.current === Object.keys(trivia.questions).length) {
            $("#question-display").hide();

            $("#results")
                .html('<h3>Valar morghulis</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>');

            $("#start").addClass("start-button-after")
            $("#start").show();
        }
    },

    guessChecker: function () {
        var resultId;
        var currentAnswer = Object.values(trivia.answers)[trivia.current];
        var clicked = false;

        if ($(this).text() === currentAnswer && clicked === false) {
            clicked = true;
            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.questionRemove, 2000);
            $("#results").html("<h1>Correct.</h1>");
        }
        else if (clicked === false){
            clicked = true;
            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.questionRemove, 2000);
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

