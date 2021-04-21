import React from "react";
import io from "socket.io-client";

import "./style.css";

class Board extends React.Component {
  timeout;
  socket = io.connect("http://localhost:4000");

  ctx;
  isDrawing = false;

  constructor(props) {
    super(props);

    this.socket.on("canvas-data", function (data) {
      var url =
        "https://cloud.githubusercontent.com/assets/4652816/12771961/5341c3c4-ca68-11e5-844c-f659831d9c00.jpg";
      var canvasImage = document.querySelector("#canvasImage");
      var ctx = canvasImage.getContext("2d");
      var img = new Image();
      img.src = url;
      img.onload = function () {
        var width = Math.min(500, img.width);
        var height = img.height * (width / img.width);
        // var height = "200px";
        // var width = "200px";

        canvasImage.width = width;
        canvasImage.height = height;
        ctx.drawImage(img, 0, 0, width, height);
      };
      var isPress = false;
      var old = null;
      canvasImage.addEventListener("mousedown", function (e) {
        isPress = true;
        old = { x: e.offsetX, y: e.offsetY };
      });
      canvasImage.addEventListener("mousemove", function (e) {
        if (isPress) {
          var x = e.offsetX;
          var y = e.offsetY;
          ctx.globalCompositeOperation = "destination-out";

          ctx.beginPath();
          ctx.arc(x, y, 10, 0, 2 * Math.PI);
          ctx.fill();

          ctx.lineWidth = 20;
          ctx.beginPath();
          ctx.moveTo(old.x, old.y);
          ctx.lineTo(x, y);
          ctx.stroke();

          old = { x: x, y: y };
        }
      });
      canvasImage.addEventListener("mouseup", function (e) {
        isPress = false;
      });
      /******************************************** */
      var root = this;
      var interval = setInterval(function () {
        if (root.isDrawing) return;
        root.isDrawing = true;
        clearInterval(interval);
        var image = new Image();
        var canvas = document.querySelector("#board");
        var ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);

          root.isDrawing = false;
        };
        image.src = data;
      }, 200);
    });
  }

  componentDidMount() {
    this.drawOnCanvas();
  }

  componentWillReceiveProps(newProps) {
    this.ctx.strokeStyle = newProps.color;
    this.ctx.lineWidth = newProps.size;
  }

  drawOnCanvas() {
    var canvas = document.querySelector("#board");
    this.ctx = canvas.getContext("2d");
    var ctx = this.ctx;

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = this.props.size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = this.props.color;

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    var root = this;
    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (root.timeout != undefined) clearTimeout(root.timeout);
      root.timeout = setTimeout(function () {
        var base64ImageData = canvas.toDataURL("image/png");
        root.socket.emit("canvas-data", base64ImageData);
      }, 1000);
    };
  }

  render() {
    return (
      <div class="sketch" id="sketch">
        <canvas className="board" id="board"></canvas>
        {/* <canvas className="box" id="canvasImage"></canvas> */}
        <input type="button" v />
      </div>
    );
  }
}

export default Board;
