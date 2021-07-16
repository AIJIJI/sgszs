// pages/flip/flip.js
/**
 *
 * bird {x,y,velocityY,}
 * */
function Bird( options ) {
  this.x = options.x;//screenDim.w / 2;
  this.y = options.y;// screenDim.h / 2;
  this.dim = {w: Setting.birdW, h: Setting.birdH };
  this.velocityY = 0;
  this.avatar = 'img/avatar.png';
  this.lastFlyTime = 0;
  this.isStopOnGround = false;
  this.isDead = false;

  this.pushUpState = false;
}

Bird.getInstance = function (options,isNewInstance) {
  Bird._instance = isNewInstance?new Bird(options):(Bird._instance || new Bird(options));
  return Bird._instance;
}
Bird.prototype = {
  YScale: 0.01,
  translateX:function( x ){
      //debugger;
      console.log(['xxx',x])
    this.x += x;
  },
  fly: function (ctx, img) {

      if (this.isStopOnGround) {
          ctx.save();
          ctx.setTransform(1,0,0,1,0,0);
          ctx.translate(this.x+15  ,this.y +15 );
          ctx.rotate(30*Math.PI/180);
          ctx.drawImage(img, -15, -15, this.dim.w, this.dim.h);
          ctx.restore();

      } else {
          var now = +new Date();
          var elapseTime = this.lastFlyTime ? now - this.lastFlyTime : 0;

          var g =  Equation.G*Setting.Bird.GScale;
          if(this.pushUpState){
              g= -10*g;
              this.velocityY = 0;
              this.setPushUp(false)
          }
          var s = Equation.distance(this.velocityY, elapseTime, g) / this.YScale;
          ctx.drawImage(img, this.x, this.y = this.y + s, this.dim.w, this.dim.h);
          g<0 ?console.warn(['路程',s,this.y]):console.log(['路程',s,this.y]);
          //console.log('draw bird');
          // console.log([this.x, this.y])
          this.lastFlyTime = +new Date();
          this.velocityY = Equation.vt(this.velocityY, elapseTime, g);
      }

  },

  setPushUp:function(isUP){
      this.pushUpState = isUP;
  },
  dropOnGround: function () {
      this.velocityY = 0;
      this.isStopOnGround = true;
  },
  goDie:function(){
      this.isDead = true;
  },
  isDie:function(){
      return this.isDead;
  }

}

var Equation = {
  G: 9.8,
  distance: function (v0, t, a) {
      t = t / 1000;
      return v0 * t + a * Math.pow(t, 2);
  },
  vt: function (v0, t, a) {
      t = t / 1000;
      return v0 + a * t;
  }
};

var Event = {
  on: function (type, ele, fn) {
      if (fn) {
          type = type.split(' ');
          type.forEach(function (t, i) {
              ele.addEventListener(t, fn, true);
          })
      }
      if (!fn) {
          fn = ele;
          Event._map = Event._map || (Event._map = {});
          Event._map[type] = {fn: fn};
      }
  },
  keydown: function (ele, fn) {
      this.on('keydown', ele, fn);
  },
  trigger: function (type, ctx, param) {
      var meta = Event._map[type];
      meta && meta.fn.call(ctx || window, param);
  },
  keys: {
      SPACE: 32
  }
}

function Obstacle(options) {
  this.dim = {
      x: 0,
      y: 0,
      w: 30,
      h: 30
  };
  this.imgSrc = '';

  Util.extend(this, options);

}

Obstacle.prototype = {
  translateX: function (x) {

      this.dim.x += x;
      if (this.dim.x <= 0) {
          this.dim.x = this.world.dim.w;
      }
  },
  isCollide: function (dim) {
      var d = this.dim;
      var number = Util.Number;
      var collideObj = {isCollide: false, collideX: 0};
      if (number.contain(dim.x, d.x, d.x + d.w) && number.contain(dim.y, d.y, d.y + d.h)) {
          // console.log([number.contain(dim.x,d.x, d.x+ d.w) , number.contain( dim.y, d.y, d.y+ d.h)])
          collideObj = {isCollide: true, collideX: dim.x - d.x};
      }
      return collideObj;

  },
  draw: function (ctx) {
      var _this = this;
      Util.newImage(this.src, function (img) {
          var dim = _this.dim;
          ctx.drawImage(img, dim.x, dim.y, _this.dim.w, dim.h)
      })
  }
}

