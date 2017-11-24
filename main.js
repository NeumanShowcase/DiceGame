// GAME DEFS  //
var MAXPLAYERROLLS = 10;
var NOOFDICE = 4;
var NOOFDICESIDES = 6;
var MINPLAYERGUESS = NOOFDICE - 1;
var MAXPLAYERGUESS = (NOOFDICE - 1) * NOOFDICESIDES;
var MAXNOOFHIGHSCORES = 10;
// END OF GAME DEFS //

// creating main game objects //
var game = new Game(MAXPLAYERROLLS, NOOFDICE, NOOFDICESIDES);
// creating new user //
var user = new User();


// begin of functions //
// following functions are relating to navigation on site //

// start of event handling //
document.addEventListener('DOMContentLoaded', function(){
document.getElementById("inputtedGuess").addEventListener("input", function(event)
{
  event.preventDefault()
var guessInputBox = document.getElementById("inputtedGuess");
var guessButton = document.getElementById("rollButton");
var guessedNo = document.forms["diceRollerForm"]["inputNo"].value;

// max - min error checker //
var regularyGuess = /^[0-9]+$/;
if (guessedNo > MAXPLAYERGUESS || guessedNo < MINPLAYERGUESS || !regularyGuess.test(guessedNo))
{
  guessInputBox.classList.remove("validInput");
  guessInputBox.classList.add("invalidInput");
  rollButton.setAttribute("disabled", true);
  rollButton.setAttribute("value", "Please pick a number between " + MINPLAYERGUESS + " and " + MAXPLAYERGUESS + ".");
  document.getElementById("resultLabel").innerHTML = "Please pick a number between " + MINPLAYERGUESS + " and " + MAXPLAYERGUESS + ".";
  return false;
}
else
{
  guessInputBox.classList.remove("invalidInput");
  guessInputBox.classList.add("validInput");
  rollButton.removeAttribute("disabled");
  rollButton.setAttribute("value", "Roll " + (game.getAvailableRolls()));
  document.getElementById("resultLabel").innerHTML = "Stats:";
  return true;
}
 });


 document.getElementById("diceGameGUI").addEventListener("submit", function(event)
 {

   var guessedNo = document.forms["diceRollerForm"]["inputNo"].value;
   var regularyGuess = /^[0-9]+$/;
   if (guessedNo > MAXPLAYERGUESS || guessedNo < MINPLAYERGUESS || !regularyGuess.test(guessedNo))
   {
     return 0;
   }

   if (!guessedNo)
   {
     return 0;
   }
   game.throwdice();
   event.preventDefault();
   var guessInputBox = document.getElementById("inputtedGuess");
   var guessButton = document.getElementById("rollButton");

   // update playerscore //
   var userScoreShow = document.getElementById("showScore");
   userScoreShow.innerHTML = game.getPlayerScore();
  // check if user still has rolls left otherwise show endgame messages //


// setting pictures accordingly to dice outcome //
var dicePictureHolders = setPictures(game);
// play rolling sound //
var audio = new Audio("Resources/sound/94031_loafdv_dice-roll.mp3");
audio.play();
// checks players guess //
if (game.evaluateGuess(guessedNo))
{
  for (i = 0; i < (game.getAmountOfdiceInGame()) -1; ++i)
  {
    // highlight dice that won //
    dicePictureHolders[i].style.border = "5px solid blue";
  }
  dicePictureHolders[3].style.border = "5px solid green";
  // play catching sound //
  var audio = new Audio("Resources/sound/Cash Register Cha Ching-SoundBible.com-184076484.mp3");
  audio.play();

  document.getElementById("resultLabel").innerHTML = "Sum of first three: " + game.getSumOfFirstThreedice() +" You won " + guessedNo + " * " + game.getSumOfLastDice() +"=" + (game.getSumOfFirstThreedice() * game.getSumOfLastDice());
}
else {
  document.getElementById("resultLabel").innerHTML = "Sum of first three: " + game.getSumOfFirstThreedice();
  document.getElementById("currentScore").innerHTML = "Current score:" + game.getPlayerScore();
  for (i = 0; i < (game.getAmountOfdiceInGame() -1); ++i)
  {
    dicePictureHolders[i].style.border = "none";
    dicePictureHolders[3].style.border = "none";
  }
}
if (game.isGameEnding())
{
    document.getElementById("currentScore").innerHTML = "Final score: " + game.getPlayerScore();
    document.getElementById("rollButton").value ="Play again!";
    // check if new player best //
    if ((game.getPlayerScore() >= user.getUserBottomTopScore() && user.UserIsLoggedIn()) || (user.getUserBottomTopScore() == "keepFilling" && user.UserIsLoggedIn()))
    {
      document.getElementById("resultLabel").innerHTML = "NEW TOP RESULT UPLOADED TO SERVER";
      document.getElementById("newHighPic").style.display = "block";
      user.submitPlayerHigh();
    }
    // hide player best //
    else {
      document.getElementById("newHighPic").style.display = "none";
    }
game.increaseTimesTried();
game.resetScore();
game.resetAvailableRolls();
}

else {
  document.getElementById("newHighPic").style.display = "none";
  document.getElementById("rollButton").value ="Roll " + (game.getAvailableRolls()) ;
document.getElementById("gamesPlayed").innerHTML = "No of games played: " + game.getTimesTried();
document.getElementById("currentScore").innerHTML = "Current score: " + game.getPlayerScore();
}
});



// end of event handling //
})
function toggleForms(goToID)
{
  // sets up all forms in variables for toggling //
  var loginPage = document.getElementById("myLoginForm");
  var signupPage = document.getElementById("mySignupForm");
  var UserCP = document.getElementById("UserCP");
  var howToPlay = document.getElementById("howToPlay");
  var diceGameGUI = document.getElementById("diceGameGUI");


// each time forms toggled check log in status //
if (user.UserIsLoggedIn())
{
  // show GUI in logged in way //
 document.getElementById("navButtonLogin").style.display = "none";
 document.getElementById("navButtonReg").style.display = "none";
 document.getElementById("navButtonLogout").style.display = "block";
 document.getElementById("userLogValue").innerHTML = user.getUsername() +" logged in";

}
else if (!user.UserIsLoggedIn())
{
  // show GUI signed out way and disable logged in features //
   document.getElementById("navButtonLogin").style.display = "block";
   document.getElementById("navButtonReg").style.display = "block";
   document.getElementById("navButtonLogout").style.display = "none";
   UserCP.style.display = "none";
   document.getElementById("userLogValue").innerHTML ="User logged out";
   clearTopResults();
   clearTopResults(1);
}

  switch (goToID)
  {
    case 0:
    {
      if (user.UserIsLoggedIn())
      {
        // redirect logged in user to game //
        toggleForms(4);
      }

      howToPlay.style.display = "none";
      loginPage.style.display = "block";
      signupPage.style.display = "none";
      diceGameGUI.style.display = "none";
      break;
    }
    case 1:
    {
      if (!user.UserIsLoggedIn())
      {
        UserCP.style.display = "none";
        toggleForms(0);
        break;
      }
      else {
        howToPlay.style.display = "none";
        signupPage.style.display = "none";
        loginPage.style.display = "none";
        diceGameGUI.style.display = "none";
        UserCP.style.display = "block";

          document.getElementById("userUI").style.display = "block";
          document.getElementById("showLoggedInUsername").innerHTML="<br>"+user.getUsername();
          document.getElementById("showFirstName").innerHTML="<br>"+user.getUserFirstName();
          document.getElementById("showLastName").innerHTML="<br>"+user.getUserLastName();
          document.getElementById("showEmail").innerHTML="<br>"+user.getUserEmail();
          document.getElementById("showScore").innerHTML="<br>"+user.getUserTopHighscore();
      }
        break;
    }

    case 2:
    {
      document.getElementById("userUI").style.display = "none";
      diceGameGUI.style.display = "none";
      signupPage.style.display = "none";
      loginPage.style.display = "none";
      howToPlay.style.display = "block";
      break;
    }

    case 3:
    {
      howToPlay.style.display = "none";
      diceGameGUI.style.display = "none";
      loginPage.style.display = "none";
      document.getElementById("userUI").style.display = "none";
      signupPage.style.display = "block";
      break;
    }
  case 4:
  {
    howToPlay.style.display = "none";
    signupPage.style.display = "none";
    loginPage.style.display = "none";
    document.getElementById("userUI").style.display = "none";
    diceGameGUI.style.display = "block";
    if (user.UserIsLoggedIn())
    {
      getTopUser();
      getTopGlobal();
    }
    break;

  }

    default:
    {
        console.log("shhh.error while toggling forms!");
        break;
     }
   break;

  }
// end of switch  //

};


