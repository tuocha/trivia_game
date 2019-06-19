$(document).ready(function () {

    //declaring global variables
    var userPick; 
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var question = 0;
    

    //variable to set the time for each question
    var varTimer = 30;

    //declaring an array of questions objects
    var questionsArray = [
        {
            question: "What is Peter Baelish's nickname?",
            options: ["The Hound", "Little Lion", "Littlefinger", "The Sword of the Morning"],
            rightAnswer: 2
        },
        {
            question: "Samwell Tarly's family home is called what?",
            options: ["Horn Hill", "The Eyrie", "Harrenhall", "Stokeworth"],
            rightAnswer: 0
        }
    ];


    $("#start").click(function () {
        $(this).hide();
        runGame();
        counter = setInterval(timerFunction, 1000);
    });


    function timerFunction() {
        varTimer--;
        if (varTimer <= 0) {
            clearInterval(counter);
            return;
        }
        $("#timer").html("Time remaining: " + "00:" + varTimer + " secs");
    }

    function runGame() {
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;

        $("#question-display").html(questionsArray[0].question);
        question++
            var optionsArr = questionsArray[0].options

          for (let i = 0; i < optionsArr.length; i++) {
            var button = $('<button>');
            button.text(optionsArr[i]);
            button.attr('data-id', i);
            $('#choices-display').append(button);
           }
        
          }

    $("#choices-display").on("click", "button", function () {
        userPick = $(this).data("id");
        var correct = questionsArray[0].rightAnswer;
        console.log(correct)
            if (userPick !== correct) {
                $("#choices-display").text("Nope! That's incorrect.")
                incorrectAnswers++;
            } else {
                $("#choices-display").text("Hurray! That's correct")

            }
    })
});