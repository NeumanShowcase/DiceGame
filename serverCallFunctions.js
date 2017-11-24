var SERVERURL = "http://193.10.30.163/";



// this function submits user log in values from form to server //
function sendLoginRequest(inputUsername, inputPassword)
{
  // !! VALIDATION OF INPUT MOVED TO SEPERATE JS FILE USING JQUERY !! //
    var argumentsTosend =
    {
      email : inputUsername,
      password : inputPassword,
    };
    var JSONargumentsTosend = JSON.stringify(argumentsTosend);
    var request = new XMLHttpRequest();
request.open("POST", SERVERURL + "users/login", true);
request.setRequestHeader("Content-Type", "application/json");
request.addEventListener("load", function()
{
var stringifyResponse = JSON.parse(request.responseText);
if (request.readyState == 4 && request.status == 401) {

  if (stringifyResponse.wrongEmail)
  {
    document.getElementById("Login-status").innerHTML = "Email is incorrect!";
  }
  else if (stringifyResponse.wrongPassword){
    document.getElementById("Login-status").innerHTML = "Password is incorrect!";
  }
  return 0;
 }
 else if (request.readyState == 4 && request.status == 200)
       {
          // set user session attributes //
      user.setUserSessionID (JSON.parse(request.responseText).session);
 			user.setUsername(JSON.parse(request.responseText).username);
      user.setEmail(JSON.parse(request.responseText).email);
      user.setFirstName(JSON.parse(request.responseText).firstName);
      user.setLastName(JSON.parse(request.responseText).lastName);
       document.getElementById("Login-status").innerHTML =
        "You are logged in!";
        setTimeout(toggleForms(4),2000);

      return 0;
       }
       });
       // make query to server //
       request.send(JSONargumentsTosend);
       return 0;


}
// this function makes signup request //
function makeSignupRequest(argumentsToSend)
{
// values inputted from forms are evaluated and sent here from seperate JS file with JQuery //

var JSONargumentsToSend = JSON.stringify(argumentsToSend);
var request = new XMLHttpRequest();
request.open("POST", SERVERURL + "users", true);
request.setRequestHeader("Content-Type", "application/json");
request.addEventListener("load", function()

{
  var stringifyResponse = JSON.parse(request.responseText);
if (request.readyState == 4 && request.status > 200 )

       {

        if (stringifyResponse.emailTaken)
        {
          var emailFieldWarning = document.getElementById("signup_Email");
          emailFieldWarning.classList.add("invalidInput");
          emailFieldWarning.classList.remove("validInput");
          document.getElementById("Signup-status").innerHTML = "Email already taken!";

        }
        else if (stringifyResponse.usernameTaken)
        {
          // warn user what field thats not working //
          var usernameFieldWarning = document.getElementById("signup_Username");
          usernameFieldWarning.classList.add("invalidInput");
          usernameFieldWarning.classList.remove("validInput");
          document.getElementById("Signup-status").innerHTML = "Username already taken!";

        }
        else if (stringifyResponse.passwordEmpty)
        {
            var passwordFieldWarning = document.getElementById("signup_Password");
            passwordFieldWarning.classList.add("invalidInput");
            passwordFieldWarning.classList.remove("validInput");
            document.getElementById("Signup-status").innerHTML = "Username already taken!";
            document.getElementById("Signup-status").innerHTML = "password empty!";
        }
        return 0;
       }
       else if (request.readyState == 4 && request.status == 200)
       {

         document.getElementById("Login-status").innerHTML =
         "User with email: " + user.getUserEmail() + " was created!";
         prepareInputEmail = document.getElementById("Login_userNameInput");
         prepareInputEmail.setAttribute("value", user.getUserEmail());
         toggleForms(0);
       }

});
// make the call and wait //
request.send(JSONargumentsToSend);
return 0;
}

