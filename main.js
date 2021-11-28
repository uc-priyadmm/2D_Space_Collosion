// A Mayank Mani Productions Original

var COL = function() {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  canvas.height = document.querySelector('body').clientHeight/2;
  canvas.width = document.querySelector('body').clientWidth;

  var points = [];

  function dist2 (a, b) {
    return ( Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) );
  }

  function dist (a, b) {
    return Math.sqrt( dist2(a, b) );
  }

  function toPolar (p) {
    var v = Math.sqrt( Math.pow(p.Vx, 2) + Math.pow(p.Vy, 2) );
    var theta = Math.atan2(p.Vy, p.Vx);
    return [v, theta];
  }

  // Point, The function point is given its random attributes here and this is how paricles always apper on the screen in random location.
  function Point(id, radius) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.Vx = Math.ceil(Math.random() * 5)/4 - 5/8;
    this.Vy = Math.ceil(Math.random() * 5)/4 - 5/8;
    this.radius = radius || ( canvas.width > 800 ? 20 : 10 );

    this.setPosition();
  }

  Point.prototype.setPosition = function() {
    var box = canvas.getBoundingClientRect();

    do {
      var x = Math.floor(Math.random() * box.width)
      var y = Math.floor(Math.random() * box.height)
      this.x = x;
      this.y = y;
    } while ( this.isCollidingWithWall() || this.pointsCollidingWith().length > 0 )
  }
  
  Point.prototype.isCollidingWithVerticalWall = function() { //Vertical wall collision
    var w = canvas.width;
    if ( this.x < this.radius || this.x > w - this.radius  )
      return true;
    return false;
  }

  Point.prototype.isCollidingWithHorizontalWall = function() { //Horizontal wall collision 
    if ( this.y < this.radius || this.y > h - this.radius )
      return true;
    return false;
  }

  Point.prototype.isCollidingWithWall = function() {
    return this.isCollidingWithVerticalWall() || this.isCollidingWithHorizontalWall();
  }

  Point.prototype.pointsCollidingWith = function() {
    var me = this;
    var pointsColliding = [];

    points.forEach(function(point) {
      if ( me.id !== point.id && dist2(me, point) < Math.pow( me.radius + point.radius, 2 ) ) 
        pointsColliding.push(point);
    });

    if ( pointsColliding.length ) {
      var ids = '';
      pointsColliding.forEach(function(p) {
        ids += p.id + ' ';
      });
      // console.log(me.id + ' collides with ids ' + ids);

    }

    return pointsColliding;
  }
  // END POINT

  var movePoints = function() {
    points.forEach(function(point) {
      point.x += point.Vx;
      point.y += point.Vy;

      if ( point.isCollidingWithHorizontalWall() )
        point.Vy = -point.Vy;

      if ( point.isCollidingWithVerticalWall() )
        point.Vx = -point.Vx;

      if ( point.pointsCollidingWith().length ) {
        point.pointsCollidingWith().forEach(function(p2) {

          // Move them away first
          var d = dist(point, p2)
          if ( d < point.radius + p2.radius ) {
            var move = (point.radius + p2.radius - d)/2;
            var t1 = -Math.atan2(point.Vy, point.Vx);
            var t2 = -Math.atan2(p2.Vy, p2.Vx);
            point.x += move * Math.cos(t1); 
            point.y += move * Math.sin(t1);
            p2.x += move * Math.cos(t2);
            p2.y += move * Math.sin(t2);
          }

          //
          var dy = p2.y - point.y;
          var dx = p2.x - point.x;
          var phi = dx !== 0 ? Math.atan(dy/dx) : Math.PI/2;

          var m1 = Math.pow(point.radius, 2);
          var m2 = Math.pow(p2.radius, 2); 

          var u1 = toPolar(point);
          var u2 = toPolar(p2);

          var u1xr = u1[0] * Math.cos(u1[1] - phi);
          var u2xr = u2[0] * Math.cos(u2[1] - phi);
          
          var v1yr = u1[0] * Math.sin(u1[1] - phi);
          var v2yr = u2[0] * Math.sin(u2[1] - phi);

          var v1xr = ( (m1 - m2) * u1xr + 2 * m2 * u2xr ) / ( m1 + m2 )
          var v2xr = ( 2 * m1 * u1xr + (m2 - m1) * u2xr ) / ( m1 + m2 )
          
          point.Vx = Math.cos(phi) * v1xr + Math.sin(phi) * v1yr;
          point.Vy = Math.sin(phi) * v1xr + Math.cos(phi) * v1yr;

          p2.Vx = Math.cos(phi) * v2xr + Math.sin(phi) * v2yr;
          p2.Vy = Math.sin(phi) * v2xr + Math.sin(phi) * v2yr;

          point.x += point.Vx;
          point.y += point.Vy;

          p2.x += 2 * p2.Vx;
          p2.y += 2 * p2.Vy;
        });
      }

    });
  }

  var drawPoint = function(p) {
    ctx.beginPath();
    ctx.arc( p.x, p.y, p.radius, 0, 2 * Math.PI, false );
    ctx.strokeStyle = '#01c853';
    ctx.stroke();
    ctx.closePath();

    /*ctx.font = "20px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText(p.id.toString(), p.x, p.y);*/
  }

  var animate = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePoints();
    drawPoints();

    window.requestAnimationFrame(animate);
  }

  var drawPoints = function() {
    points.forEach(function(point) {
      drawPoint(point);
    });
  }

  var init = function() {
    for ( var i = 0; i < 40; i++ )
      points.push(new Point(i));

    drawPoints();
    animate();
  }

  return {
    init: init
  }
}

window.addEventListener('load', COL().init);
