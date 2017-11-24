

// DICE "CLASS" //
// constructor for a dice with given amount of sides //
function Dice(noOfSides)
{
  this.noOfSides = noOfSides;
  // created dice will automaticly be assigned at construction //
	this.Value = Math.floor(Math.random() * noOfSides + 1);
}

// FUNCTIONS RELATED TO DICE CLASS //
// simply returns the value of the dice //
Dice.prototype.getDiceValue = function(){
  return this.Value;
};
// assign new random value
Dice.prototype.rollDice = function (){
  this.Value = Math.floor(Math.random() * this.noOfSides + 1);
};


// GAME "CLASS" //
// constructor for a game consistant of maximum turns a player can throw the dice and the number of dice involved with given amount of sides//
function Game(maxRolls, noOfdice, noOfSides)
{
  // array that holds all the dice //
  this.dice = [];
  // fill with game chosen amount of dice //
  for (var i= 0; i < noOfdice; ++i)
  {
    this.dice[i] = new Dice(noOfSides);
  }
  // keeps track of no of rolls //
  this.numberOfRolls = maxRolls;
  // keeps track of how many rolls player have left //
  this.rollsLeft = maxRolls;
  // keeps track of player score //
  this.playerScore = 0;
  this.timesTried = 0;
  // variable to store last outcome before roll //
  this.lastSumOfFirstThree = 0;
}

// FUNCTIONS RELATED TO GAME CLASS //
// returns available turns left //
Game.prototype.getCurrentTurn = function()
{
	return this.numberOfRolls - this.rollsLeft;
};
Game.prototype.getAmountOfdiceInGame = function()
{
	return this.dice.length;
};
Game.prototype.getValueOfThisDice = function (noOfThatDice)
{


  return this.dice[noOfThatDice].getDiceValue();
};
// roll all dice in game //
Game.prototype.throwdice = function ()
{
  for (var i = 0; i < this.dice.length; ++i)
  {
    this.dice[i].rollDice();
  }
};

// keeps the sum of all dice in game //
Game.prototype.getSumOfFirstThreedice = function ()
{
var returnSumOfFirstThree = 0;
for (var i= 0; i < 3; ++i)
{

  returnSumOfFirstThree += this.dice[i].getDiceValue();

}
return returnSumOfFirstThree;
};

// returns value of last dice in array (multiplier) //
Game.prototype.getSumOfLastDice = function ()
{
  return this.dice[(this.dice.length)-1].getDiceValue();
};

Game.prototype.decreaseRolls = function ()
{
  --this.rollsLeft;
};
Game.prototype.increaseTimesTried = function ()
{
  ++this.timesTried;
};
Game.prototype.getAvailableRolls = function ()
{
  return this.rollsLeft;
};
Game.prototype.getPlayerScore = function ()
{
  return this.playerScore;
};
Game.prototype.resetAvailableRolls = function ()
{
  this.rollsLeft = this.numberOfRolls;
};

Game.prototype.getTimesTried = function ()
{
return this.timesTried;
};
// function to check game ending //
Game.prototype.isGameEnding = function ()
{
  //  end game //
  if (this.rollsLeft)
   {
     return false;
   }
   // continue //
   else
   {
    return true;
   }

};

// evaluates player guess according to game rules //
Game.prototype.evaluateGuess = function(playerGuess)
{


// take away a roll from player //
this.decreaseRolls();
  // check if player guess is less or equal to the sum of the first three dice //
  if (playerGuess <= this.getSumOfFirstThreedice())
  {
    // takes the sum of the first three and multiply it WITH LAST DICE IN ARRAY //
    this.playerScore += (this.getSumOfFirstThreedice() * this.getSumOfLastDice());
    // then tells user of win //
    return true;
  }
  else

  {

    // tell user of loss //
    return false;
  }
};

Game.prototype.resetScore = function(playerGuess)
{
  this.playerScore = 0;
};
Game.prototype.getLastSumOfFirstThree = function(playerGuess)
{
  return this.lastSumOfFirstThree;
};