function ObstacleS(world, ctx, bird, isNew) {
  var birdH = Setting.birdH;
  isNew&&( ObstacleS._obstacles = []);
  var defaultOpts = ObstacleS.defaultOpts || (ObstacleS.defaultOpts = {
          obstacleCount: 5,
          obstaclePercent: 0.2,
          YScale: 0.5,
          birdGapScale: Setting.Obstacle.GapScale,
          obstacleTranslateX: world.dim.w,
          translateXScale: 0.01
      });
  var obstacleUnitW = world.dim.w / defaultOpts.obstacleCount;
  var obstacleW = obstacleUnitW * defaultOpts.obstaclePercent;
  var _obstacles = ObstacleS._obstacles || (ObstacleS._obstacles = []);
  var unitTranslateX = defaultOpts.translateXScale * obstacleUnitW;
  for (var i = 0; i < defaultOpts.obstacleCount; i++) {


      if (_obstacles[i * 2] && _obstacles[i * 2 + 1]) {
          var x = ObstacleS.isGameOver ? 0 : unitTranslateX;
          _obstacles[i * 2].translateX(-x)
          _obstacles[i * 2 + 1].translateX(-x)
          var isCollidaUp = _obstacles[i * 2].isCollide(bird),
              isCollidaDown = _obstacles[i * 2 + 1].isCollide(bird);
          if (isCollidaUp.isCollide || isCollidaDown.isCollide) {
              ObstacleS.isGameOver = true,
              isCollidaUp.isCollide && bird.translateX(-1 * (isCollidaUp.collideX + bird.dim.w)),
              isCollidaDown.isCollide && bird.translateX(-1 * (isCollidaDown.collideX + bird.dim.w)),
                  Event.trigger(Setting.Event.GAMEOVER)
          } else {
              var dim =_obstacles[i * 2].dim;
              //debugger;
              if(Util.Number.contain( bird.x, dim.x, dim.x+unitTranslateX*1.1 ) ){
                  Event.trigger(Setting.Event.SCORE)
              }
          }

      }
      else {
          //create new
          var x = ((1 - defaultOpts.obstaclePercent) / 2 + i) * obstacleUnitW + defaultOpts.obstacleTranslateX;
          var h = (world.dim.h - birdH * defaultOpts.birdGapScale) / 2;
          var scaleY = h * (1 - 1 / 2 * Math.random());

          _obstacles[i * 2] = new Obstacle({
              dim: {
                  x: x,
                  y: 0,
                  w: obstacleW,
                  h: scaleY
              }, src: 'img/obstacle_top.png', world: world
          });
          _obstacles[i * 2 + 1] || (_obstacles[i * 2 + 1] = new Obstacle({
              dim: {
                  x: x,
                  y: scaleY + birdH * defaultOpts.birdGapScale,
                  w: obstacleW,
                  h: h + scaleY
              }, src: 'img/obstacle_bottom.png', world: world
          }));
      }
      var topObstacle = _obstacles[i * 2]
          , bottomObstacle = _obstacles[i * 2 + 1];
      topObstacle.draw(ctx);
      bottomObstacle.draw(ctx);
  }
}


var Setting={
  birdW:30,
  birdH:20,
  Event:{
      GAMEOVER:1,
      SCORE:2

  },
  Bird:{
      GScale:1
  },
  Obstacle:{
      GapScale:7
  }
}