// this function will log out user //
function logout()
{

  // check that user is logged in before proceeding //
  if (user.UserIsLoggedIn() == "NULL")
  {

  toggleForms(0);
  return 0;
  }

// clear top tables from crap //
clearTopResults();
clearTopResults(1);
  // post for given user //
    var postURL = SERVERURL + "/users/logout";
  // raw data type xml to send later //
  var xmlDataToSend =  "<?xml version='1.0'?><data><session>"+ user.getUserSession() + "</session></data>";
  // create pot to boil it//
  boilerPot = new DOMParser();
  // put the carrots inside to send to hungry guest //
  xmlCookedNReady = boilerPot.parseFromString(xmlDataToSend,"text/xml");


  // set the table for the guests //
      var request = new XMLHttpRequest();
    request.open("POST", postURL, true);
    request.setRequestHeader("Content-Type", "application/xml");
    request.addEventListener("load", function()
    {
    // if guests start eating //
    if (request.readyState == 4 && request.status == 422 )
          {
                alert("Something went wrong while logging out!");
                return 0;
           }
           // if food tastes like turdsandwiches //
           else if (request.readyState == 4 && request.status == 200)
           {


             // reset sessionID //
             user.logout();

             // go to home//
             toggleForms(4);
             return 0;
           }

    });
request.send(xmlCookedNReady);
}


function getTopGlobal()
{
  if (!user.UserIsLoggedIn() && status != 402)
  {
    document.getElementById("globalTableErrorMSG").innerHTML = "Please <a href = # onclick =javascript:toggleForms(0)> log in. </a>";
    status = 402;
  }
  else if (user.UserIsLoggedIn()){
    // calling JASONP script on server that will callback function below //
    var script = document.createElement("script");
    script.src = "http://193.10.30.163/scores?callback=doThisShiet&session="+ user.getUserSession();
    document.head.appendChild(script);
  }

}

// callback handled from get topscores //
function doThisShiet (dataFromJSONP)
{


if ((dataFromJSONP.status < 200 || dataFromJSONP.status >= 400) && user.UserIsLoggedIn())
{
  var thisTableID = document.getElementById("highScoreTable");
  var makeCell = document.createElement("tr");

    makeCell.innerHTML = "Something went wrong..Fetch again later!";
    thisTableID.appendChild(makeCell);
      return 0;

}

else if (dataFromJSONP.status == 200)
{
  // clear table //
  clearTopResults(1);
  // fault handler //
  timesTried = 0;
 // fill table with response data //
  for (i = 0; i < MAXNOOFHIGHSCORES;++i)
  {
var thisTableID = document.getElementById("highScoreTable");
var makeCell = document.createElement("th");
var makeDistance = document.createElement("tr");
var make2ndCell = document.createElement("th");





make2ndCell.setAttribute("class", "formatDate");
make2ndCell.setAttribute("id", "scoreGlobalCell" + i);
makeCell.setAttribute("class","formatScore");
makeCell.setAttribute("id", "userNameGlobal" + i);
makeDistance.setAttribute("id","spaceGlobal" + i);

makeCell.innerHTML = dataFromJSONP.data.scores[i].username;
make2ndCell.innerHTML =  dataFromJSONP.data.scores[i].score;


thisTableID.appendChild(makeCell);
thisTableID.appendChild(makeDistance);
thisTableID.appendChild(make2ndCell);
thisTableID.appendChild(makeDistance);
  }

}


}


function getTopUser()
{
  // in case user not logged in but tries to fetch score //
  if (!user.UserIsLoggedIn() && status != 401)
  {
    document.getElementById("userTableErrorMSG").innerHTML = "Please <a href = # onclick =javascript:toggleForms(0)> log in. </a>";
    status = 401;
    return 0;
  }
  else if (user.UserIsLoggedIn())
  {
// calling JASONP script on server that will callback function below //
var script = document.createElement("script");
script.src = "http://193.10.30.163/scores/"+ user.getUsername() + "?callback=getUserTop10callback&session="+ user.getUserSession();
document.head.appendChild(script);
}
}

