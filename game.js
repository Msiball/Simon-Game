var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;

$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    setTimeout(function () {
      nextSequence();
    }, 1000);
    started = true;
  }
});

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  $("." + userChosenColor)
    .fadeTo(50, 0)
    .fadeTo(50, 1);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("h1").text("Level " + level);
  playSound(randomChosenColor);
  $("." + randomChosenColor)
    .fadeTo(50, 0)
    .fadeTo(50, 1);
  animatePress(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern [currentLevel] === gamePattern [currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);
    startOver();
}};

function animatePress(colorAnimate) {
  $("."+ colorAnimate).addClass("pressed");
  setTimeout(function () {
    $("." + colorAnimate).removeClass("pressed");
  }, 100);
}
function playSound(name) {
  var audi = new Audio( name + ".mp3");
  audi.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