var Util = {
  cache: {},
  newImage: function (src, fn) {
      if (this.cache[src]) {
          fn(this.cache[src]);
      }
      var img = new Image();
      this.cache[src] = img;
      img.src = src;
      img.onload = function () {
          fn(img)
      };
  },
  extend:function(src, dst){
      for( i in dst){
          src[i]=dst[i];
      }
  },
  Number:{
      contain:function(x,start,end){
          if(x>start && x<end){
              return true;
          }
      }
  }
}

function World(options) {
  Util.extend(this,options)
}

World.getInstance = function ( options,isNewInstance ) {
  World._instance = isNewInstance ? new World(options) :(World._instance || new World(options));
  return World._instance;
}

World.prototype = {
  isDropOnGrounp: function (y) {
      if (y >= this.bottom) {
          // console.log('on Ground');
          return true;
      }
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady() {
    (function (win) {

      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      var screenDim = {};
      var global = {score: 0};
    

      var rect = document.body.getBoundingClientRect();
      var w = rect.width, h = rect.height;
      screenDim.w = w;
      screenDim.h = h;

      canvas.setAttribute('width', w);
      canvas.setAttribute('height', h);
    
    
      function drawScreen() {
          ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
          ctx.fillRect(0, 0, screenDim.w, screenDim.h);
      }
    
      /**/
    
    
      function drawBackground(ctx, img) {
          ctx.drawImage(img, 0, 0, screenDim.w, screenDim.h);
      }
    
      function drawScore(ctx) {
          /*  ctx.fillStyle = '#cc55cc';
           ctx.font = "40px _sans"
           ctx.textBaseline = 'top';
           ctx.fillText(global.score, 100, 10);*/
      }
    
      function bindEvent(bird) {
          var piece = document.querySelector('.pieces');
          Event.on('resize', window,function(){
              //alert('resize');
              setCanvasDim();
              main(true);
          });
          Event.on('click', piece, function () {
              location.reload();
          })
          Event.on(Setting.Event.GAMEOVER, function () {
              bird.goDie();
              var cls = piece.getAttribute('class');
              piece.innerText="挂掉了"
              piece.setAttribute('class', cls + ' gameover');
          })
          Event.on(Setting.Event.SCORE, function () {
              global.score += 1;
    
              piece.innerText = global.score;
              if(global.score>=3){
                  global.score = 0;
                  //难度增加
                  Setting.Bird.GScale+=0.5;
                  Setting.Obstacle.GapScale -=0.5;
                  main(true);
              }
    
          })
          Event.on('keydown touchstart', document.querySelector('body'), function (e) {
    
              if ((e.type = 'keydown' && e.keyCode == Event.keys.SPACE) || e.type == 'touchstart') {
    
                  bird.isDie() || bird.setPushUp(true);
              }
    
          })
      }
    
      function cycle(bird,world, isNew ) {
    
          var img = new Image();
          img.src = bird.avatar;
          Util.newImage('images/flip/background.png', function (backImg) {
    
              img.onload = function () {
                  drawScreen();
                  drawBackground(ctx, backImg);
                  drawScore(ctx);
                  world.isDropOnGrounp(bird.y + bird.dim.h) && bird.dropOnGround();
                  bird.fly(ctx, img);
    
              }
          })
    
          ObstacleS(world, ctx, bird, isNew);
          isNew && (isNew=false);
          requestAnimationFrame(function () {
              cycle(bird,world, isNew);
          })
      }
    
      function main(isNew) {
          var bird = Bird.getInstance({x: screenDim.w / 2, y: screenDim.h / 2},isNew);
          var world = World.getInstance({bottom: screenDim.h, dim: screenDim},isNew);
          cycle(bird,world,isNew);
          bindEvent(bird);
    
      }
    
    
      main();
    
      win.main = main;
    
    }(window))
    
  },

  onLoad: function (options) {
    // window.onload(function() {
    //     setTimeout(function(){
    //         if(typeof(window.scrollTo) == 'function'){
    //             window.scrollTo(0, 1);
    //         }
    //     }, 100);
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})