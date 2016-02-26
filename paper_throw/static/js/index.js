var canvas=document.getElementById('stage');
var ctx=canvas.getContext('2d');
function isMobile(){
	var sUserAgent= navigator.userAgent.toLowerCase(),
	bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
	bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
	bIsMidp= sUserAgent.match(/midp/i) == "midp",
	bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
	bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
	bIsAndroid= sUserAgent.match(/android/i) == "android",
	bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
	bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
	bIsWebview = sUserAgent.match(/webview/i) == "webview";
	return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
    }
function initCanvas(){
	var stage = document.getElementById('stage');
	stage.width = $(window).get(0).innerWidth;
	stage.height = $(window).get(0).innerHeight;
	if (!isMobile()){
		stage.width = 320;
		stage.height = 568;
	}
}
initCanvas();
var arrY=[0,-10,-20,-30,-40,-50,-60,-70,-80,-90,-100,-110,-120,-130,-140,-150,-160,-170,-180,-190,-200,-210,-220,-230,-240,-250,-260,-270,-280,-290,-300,-300,-290,-280,-270,-260,-250,-240,-230,-220,-210,-200,-190,-180,-170,-160,-150,-140,-130,-120,-110,-100,-90,-80,-70];
/*var arrY=[0,-10,-20,-30,-40,-50,-60,-70,-80,-90,-100,-110,-120,-130,-140,-150,-160,-170,-180,-190,-200,-210,-220,-230,-240,-250,-260,-270,-280,-290,-300,-300,-299,-297,-294,-290,-285,-279,-272,-255,-246,-236,-225,-213,-199,-184,-168,-151,-133,-113,-92,-80,-70];*/
var speedX=0;
var arrTime=0;
var g=0.25;
var Vy=-10;
var random=Math.random();	
var speedX;	
var screenWidth=canvas.width;
var screenHeight=canvas.height;
var centerX=canvas.width/2;
var centerY=canvas.height*0.95;
var Width=0.17*canvas.width;
var Height=0.1*canvas.height;
var screenX=0.5*canvas.width+Width/2;
var screenY=0.96*canvas.height+Height/2;//514.5
var X=screenX+speedX*arrTime;
var Y=screenY+arrY[arrTime];	
var timmer=null;
var state=0;
var moveTime=0;
var touchTime=0;
var collideTime=0;
var delayTime=0;
var score=0;
var flow=0;
var paperIn=0;
var trashState=0;
var paperState=0;
var touchMoveState=0;
var moveState=0;
var move1State=0;
var collideState=0;
var rotateState=0;
var rotateAngle=0;
var score=0;
var time=0;
var leftTime=30;
var stipulate1=0;
var stipulate2=0;
var stipulate3=0;
var restartFlag=0;

function resetInit(){
	canvas=document.getElementById('stage');
    ctx=canvas.getContext('2d');
    screenWidth=canvas.width;
    screenHeight=canvas.height;
    Width=54;
    Height=54;		
    timmer=null;
    state=0;
    moveTime=0;
    collideTime=0;
    score=0;
    flow=1;
    restartFlag=0;
    score=0;
    time=0;
    leftTime=30;
	}	
function resetMove(){
	random=Math.random();		
    g=0.25;
    arrTime=0;
	speedX=0;
	hypotenuse=6;
    centerX=canvas.width/2;
    centerY=canvas.height*0.95;
    Width=0.17*canvas.width;
    Height=0.1*canvas.height;
    screenX=0.5*canvas.width;
    screenY=0.96*canvas.height;//514.5
	arrY=[0,-10,-20,-30,-40,-50,-60,-70,-80,-90,-100,-110,-120,-130,-140,-150,-160,-170,-180,-190,-200,-210,-220,-230,-240,-250,-260,-270,-280,-290,-300,-300,-290,-280,-270,-260,-250,-240,-230,-220,-210,-200,-190,-180,-170,-160,-150,-140,-130,-120,-110,-100,-90,-80,-70];
    /*arrY=[0,-10,-20,-30,-40,-50,-60,-70,-80,-90,-100,-110,-120,-130,-140,-150,-160,-170,-180,-190,-200,-210,-220,-230,-240,-250,-260,-270,-280,-290,-300,-300,-299,-297,-294,-290,-285,-279,-272,-255,-246,-236,-225,-213,-199,-184,-168,-151,-133,-113,-92,-80,-70];*/
	X=screenX+speedX*arrTime;
    Y=screenY+arrY[arrTime];
	moveTime=0;
	trashState=0;
	collideTime=0;
	delayTime=0;
	paperIn=0;
	paperState=0;
	collideState=0;
	rotateState=0;
	moveState=0;
	move1State=0;
}	

