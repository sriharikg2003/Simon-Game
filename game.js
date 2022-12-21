var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []
var level = 0;
var started = false;
var winning = 1;
var currentindex = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function () {
    userClickedPattern.push(this.id);
    console.log(userClickedPattern);
    play(this.id);
    animatePress(this.id);
    checkanswer(level, currentindex);
});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $(".container").show();
    $("body").css("background-color", "#011F3F");
    $("#level-title").text("LEVEL " + level);
    randomNumber = Math.floor(Math.random(0, 1) * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    play(randomChosenColour);
    console.log(gamePattern);

}

function play(color) {

    switch (color) {
        case "green": (new Audio("sounds/green.mp3")).play(); break;
        case "red": (new Audio("sounds/red.mp3")).play(); break;
        case "yellow": (new Audio("sounds/yellow.mp3")).play(); break;
        case "blue": (new Audio("sounds/blue.mp3")).play(); break;
        default: (new Audio("sounds/wrong.mp3")).play();

    }
}

function restart() {
    $("body").css("background-color", "red");
    $("#level-title").html("GAME OVER<br> PRESS ANY KEY TO RESTART");
    $(".container").hide();
    play();
    gamePattern = []
    started = false;
    level = 0;
    currentindex = 0;

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");

    }, 100);
}

function checkanswer() {
    if (currentindex < level) {
        if (userClickedPattern[currentindex] == gamePattern[currentindex]) {
            currentindex++;
        }

        else { restart(); }

    }
    if (currentindex == level) {
        if (userClickedPattern[currentindex] == gamePattern[currentindex]) {
            currentindex = 0;
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);

        }

        else {
            restart();
        }
    }
}
