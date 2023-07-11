var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = true;
var isGameOver = false;
var level = 0;


$(document).on("click", function() {
    if(gameStarted === true) {
        nextSequence();
        gameStarted = false;
    }
    gameStarted = false;
    });



$(".btn").on("click", function() {
    var userChosenColour = this.classList[1];
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    setTimeout(() => {
        checkUser();
    }, 500);
});












function playSound(color) {
    switch (color) {
        case "blue":
            var blueSound = new Audio("sounds/blue.mp3");
            blueSound.play();
            break;

        case "green":
            var greenSound = new Audio("sounds/green.mp3");
            greenSound.play();
            break;

        case "red":
            var redSound = new Audio("sounds/red.mp3");
            redSound.play();
            break;

        case "yellow":
            var yellowSound = new Audio("sounds/yellow.mp3");
            yellowSound.play();
            break;
    
        default:
            console.log(color);
            break;
    }

}



function nextSequence() {
    var randomNumber = (Math.random() * 4);
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour); 
    soundAndEffectLoop();
    level +=1;
    $("h1").text("Level: " + level);
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}


function checkUser() {
    if(compareArrays()) {
        if(gamePattern.length == userClickedPattern.length) {
            userClickedPattern = [];
            setTimeout(() => {
                nextSequence();
            }, 700);
        }
    } 

    else {
        isGameOver = true;
        gameOver();
    }        
}


function compareArrays() {
    for(i=0; i<userClickedPattern.length; i++) {
        if(gamePattern[i] != userClickedPattern[i]) {
            return false;
        }
    }
    return true;
}

function gameOver() {
    $("body").addClass("game-over");
        setTimeout(() => {
           $("body").removeClass("game-over"); 
        }, 100);
        $("h1").text("Game Over, Press Any Key to Restart");
        var gameOverSound = new Audio("sounds/wrong.mp3")
        gameOverSound.play();
        restart();
    }


function restart() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    $(document).on("click", function() {
        if(isGameOver == true) {
            nextSequence();
        }
        isGameOver = false;
    });
}

function soundAndEffectLoop() {
    for(i=0; i<gamePattern.length; i++) {
        soundAndEffect(i);
    }
}

function soundAndEffect(i) {
    setTimeout(() => {
        $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
    }, 500 * i);
}