function DrawImage568(pic, X, Y, width, height){
	var canvas = document.getElementById('stage');
	var ctx = canvas.getContext('2d');
	var screenWidth, screenHeight;
	screenWidth = gameMonitor.screenWidth;
	screenHeight = gameMonitor.screenHeight;
	ctx.drawImage(pic, X / 320 * screenWidth, Y / 568 * screenHeight, 
		width / 320 * screenWidth, height / 568 * screenHeight);
}

var gameMonitor = {
	eventType : {
		start : 'touchstart',
		move : 'touchmove',
		end : 'touchend'
	},
	timmer : null,
	screenWidth : 0,
	screenHeight : 0,
	time : 0,
    trashList:[],
	loadpic : function(){
		var _this = this;
		var canvas = document.getElementById('stage');
		var ctx = canvas.getContext('2d');
		
		var bg1 = new Image();
		_this.bg1 = bg1;
		bg1.src = 'static/img/bg1.jpg';
		bg1.onload = function(){};
		
		var bt=new Image();
		_this.bt=bt;
		bt.src='static/img/bt.png'
		bt.onload=function(){};
		
		var bg2 = new Image();
		_this.bg2 = bg2;
		bg2.src = 'static/img/bg2.png';
		bg2.onload = function(){};
		
		var top = new Image();
		_this.top = top;
		top.src = 'static/img/top.png';
		top.onload = function(){};
		
		var bottom = new Image();
		_this.bottom = bottom;
		bottom.src = 'static/img/bottom.png';
		bottom.onload = function(){};
		
		var timeBar=new Image();
		_this.timeBar=timeBar;
		timeBar.src='static/img/timeBar.png';
		timeBar.onload=function(){};
		
	    var trash = new Image();
		_this.trash = trash;
		trash.src = 'static/img/trash.png';
		trash.onload = function(){}
		
		var paper = new Image();
		_this.paper = paper;
		paper.src = 'static/img/paper.png';
		
		var ruler=new Image();
		_this.ruler=ruler;
        ruler.src='static/img/ruler.png';
	    ruler.onload=function(){};
		
		var desk=new Image();
		_this.desk=desk;
        desk.src='static/img/desk.png';
	    desk.onload=function(){};
		 
		
		var ksbtn=new Image();
		_this.ksbtn=ksbtn;
		ksbtn.src='static/img/ksbtn.png'
		ksbtn.onload=function(){};
		
		var guizebtn=new Image();
		_this.guizebtn=guizebtn;
		guizebtn.src='static/img/guizebtn.png'
		guizebtn.onload=function(){};
		
		var guize=new Image();
		_this.guize=guize;
		guize.src='static/img/guize.png'
		guize.onload=function(){};
		
		var hei=new Image();
		_this.hei=hei;
		hei.src='static/img/hei.png'
		hei.onload=function(){};
		
		var fenshu=new Image();
		_this.fenshu=fenshu;
		fenshu.src='static/img/fenshu.png'
		fenshu.onload=function(){};
		
		var leftTime=new Image();
		_this.leftTime=leftTime;
		leftTime.src='static/img/leftTime.png'
		leftTime.onload=function(){};

        var seconds=new Image();
		_this.seconds=seconds;
		seconds.src='static/img/seconds.png'
		seconds.onload=function(){};
		
		var toujin=new Image();
		_this.toujin=toujin;
		toujin.src='static/img/toujin.png'
		toujin.onload=function(){};
		
		var ci=new Image();
		_this.ci=ci;
		ci.src='static/img/ci.png'
		ci.onload=function(){};
	},
	init : function(){
		var _this = this;
		var canvas = document.getElementById('stage');
		var ctx = canvas.getContext('2d');
		_this.screenWidth = canvas.width;
		_this.screenHeight = canvas.height;
		_this.loadpic();		
		gameInit();
		_this.initListener();
	},
	initListener : function(){
		var _this = this;
		var body = $(document.body);
		$(document).on(gameMonitor.eventType.move, function(event){
			event.preventDefault();
			dealTouchMove();
		});
		body.on(gameMonitor.eventType.start,'#stage', function(event){
			event.preventDefault();
            dealTouchStart();
		});
		body.on(gameMonitor.eventType.end,'#stage', function(event){
			event.preventDefault();
           
		});
	},
	isMobile : function(){
		var sUserAgent= navigator.userAgent.toLowerCase(),
		bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
		bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
		bIsMidp= sUserAgent.match(/midp/i) == "midp",
		bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
		bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
		bIsAndroid= sUserAgent.match(/android/i) == "android",
		bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
		bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
		bIsWebview = sUserAgent.match(/webview/i) == "webview";
		return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
    },
	update : function(){
		var _this = this;
		var canvas = document.getElementById('stage');
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, _this.screenWidth, _this.screenHeight);
		_this.time ++;
		gameStart();
	},
	
}
function gameInit(){ 
    var _this=this;
    switch(state){
		case 0:
		  _this.gameStart();  
		break;	
		case 1:
		break;     
		}	
}
function gameStart(){
    var _this = this;
	update();
	_this.timmer=setTimeout(function(){
		_this.gameStart()
		},Math.round(1000/60));

}
function gameStop(){
	var _this=this;
	setTimeout(function(){
		clearTimeout(_this.timmer);
		},0);
}
function openUrl(){
	if(restartFlag == 1){
	window.open('http://www.baidu.com','_self');
	restartFlag=0;
	}
}
//初始化游戏
function paint(){
	var _this=this;
	var width=0.375*canvas.width;
	var height=0.18*canvas.height;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	DrawImage568(gameMonitor.top, 0, 0, screenWidth,screenHeight*0.52);
	DrawImage568(gameMonitor.bottom, 0, screenHeight*0.52, screenWidth,screenHeight*0.48);
	DrawImage568(gameMonitor.timeBar,0,0,320,79);
	if(trashState==0){
	  DrawImage568(gameMonitor.trash,random*250,374.5,100,70);
	  }
	DrawImage568(gameMonitor.desk, 0, 480,320,108);
	ImageRotate(ctx, gameMonitor.ruler,centerX, centerY, width, height, rotateAngle)
    if(paperState==0){
	    ImageScaleRotate(ctx,gameMonitor.paper, X, Y,Width,Height, rotateAngle);
	   }
	 if(paperState==1){
	   DrawImage568(gameMonitor.ci,random*250,374.5,100,70);	
	   } 
	
	}  