//  this function sets pictures accordingly to dice outcome //
//  how many dice used is retrieved from game class       //
function setPictures(game)
{
  var dicePicturesPlacements = [game.getAmountOfdiceInGame()];
// load up array with pictureHandlers //
  for (i = 0; i < game.getAmountOfdiceInGame(); ++i)
{
dicePicturesPlacements[i] = document.getElementById("dice" + i);
}
// assign them to game generated outcome //
for (i = 0; i < game.getAmountOfdiceInGame(); ++i)
{
  dicePicturesPlacements[i].src = "Resources/img/dice" + game.getValueOfThisDice(i) +".png";
}
return dicePicturesPlacements;
};



// this function clears high score tables //
function clearTopResults(table)
{
switch (table) {
  case 1:
  if (document.getElementById("loadingStatus"))
  {
    var cellToRemove = document.getElementById("loadingStatus");
    cellToRemove.outerHTML = null;
    delete cellToRemove;
  }
  // check if table cells present //
  for (i = 0; i => 0; ++i)
  {
      if (document.getElementById("scoreGlobalCell"+i))
      {
        // delete scorecell //
        var cellToRemove = document.getElementById("scoreGlobalCell"+i);
        cellToRemove.outerHTML = null;

        // delete cell "date submitted" //
        delete cellToRemove;
        var cellToRemove = document.getElementById("userNameGlobal"+i);
        cellToRemove.outerHTML = null;
        delete cellToRemove;

        // delete tablespacing //
        var cellToRemove = document.getElementById("spaceGlobal"+i);
        if (!cellToRemove)
        {
          conslone.log("not found space element in table arr");
          break;
        }
        cellToRemove.outerHTML = null;
        delete cellToRemove;
      }
      // break infinite loop if table ending //
      else {
        break;
      }
    }
    break;

default:
    {
    // check if table cells present //
if (document.getElementById("loadingUserTopStatus"))
{
  var cellToRemove = document.getElementById("loadingUserTopStatus");
  cellToRemove.outerHTML = null;
  delete cellToRemove;
}
    for (i = 0; i => 0; ++i)
    {

        if (document.getElementById("scoreCell"+i))
        {
          // delete warning //
          var cellToRemove = document.getElementById("scoreCell"+i);
          cellToRemove.outerHTML = null;
          delete cellToRemove;

          // delete cell "date submitted" //
          delete cellToRemove;
          var cellToRemove = document.getElementById("dateCell"+i);
          cellToRemove.outerHTML = null;
          delete cellToRemove;

          // delete tablespacing //
          var cellToRemove = document.getElementById("space"+i);
          cellToRemove.outerHTML = null;
          delete cellToRemove;
        }
        // break infinite loop if table ending //
        else {
          break;
        }
      }

}
}
}
