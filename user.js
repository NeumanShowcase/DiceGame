// USER "CLASS" //
// constructor for a dice with given amount of sides //
function User()
{
  this.firstName = null;
  this.lastName = null;
  this.userName = null;
  this.email = null;
  this.sessionID = null;
  this.bottomTopScore = 0;
  this.topHighscore = null;
  this.scoreTableSize = null;
}

// FUNCTIONS RELATED TO DICE CLASS //
// simply returns the value of the dice //
User.prototype.UserIsLoggedIn = function(){
  if (!this.sessionID)
  {
    return false;
  }
  else {
    return true;
  }
};

User.prototype.setUserSessionID = function (sessionString)
{
  this.sessionID = sessionString;
};
User.prototype.setFirstName = function (firstName)
{
  this.firstName = firstName;
};
User.prototype.setLastName = function (lastName)
{
  this.lastName = lastName;
};
User.prototype.setEmail = function (email)
{
  this.email = email;
};
User.prototype.setUsername = function (username)
{
  this.userName = username;
};
User.prototype.setUserScoreTableSize = function (newScoreTableSize)
{
  this.scoreTableSize = newScoreTableSize;
};
User.prototype.getScoreTableSize = function ()
{
return this.scoreTableSize;
};
User.prototype.setUserBottomTopScore = function (newBottom)
{
  this.bottomTopScore = newBottom;
};
User.prototype.setUserTopHighscore = function (newHigh)
{
  this.topHighscore = newHigh;
};
User.prototype.getUserBottomTopScore = function ()
{
  return this.bottomTopScore;
};
User.prototype.getUsername = function ()
{
  return this.userName;
};
User.prototype.getUserFirstName = function ()
{
  return this.firstName;
};
User.prototype.getUserLastName = function ()
{
  return this.lastName;
};
User.prototype.getUserEmail = function ()
{
  return this.email;
};
User.prototype.getUserTopHighscore = function ()
{
  return this.topHighscore;
};
User.prototype.getUserSession = function ()
{
  return this.sessionID;
};
User.prototype.logout = function ()
{
  this.firstName = null;
  this.lastName = null;
  this.userName = null;
  this.email = null;
  this.sessionID = null;
  this.bottomTopScore = null;
  this.topHighscore = null;
  this.scoreTableSize = null;
};

// call server with player score //
// FUNCTION DEPENDENT ON GAME CLASS //
User.prototype.submitPlayerHigh = function ()
{
  submitScore(this.userName,this.sessionID,game.getPlayerScore());
};
