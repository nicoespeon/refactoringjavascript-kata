exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function () {
  const plyrs = new Array();
  const places = new Array(6);
  const purses = new Array(6);
  var inPenaltyBox = new Array(6);

  const popQuestions = new Array();
  const scienceQuestions = new Array();
  const sportsQuestions = new Array();
  const rockQuestions = new Array();

  var curPlayer = 0;
  let isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function () {
    return !(purses[curPlayer] == 6);
  };

  var currentCategory = function () {
    if (places[curPlayer] == 0) return "Pop";
    if (places[curPlayer] == 4) return "Pop";
    if (places[curPlayer] == 8) return "Pop";
    if (places[curPlayer] == 1) return "Science";
    if (places[curPlayer] == 5) return "Science";
    if (places[curPlayer] == 9) return "Science";
    if (places[curPlayer] == 2) return "Sports";
    if (places[curPlayer] == 6) return "Sports";
    if (places[curPlayer] == 10) return "Sports";
    return "Rock";
  };

  this.createRockQuestion = function (idx) {
    return "Rock Question " + idx;
  };

  for (var i = 0; i < 50; i++) {
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    rockQuestions.push(this.createRockQuestion(i));
  }

  this.isPlayable = function (howManyPlayers) {
    return howManyPlayers >= 2;
  };

  this.add = function (playerName) {
    plyrs.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + plyrs.length);

    return true;
  };

  this.howManyPlayers = function () {
    return plyrs.length;
  };

  var askQuestion = function () {
    if (currentCategory() == "Pop") console.log(popQuestions.shift());
    if (currentCategory() == "Science") console.log(scienceQuestions.shift());
    if (currentCategory() == "Sports") console.log(sportsQuestions.shift());
    if (currentCategory() == "Rock") console.log(rockQuestions.shift());
  };

  this.roll = function (roll) {
    console.log(plyrs[curPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (inPenaltyBox[curPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;

        console.log(plyrs[curPlayer] + " is getting out of the penalty box");
        places[curPlayer] = places[curPlayer] + roll;
        if (places[curPlayer] > 11) {
          places[curPlayer] = places[curPlayer] - 12;
        }

        console.log(
          plyrs[curPlayer] + "'s new location is " + places[curPlayer]
        );
        console.log("The category is " + currentCategory());
        askQuestion();
      } else {
        console.log(
          plyrs[curPlayer] + " is not getting out of the penalty box"
        );
        isGettingOutOfPenaltyBox = false;
      }
    } else {
      places[curPlayer] = places[curPlayer] + roll;
      if (places[curPlayer] > 11) {
        places[curPlayer] = places[curPlayer] - 12;
      }

      console.log(plyrs[curPlayer] + "'s new location is " + places[curPlayer]);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function () {
    if (inPenaltyBox[curPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        purses[curPlayer] += 1;
        console.log(
          plyrs[curPlayer] + " now has " + purses[curPlayer] + " Gold Coins."
        );

        var winner = didPlayerWin();
        curPlayer += 1;
        if (curPlayer == plyrs.length) curPlayer = 0;

        return winner;
      } else {
        curPlayer += 1;
        if (curPlayer == plyrs.length) curPlayer = 0;
        return true;
      }
    } else {
      console.log("Answer was correct!!!!");

      purses[curPlayer] += 1;
      console.log(
        plyrs[curPlayer] + " now has " + purses[curPlayer] + " Gold Coins."
      );

      var winner = didPlayerWin();

      curPlayer += 1;
      if (curPlayer == plyrs.length) curPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function () {
    console.log("Question was incorrectly answered");
    console.log(plyrs[curPlayer] + " was sent to the penalty box");
    inPenaltyBox[curPlayer] = true;

    curPlayer += 1;
    if (curPlayer == plyrs.length) curPlayer = 0;
    return true;
  };
};

var notAWinner = false;

var game = new Game();

game.add("Chet");
game.add("Pat");
game.add("Sue");

do {
  game.roll(Math.floor(Math.random() * 6) + 1);

  if (Math.floor(Math.random() * 10) == 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }
} while (notAWinner);