function DrawImageShear568(ctx, pic, SX, SY, Swidth, Sheight, X, Y, Width, Height){
	var screenWidth, screenHeight;
	var _this=this;
	screenWidth = gameMonitor.screenWidth;
	screenHeight = gameMonitor.screenHeight;
	ctx.drawImage(pic, SX, SY, Swidth, Sheight, X / 320 * screenWidth, Y / 568 * screenHeight, 
		Width / 320 * screenWidth, Height / 568 * screenHeight);
}
function ImageRotate(ctx, pic, centerX, centerY, width, height, rotateAngle){
	ctx.save();
	ctx.translate(centerX, centerY);
	ctx.rotate(rotateAngle * Math.PI / 180);
	ctx.translate(-width / 2, -height / 2);
	ctx.drawImage(pic, 0, 0, width, height);
	ctx.restore();
}
function ImageScaleRotate(ctx, pic, X, Y, width,height, rotateAngle, scaleX, scaleY){
	ctx.save();
	ctx.translate(X, Y);
	ctx.scale(scaleX, scaleY);
	ctx.rotate(rotateAngle * Math.PI / 180);
	ctx.translate(-Width / 2, -Height / 2);
	ctx.drawImage(pic, 0, 0, Width, Height);
	ctx.restore();
}	
function update(){
	var _this=this;
	switch(flow){
		case 0:
		  showDemo();
		 break;
	    case 1:
		  showGame();
		 break;
		case 2:
		  showOver();
		 break;
	 }
}
function dealTouchStart(){
	switch(flow){	
		case 0:		  
		  chooseStipulate();
		  break;
		case 1:
		  dealTouchMove();
		  dealThrow();
		  break;
		case 2:
		  dealOpenUrl();
		  break;		  
		}
	}		 
