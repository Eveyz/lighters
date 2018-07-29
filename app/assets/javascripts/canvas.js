function init(id) {
  
  var canvas = document.getElementById(id);
  var ctx = canvas.getContext("2d");
  var color = $(".canvas-color-palette.active").css('backgroundColor');
  tool = new tool_pencil(ctx, color);

	canvas.addEventListener('mousedown', ev_canvas, false);
	canvas.addEventListener('mousemove', ev_canvas, false);
	canvas.addEventListener('mouseup',	 ev_canvas, false);
}

function tool_pencil(context, color) {
	var tool = this;
	this.started = false;

	this.mousedown = function(ev) {
    context.beginPath();
    context.moveTo(ev._x, ev._y);
    tool.started = true;
  };
  
	this.mousemove = function(ev) {
		if (tool.started) {
			context.lineTo(ev._x, ev._y);
      context.stroke();
      context.strokeStyle = color;
		}
	};

	this.mouseup = function(ev) {
		if (tool.started) {
			tool.mousemove(ev);
			tool.started = false;
		}
	};
}

function ev_canvas(ev) {
	// Firefox
	if (ev.layerX || ev.layerX == 0) {
		ev._x = ev.layerX;
		ev._y = ev.layerY;
	// Opera
	} else if (ev.offsetX || ev.offsetX == 0) {
		ev._x = ev.offsetX;
		ev._y = ev.offsetY;
	}

	var func = tool[ev.type];
	if (func) {
		func(ev);
	}
}

function saveCanvas() {
  var canvas = document.getElementById("back_img");
  var canvasContents = canvas.toDataURL(); // a data URL of the current canvas image
  var data = { image: canvasContents, date: Date.now() };
  var string = JSON.stringify(data);
  console.log(string);
}