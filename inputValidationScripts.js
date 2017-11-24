
// load script after site finished loading //
$(document).ready(function() {


// BEGIN OF SENDING INPUT TO VALIDATION FUNCTIONS //
//---------------------------------------------------------------------//
// game input checker //








//---------------------------------------------------------------------//
// login form related //

  //username / email field //
  $("#Login_userNameInput").on("input", function() {
  var userNameInput = $(this);
  if(executeEmailRestrictionsOnForm(userNameInput))
  {
    // assign different CSS class for visual aid //
     userNameInput.removeClass("invalidInput").addClass("validInput");
     // tell user status //
       $("#Login-status").html("Status: OK");
     // disable submittance //
       $("#loginButton").attr("disabled", false);
  }
  else {
    // assign different CSS class for visual aid //
      userNameInput.removeClass("validInput").addClass("invalidInput");
      // tell user status //
      $("#Login-status").html("Not a valid E-mail adress!");
      // disable submittance //
        $("#loginButton").attr("disabled", true);
  }
  });

  // password field input//
  $("#Login_passwordInput").on("input", function() {
  var passwordInput = $(this);
  //checking this input agains restriction function then do graphic stuff seperately//
  if (executePasswordRestrictionsOnForm(passwordInput))
  {
    // assign different CSS class for visual aid //
     passwordInput.removeClass("invalidInput").addClass("validInput");
     // tell user status //
       $("#Login-status").html("Status: OK");
     // disable submittance //
       $("#loginButton").attr("disabled", false);
  }
  else {
    // assign different CSS class for visual aid //
     passwordInput.removeClass("validInput").addClass("invalidInput");
     // tell user status //
       $("#Login-status").html("Password to short!");
     // disable submittance //
       $("#loginButton").attr("disabled", true);
  }
  });

//---------------------------------------------------------------------//
// registration form related //
  // first name restriction //
  $("#signup_FirstName").on("input", function() {
  firstNameInput = $(this);
  if(executeFirstAndLastnameRestrictionsOnForm(firstNameInput))
  {
    // assign different CSS class for visual aid //
     firstNameInput.removeClass("invalidInput").addClass("validInput");
     // tell user status //
       $("#Signup-status").html("Status: OK");
     // disable submittance //
       $("#signup_submitButton").attr("disabled", false);
  }
  else {
      // assign different CSS class for visual aid //
    firstNameInput.removeClass("validInput").addClass("invalidInput");
       // tell user status //
      $("#Signup-status").html("Username must only contain (a-Z)");
       // disable submittance //
     $("#signup_submitButton").attr("disabled", true);
  }
  });
  // last name restriction //
  $("#signup_LastName").on("input", function() {
  lastNameInput = $(this);
  if(executeFirstAndLastnameRestrictionsOnForm(lastNameInput))
  {
    // assign different CSS class for visual aid //
     lastNameInput.removeClass("invalidInput").addClass("validInput");
     // tell user status //
       $("#Signup-status").html("Status: OK");
     // disable submittance //
       $("#signup_submitButton").attr("disabled", false);
  }
  else {
    // assign different CSS class for visual aid //
  lastNameInput.removeClass("validInput").addClass("invalidInput");
     // tell user status //
    $("#Signup-status").html("Username must only contain (a-Z)");
     // disable submittance //
   $("#signup_submitButton").attr("disabled", true);
  }
  });
  // email restrictions //
  $("#signup_Email").on("input", function() {
  emailInput = $(this);
  if (executeEmailRestrictionsOnForm(emailInput))
  {
    // assign different CSS class for visual aid //
     emailInput.removeClass("invalidInput").addClass("validInput");
     // tell user status //
       $("#Signup-status").html("Status: OK");
     // disable submittance //
       $("#signup_submitButton").attr("disabled", false);
  }
  else {
    // assign different CSS class for visual aid //
      emailInput.removeClass("validInput").addClass("invalidInput");
      // tell user status //
      $("#Signup-status").html("Not a valid E-mail adress!");
      // disable submittance //
        $("#signup_submitButton").attr("disabled", true);
  }
  });
  // username restrictions //
  $("#signup_Username").on("input", function() {
  usernameInput = $(this);
  if (executeUsernameRestrictionsOnForm(usernameInput))
  {
    // assign different CSS class for visual aid //
     usernameInput.removeClass("invalidInput").addClass("validInput");
     // tell user status //
       $("#Signup-status").html("Status: OK");
     // disable submittance //
       $("#signup_submitButton").attr("disabled", false);
  }
  else {
    // assign different CSS class for visual aid //
      usernameInput.removeClass("validInput").addClass("invalidInput");
      // tell user status //
      $("#Signup-status").html("Username must only contain ( a-Z 0-9 _ )");
      // disable submittance //
        $("#signup_submitButton").attr("disabled", true);
  }
  });


// check repeated password match //

$("#signup_PasswordMatch").on("input", function() {
repeatedPasswordInput = $(this);
passwordInput = $("#signup_Password").on("input");
if (checkMatchRepeatedPassword(passwordInput, repeatedPasswordInput))
{
  // assign different CSS class for visual aid //
   passwordInput.removeClass("invalidInput").addClass("validInput");
   repeatedPasswordInput.removeClass("invalidInput").addClass("validInput");
   // tell user status //
     $("#Signup-status").html("Status: OK");
   // disable submittance //
     $("#signup_submitButton").attr("disabled", false);
}
else {
   passwordInput.removeClass("validInput").addClass("invalidInput");
   repeatedPasswordInput.removeClass("validInput").addClass("invalidInput");
    $("#Signup-status").html("Password mismatch or blank!");
    $("#signup_submitButton").attr("disabled", true);
}
});
// checks password input //
$("#signup_Password").on("input", function() {
passwordInput = $(this);
repeatedPasswordInput = $("#signup_PasswordMatch").on("input");
if (checkMatchRepeatedPassword(passwordInput, repeatedPasswordInput))
{
  // assign different CSS class for visual aid //
   passwordInput.removeClass("invalidInput").addClass("validInput");
   repeatedPasswordInput.removeClass("invalidInput").addClass("validInput");
   // tell user status //
     $("#Signup-status").html("Status: OK");
   // disable submittance //
     $("#signup_submitButton").attr("disabled", false);
}
else {
   passwordInput.removeClass("validInput").addClass("invalidInput");
   repeatedPasswordInput.removeClass("validInput").addClass("invalidInput");
    $("#Signup-status").html("Password mismatch or blank!");
    $("#signup_submitButton").attr("disabled", true);
}
});

// END OF SENDING INPUT TO VALIDATION FUNCTIONS //



// BEGIN TO VALIDATE WHOLE FORM DATA BEFORE CALLING SIGNUP PROCESS //

$("#signup_submitButton").click(function(event) {
var formData = $("#mySignupForm").serializeArray();
var valuesFromForm = [];
for (i = 0; i < formData.length; ++i)
{
if (!formData[i].value)
{
  $("#Signup-status").html("Blank field found not submitting!");
  break;
}
else
{
  valuesFromForm[i] = formData[i].value;
}

}
// if all ok length of array will match length of inputted array //
if (formData.length == valuesFromForm.length)
{
// this we will send //
  var argumentsToSend =
  {
    email: valuesFromForm[2],
    username: valuesFromForm[3],
    password: valuesFromForm[4],
    firstName: valuesFromForm[0],
    lastName: valuesFromForm[1],
  };
  // javascript file will handle server  response-related faults //
    user.setEmail(valuesFromForm[2]);
 makeSignupRequest(argumentsToSend);

}
});
// END OF VALIDATION SIGNUP //

// BEGIN TO VALIDATE WHOLE FORM DATA BEFORE CALLING LOGIN PROCESS //
$("#loginButton").click(function(event){

var checkedUN  = $("#Login_userNameInput").val();
var checkedPW = $("#Login_passwordInput").val();
if (checkedPW && checkedUN)
{
  // javascript file will handle server  response-related faults //
  sendLoginRequest(checkedUN,checkedPW);
  return 0;
}
else {

   // tell user status //
     $("#Login-status").html("Password to short!");
   // disable submittance //
     $("#loginButton").attr("disabled", true);
return 0;
}

});




//-------------------------------------------------------------------------------//
//-----------------------------BEGIN OF VALIDATION FUNCTIONS---------------------//
function executePasswordRestrictionsOnForm(passwordInput) {

  var input = $(passwordInput).on("input");
  // store user input //
  var fieldEntered = input.val();
  // regulary expression for chars in or not in email (found online) //
  var regularyExpPassword = /.{3,}/;
  var passwordIsAtleastThree = regularyExpPassword.test(input.val());

    if (passwordIsAtleastThree)
      {
        return true;

      }


      else if (!passwordIsAtleastThree)
      {
          return false;
      }
   }



// validation for registration form //

 function executeFirstAndLastnameRestrictionsOnForm (firstOrLastNameInput)
 {
var input = $(firstOrLastNameInput).on("input");
// store user input //
var fieldEntered = input.val();
// regulary expression for chars that is allowed in a first or last name //
var regularyExpFirstname = /^[a-zA-Z]+$/;
// checks if returned true //
var matchesFirstnameReq = regularyExpFirstname.test(input.val());
// if all chcks out //  //do //
if(fieldEntered && matchesFirstnameReq)
{
 return true;
}
// else do opposite //
else
{
  return false;
}
}





// email-field //
function executeEmailRestrictionsOnForm(emailInput) {
var input = $(emailInput).on("input");
// store user input //
var fieldEntered=input.val();
// regulary expression for chars in or not in email (found online) //
var regularyExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// checks if returned true //
var matchesEmail = regularyExpEmail.test(input.val());
// if all chcks out //  //do //
if(fieldEntered && matchesEmail)
{
 return true;
}
// else do opposite //
else
{
return false;
}
}

function executeUsernameRestrictionsOnForm(usernameInput) {

  var input = $(usernameInput).on("input");
  // store user input //
  var fieldEntered=input.val();
  // regulary expression for chars in or not in email (found online) //
  var regularyExpUsername = /^[a-zA-Z0-9_]+$/;
  // checks if returned true //
  var matchesUsernameReqs = regularyExpUsername.test(input.val());
  // if all chcks out //  //do //
  if(fieldEntered && matchesUsernameReqs)
  {
   return true;
  }
  // else do opposite //
  else
  {
  return false;
  }
}


function checkMatchRepeatedPassword(passwordInput,repeatedPasswordInput) {
  var input1 = $(passwordInput).on("input");
  var input2 = $(repeatedPasswordInput).on("input");
if (input1 && input2)
{
  if (input1.val() == input2.val())
  {
    return true;
  }
}
else {
return false;
}
}
});

//-----------------------------------------------------------------------------//
//-----------------------------END OF VALIDATION FUNCTIONS---------------------//