function dealTouchMove(){
    var _this = this;
	var touchX, touchY;
	if(gameMonitor.isMobile()){
		touchX = event.changedTouches[0].clientX;
		touchY = event.changedTouches[0].clientY;
	}else{
		touchX = event.offsetX;
		touchY = event.offsetY;
	}
	if(rotateState==0){
		getAngle(touchX,touchY);
		if(touchY<450){rotateState=0;}
		 else{rotateState=1;}
		}	   
	}
function getAngle(touchX,touchY){
	var distanceX;
    var distancceY;	
	distanceX=touchX-centerX;
	distanceY=touchY-centerY;
	rotateAngle =- Math.atan(distanceX/ distanceY) * 180 / Math.PI;
	speedX=Math.cos(-rotateAngle*Math.PI/180+Math.PI/2)* 180 / Math.PI/6;
	}        
function chooseStipulate(){
	var _this=this;
	var touchX,touchY;
	if(gameMonitor.isMobile()){
	   touchX=event.changedTouches[0].clientX;
	   touchY=event.changedTouches[0].clientY;
	}else{
		 touchX=event.offsetX;
		 touchY=event.offsetY;
		 }
	var arrX = 80;
	var arrY = 450;		
	if (arrX / 320 *canvas.width<touchX && touchX<arrX / 320 * canvas.width + 160/ 320 * canvas.width)
	   { if (arrY / 568 *canvas.height<touchY && touchY <arrY / 568 * canvas.height + 38 / 568 * canvas.height)
		  { 
			touchTime++;	
			stipulate1 = 1;
		    return;
		   }
		 else if( arrY / 568 * canvas.height+38<touchY && touchY < arrY / 568 * canvas.height + 96 / 568 * canvas.height)			        
		   {
			touchTime++;
			stipulate2 = 1;
			return;
			}	
	 else if(0<touchY && touchY < arrY / 568 *canvas.height)			        
			{
			 touchTime++;
			 stipulate3 = 1;
			 return;
			}	
	 }else {
			stipulate1 = 0;
		    stipulate2 = 0;
			stipulate3 = 0;
	       }	
}
function dealThrow(){
	var _this=this;
	var touchX,touchY;
	if(gameMonitor.isMobile()){
		touchX=event.changedTouches[0].clientX;
		touchY=event.changedTouches[0].clientY;
		}else{
			touchX=event.offsetX;
			touchY=event.offsetY;
			}
	var arrX=0;
	var arrY=0;
	    if (arrX / 320 * canvas.width<touchX  && touchX <arrX / 320 * canvas.width + 320 / 320 * canvas.width)
		{ 
		   if(arrY / 568 *canvas.height<touchY && touchY < arrY / 568 *canvas.height + 450/ 568 *canvas.height)
			{
			 move1State=1;			 			 
			 }
		}		
}
function dealOpenUrl(){    	
	var _this=this;
	var touchX,touchY;
	if(gameMonitor.isMobile()){
	   touchX=event.changedTouches[0].clientX;
	   touchY=event.changedTouches[0].clientY;
	   }else{
			 touchX=event.offsetX;
			 touchY=event.offsetY;
			 }
    
	var arrX = 10;
	var arrY = 350;
		
	if (touchX < arrX / 320 * canvas.width || touchX > arrX / 320 * canvas.width + 62 / 320 * canvas.width)
		{
			restartFlag = 1;
			return;
		}
	if (touchY < arrY / 568 *canvas.height || touchY > arrY / 568 *canvas.height + 28 / 568 *canvas.height)
		{
			restartFlag = 1;
			return;
	}else{
			restartFlag = 0;
			}	
	}