function getUserTop10callback(callbackData)
{


// if fetching went wrong alert user //
if ((callbackData.status < 200) || (callbackData.status >= 400 && user.UserIsLoggedIn()))
 {
    var thisTableID = document.getElementById("userScoreTable");
    var makeCell = document.createElement("tr");
    makeCell.innerHTML = "Something went wrong..Fetch again later!";
    thisTableID.appendChild(makeCell);
    return 0;
  }



// if all well do this //
else if (callbackData.status == 200)
{
  clearTopResults();
  timesTried = 0;
if (callbackData.data.scores.length === 0)
{
  user.setUserBottomTopScore("keepFilling");
}
if (callbackData.data.scores.length !== 0)
{
// store responded arr and sort it //
var ResponseArrSorted = callbackData.data.scores;
ResponseArrSorted.sort(function(a,b) {return (a.score < b.score) ? 1 : ((b.score > a.score) ? -1 : 0);} );
user.setUserScoreTableSize(ResponseArrSorted.length);
if (user.getScoreTableSize() >= MAXNOOFHIGHSCORES)
{
  user.setUserScoreTableSize(MAXNOOFHIGHSCORES);
  user.setUserBottomTopScore(ResponseArrSorted[MAXNOOFHIGHSCORES-1].score);
  user.setUserTopHighscore(ResponseArrSorted[0].score);
}
else
{
  user.setUserBottomTopScore("keepFilling");
}
// begin top 10 loop to create elements in table with result values //
for (i = 0; i < MAXNOOFHIGHSCORES; ++i)
				{
  // constructing cells for highscore table //
   var thisTableID = document.getElementById("userScoreTable");
   var makeCell = document.createElement("th");
   var makeDistance = document.createElement("tr");
   var make2ndCell = document.createElement("th");

var putThisScoreFromResponse = ResponseArrSorted[i].score;

var putThisDateFromResponse = new Date(ResponseArrSorted[i].addedAt);

var unixTimeStamp = ResponseArrSorted[i].addedAt;
var convertedJSdate = new Date(0);
convertedJSdate.setUTCSeconds(unixTimeStamp);
var showOnlyImportant = convertedJSdate.toLocaleString();

// make tidy table //
make2ndCell.setAttribute("class", "formatDate");
make2ndCell.setAttribute("id", "dateCell" + i);
makeCell.setAttribute("class","formatScore");
makeCell.setAttribute("id", "scoreCell" + i);
make2ndCell.innerHTML = showOnlyImportant;
makeCell.innerHTML = putThisScoreFromResponse;
makeDistance.setAttribute("id","space" + i);
thisTableID.appendChild(makeCell);
thisTableID.appendChild(makeDistance);
thisTableID.appendChild(make2ndCell);
thisTableID.appendChild(makeDistance);
				}
}
}
}
// function to submit playerscore to server //
function submitScore(username, sessionString, scoreToSubmit)
{
// post for given user //
  var postURL = SERVERURL +"/scores/"+ username;
// raw data type xml to send later //
var xmlDataToSend =  "<?xml version='1.0'?><data><session>"+ sessionString + "</session><score>"+scoreToSubmit+"</score></data>";
// create pot to boil it//
boilerPot = new DOMParser();
// put the carrots inside to send to hungry guest //
xmlCookedNReady = boilerPot.parseFromString(xmlDataToSend,"text/xml");

// set the table for the guests //
    var request = new XMLHttpRequest();
  request.open("POST", postURL, true);
  request.setRequestHeader("Content-Type", "application/xml");
  request.addEventListener("load", function()
  {
  // if guests start eating //
  if (this.readyState == 4 && this.status == 422 )
          {
              alert("Something went wrong while posting stats to server!");
              return 0;
         }
         // if food tastes like turdsandwiches //
   else if (this.readyState == 4 && this.status == 200)
         {
           // refresh user stats automagical //
           getTopUser();
         }

  });
  // serve food asynchronius, no refunds //
  request.send(xmlDataToSend);
  return false;
}
