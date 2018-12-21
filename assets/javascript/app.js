// CLICK EVENTS //

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time: <span id="counter-number">20</span></h2>');
  game.loadQuestion();
});


// QUESTIONS //

var questions = [{
    question: "What is the largest brewery in the US?",
    answers: ["Coors", "Molson", "High Falls Brewery", "Anheuser-Busch"],
    correctAnswer: "Anheuser-Busch",
    image:"assets/images/barney.gif",
    imageWrong:"assets/images/wrong2.png",
    imageOutOfTime:"assets/images/outoftime.gif"
  }, 
  {
    question: "Beer is the second most popular beverage in the world. What is the first?",
    answers: ["Milk", "Water", "Tea", "Soda"],
    correctAnswer: "Tea",
    image:"assets/images/cheers.gif",
    imageWrong:"assets/images/wrong2.png",
    imageOutOfTime:"assets/images/outoftime.gif"
  }, 
  {
    question: "Which city host the festival of beer known as Oktoberfest?",
    answers: ["Berlin", "Hamburg", "Frankfurt", "Munich"],
    correctAnswer: "Munich",
    image:"assets/images/chug.gif",
    imageWrong:"assets/images/wrong2.png",
    imageOutOfTime:"assets/images/outoftime.gif"
  }, 
  {
    question: "Where is the oldest brewery in North America?",
    answers: ["New York City", "Pennsylvania", "Mexico City", "Montreal"],
    correctAnswer: "Montreal",
    image:"assets/images/dancing.gif",
    imageWrong:"assets/images/wrong2.png",
    imageOutOfTime:"assets/images/outoftime.gif"
  }, 
  {
    question: "The top five nations that brew beer are USA, China, Germany, Japan and what other country?",
    answers: ["Brazil", "England", "Canada", "Mexico"],
    correctAnswer: "Brazil",
    image:"assets/images/duff.gif",
    imageWrong:"assets/images/wrong2.png",    
    imageOutOfTime:"assets/images/outoftime.gif"
  }, 
  {
    question: "Budweiser stole the name of what beer?",
    answers: ["Budvieser", "Boodweiser", "Budseir", "Budvar"],
    correctAnswer: "Budvar",
    image:"assets/images/girl.gif",
    imageWrong:"assets/images/wrong2.png",
    imageOutOfTime:"assets/images/outoftime.gif"
  }, 
  {
    question: "What is the first 'foreign' beer to be sold in Germany?",
    answers: ["Sam Adams", "Budweiser", "Coors", "Molson"],
    correctAnswer: "Sam Adams",
    image:"assets/images/girldrunk.gif",
    imageWrong:"assets/images/wrong2.png",
    imageOutOfTime:"assets/images/outoftime.gif"
  }, 
  {
    question: "How long did prohibition last?",
    answers: ["12yr", "15yr", "13yr", "14yr"],
    correctAnswer: "13yr",
    image:"assets/images/golfcart.gif",
    imageWrong:"assets/images/wrong2.png",
    imageOutOfTime:"assets/images/outoftime.gif"
  }, 
  {
    question: "Which beer is known as the 'Champagne of Beer?",
    answers: ["Coors", "Corona Extra", "Miller High Life", "Bud Light"],
    correctAnswer: "Miller High Life",
    image:"assets/images/homer.gif",
    imageWrong:"assets/images/wrong2.png",
    imageOutOfTime:"assets/images/outoftime.gif"
  }, 
  {
    question: "What is the most popular style of beer consumed in the world?",
    answers: ["Stout", "Ale", "Pilsner", "Lager"],
    correctAnswer: "Lager",
    image:"assets/images/simpsons.gif",
    imageWrong:"assets/images/wrong2.png",    
    imageOutOfTime:"assets/images/outoftime.gif"
  }];


// VARIABLES FOR GAME //

var panel = $('#quiz-area');
var countStartNumber = 20;

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,

  // COUNTDOWN FUNCTION //
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },

  // LOAD QUESTION FUNCTION //
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' 
      + questions[this.currentQuestion].answers[i] + '">' + 
      questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },

  // NEXT QUESTION FUNCTION //
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  // TIMES UP FUNCTION //
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].imageOutOfTime + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  // RESULTS FUNCTION //
  results: function() {
    clearInterval(timer);

    panel.html('<h2>Here is how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },

  // CLICKED ANSWER FUNCTION //
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  // CLICKED WRONG ANSWER FUNCTION //
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].imageWrong + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  // CLICKED RIGHT ANSWER FUNCTION //
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 4 * 1000);
    } else {
      setTimeout(game.nextQuestion, 4 * 1000);
    }
  },

  // END/RESET GAME FUNCTION // 
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