function move(){
	var x1=0.36*screenWidth;
	var x2=0.58*screenWidth;
	var y1=0.78*screenHeight;
	var y2=0.72*screenHeight+52*random;	
    if(X<0||X>canvas.width||Y<0||Y>canvas.height){
	    delayTime++;
		if(delayTime>30){				 
           resetMove();
		 } 
      }
    if(move1State==1){ 
       arrTime++;
	   //53
       if(moveState==0&&arrTime<55){
	      move1();
	      rotateState=1;
	      if(arrTime>40){
			 if(paperIn==0){
			    calculateScore();
			  }
			 if(paperIn==1){
		     //ok	
		        delayTime++;
				trashState=1;
			    paperState=1;                
			    if(delayTime>10){				 
                   resetMove();
				} 
		      }	
		  }
		 }	   
          else if(arrTime>=55){
		     moveState=1;
	   	     collideTime++; 
		     collideMove();	 
	         if(collideTime>30){
		        resetMove();
			  }				 
           } 
	   }
	 	
} 		 
function move1(){
	var y=arrY[arrTime];       
    X=screenX+speedX*arrTime;
    Y=screenY+y;	
    Width*=0.98;
    Height*=0.97;		
}
function calculateScore(){  
    var x1=random*0.784*screenWidth;
    var y1=0.67*screenHeight;//0.64
	var y2=0.69*screenHeight;      		
    if(x1+25<X&&X<x1+75){
       if(y1<Y&&Y<y2){
	      score++;
		  paperIn=1;		 		  
		}
    }
       
	  
	
}
function collideMove(){	
    var y1=0.721*screenHeight;
	var G=0.5;
    var V1=4;
    var V2=-3;	
	X=screenX+speedX*45+V1;
	V2+=G;
	Y = y1+V2;
    Width=24;
	Height=24;		
}
function showDemo(){
	var _this=this;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameMonitor.bg1,0,0,canvas.width,canvas.height);
	DrawImage568(gameMonitor.bt, 10, 350, 300, 100);	
	DrawImage568(gameMonitor.guizebtn, 80, 450, 160, 38);	
	DrawImage568(gameMonitor.ksbtn, 80, 488, 160, 58);
	
	if( touchTime < 30 && stipulate1 == 1){
	   DrawImage568(gameMonitor.guize, 50, 75, 220, 418);
	   if(stipulate3 == 1){
		 stipulate1 = 0;
		 stipulate2 = 0;
	     stipulate3 = 0;
		 if(stipulate1==0&&stipulate2==0&&stipulate3==0)
	     {
	      DrawImage568(gameMonitor.bt, 10, 350, 300, 100);	
	      DrawImage568(gameMonitor.guizebtn, 80, 450, 160, 38);	
	      DrawImage568(gameMonitor.ksbtn, 80, 488, 160, 58);
	     }
	    }

    }else if( touchTime < 30 && stipulate2 == 1){
	           flow++; 
      }	

}
function showGame(){
	time++;
	if(time>=60){
	   time=0;
	   leftTime--;
	  }
	if(leftTime<0){
	   leftTime=0;
	   resetMove();
	   flow++;
	  }	
	rotateState=0;  
	paint();
	showTime(ctx,leftTime);
	showScore(ctx,score);
	move();
	
	}
function showTime(ctx,time){
	DrawImage568(gameMonitor.leftTime, 2, 2, 90, 30);
	DrawImageShear568(ctx,gameMonitor.fenshu,  20 * parseInt(time / 10), 0, 20, 30, 1+ 70 + 20, 2, 20, 30);
	DrawImageShear568(ctx, gameMonitor.fenshu,20 * (time % 10), 0, 20, 30, 1+ 70 + 20 * 2, 2, 20, 30);
	DrawImage568(gameMonitor.seconds, 130, 2, 20, 30);
}
function showScore(){
	var _this = this;
	var cur = 1;
	DrawImage568(gameMonitor.toujin, 200 , 2, 60, 30);	
	DrawImageShear568(ctx,gameMonitor.fenshu,  20 * (score % 10), 0, 20, 30, 240 + 20 * 2, 2, 20, 30);
	DrawImageShear568(ctx, gameMonitor.fenshu,20 * parseInt(score / 10), 0, 20, 30,240 + 20 * 1, 2, 20, 30);
	DrawImage568(gameMonitor.ci, 300, 2, 20, 30);
}
function showOver(){
	ctx.clearRect(0, 0, screenWidth, screenHeight);
	DrawImage568(gameMonitor.bg1, 0, 0, screenWidth, screenHeight)
	DrawImage568(gameMonitor.bt, 10, 350, 300, 100);	
	openUrl();	
	}
if(!gameMonitor.isMobile()){
	gameMonitor.eventType.start = 'mousedown';
	gameMonitor.eventType.move = 'mousemove';
	gameMonitor.eventType.end = 'mouseup';
	
}
gameMonitor.init();
