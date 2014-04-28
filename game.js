$(document).ready(function() {
  window.game = new Game(10, 10);
  window.game.start();
});

function Circle() {
  this.x = Math.random() * 450;
  this.y = Math.random() * 450;
  this.diameter = 30 + Math.random() * 50;
  this.speed = 500 + Math.random() * 1500;

  this.render = function() {
    var _this = this;

    this.$me = $('<div class="circle"></div>')
    .css('left', this.x)
    .css('top', this.y)
    .css('height', this.diameter)
    .css('width', this.diameter)
    .on('click', function(){
      _this.kill();
    });

    $('#game').append(this.$me);
  };

  this.move = function() {
    var _this = this;
    this.$me.animate({
      top: Math.random() * 450,
      left: Math.random() * 450
    }, {
      duration: this.speed,
      complete: function() {
        _this.move();
      }
    });
  };

  this.kill = function() {
    this.$me.css('background-color', 'red')
    .effect({
      effect: 'explode',
      duration: 100,
      complete: function() {
        $(this).remove();
        $("#score").text(window.game.score += 100);
      },
      queue: false
    });
  };
}

Circle.init = function() {
  var circle = new Circle();
  circle.render();
  circle.move();
  return circle;
};


function Game(circleCount, duration) {
  this.score = 0;
  this.circles = [];
  this.circleCount = circleCount;
  this.duration = duration * 1000;

  // timer
  var currentTime = new Date();
  var start = new Date();

  // set start time
  start.setTime(currentTime.getTime() + (this.duration));

  var myVar;


  this.start = function() {
    for (var i=0; i < this.circleCount; i++) {
      this.circles.push(Circle.init());
    }

    $("#score").text(this.score);
    $('.Timer').text(this.duration / 1000);

    setTimeout(this.stop, this.duration);

    // timer
    myVar = setInterval(function() {
      $('.Timer').text(Math.round((start - new Date) / 1000) + " Seconds");
    }, 1000);

  };

  this.stop = function() {
    
    // clear timer
    clearTimeout(myVar);  
    $('.Timer').text("");

    alert("GAME OVER!");

    for (var i=0; i < window.game.circleCount; i++) {
      window.game.circles[i].$me.remove();
    }
  };
}