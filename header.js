var canvas  = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;
var data = ["PASCHÄ", "MMS_2022","PASCHÄ", "📸", "🎥", "🎞" ,"MMS_2022","PASCHÄ","PASCHÄ", "📼", "🎙"];
var rang = 0.7;
var targets = [];
var zoomSpeed = 5;
var fontSizeMax = 128;
var deep = 800;
var lineHeight = 1.5;
var textAlign = "center";
var fontFamily = "Ubuntu Mono";
var useAlpha = true;
var alpha = 1.0;
var FPS = 60;

function point(x, y, z, a){
	this.x = x;
	this.y = y;
	this.z = z;
	this.a = a;
	return this;
}

function init(){
	W = canvas.width = window.innerWidth;
	H = canvas.height = window.innerHeight;
	targets = [];
	for(var i=0; i<data.length; i++){
		targets.push(new point(
			( W * Math.random() * rang + W * (1-rang)/2),
			( H * Math.random() * rang + H * (1-rang)/2),
			deep * Math.random(),
			zoomSpeed * Math.random()
		));
		data[i] = data[i].split("\n");
	}
}
init();
function reset(){
	W = canvas.width = window.innerWidth;
	H = canvas.height = window.innerHeight;
	targets = [];
	for(var i=0; i<data.length; i++){
		targets.push(new point(
			( W * Math.random() * rang + W * (1-rang)/2),
			( H * Math.random() * rang + H * (1-rang)/2),
			deep * Math.random(),
			zoomSpeed * Math.random()
		));
	}
}
function zoomOut(){
	for(var i=0; i<targets.length; i++){
		if(targets[i].z>0){
			targets[i].z -= targets[i].a;
		}else{
			targets[i].x = ( W * Math.random() * rang + W*(1-rang)/2);
			targets[i].y = ( H * Math.random() * rang + H*(1-rang)/2);
			targets[i].z = deep;
		}
	}
}
function zoomIn(){
	for(var i=0; i<targets.length; i++){
		if(targets[i].z <= deep){
			targets[i].z += targets[i].a;
		}else{
			targets[i].x = ( W * Math.random() * rang + W * (1-rang)/2);
			targets[i].y = ( H * Math.random() * rang + H * (1-rang)/2);
			targets[i].z = 0;
		}
	}
}
function update(){
	zoomIn();
	// zoomOut();
}

function clear(){
	ctx.clearRect(0, 0, W, H);
}

function draw(){
	clear();
	for(var i=0; i<targets.length; i++){
		var color    = targets[i].y%360;
		var fontSize = fontSizeMax * (targets[i].z/deep);
		fontSize = fontSize <=16 ? 16 : fontSize;
		alpha    = useAlpha ? targets[i].z/deep : alpha;


		ctx.textAlign   = textAlign;
		ctx.fillStyle   = "HSLA(" + color + ", 100%, 50%, "+ alpha +")";
		ctx.font = fontSize +"px " +fontFamily;
		if(typeof data[i]=='object'){
			var rectW = ctx.measureText(data[i].length).width;
			var rectH = ctx.measureText(data[i].length).height * data[i].length;
			ctx.fillRect(targets[i].x - rectW/2 , targets[i].y - rectH/2,targets[i].x + rectW/2 ,targets[i].y + rectH/2);
			for(var j=0; j<data[i].length; j++){
				ctx.fillText(data[i][j], targets[i].x, targets[i].y + fontSize * j * lineHeight);
			}
		}else{
			ctx.fillText(data[i], targets[i].x, targets[i].y);
		}
	}

}

window.addEventListener("resize",function (){
	reset();
});

function Animat(){
	draw();
	update();
	window.setTimeout(Animat,1000/FPS);
}

Animat();
