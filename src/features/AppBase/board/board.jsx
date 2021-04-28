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
    var startingX = 0;

    var recentWordsTab = [];
    var undoLst = [];

    function undo() {
      undoLst.pop();
      var imgData = undoLst[undoLst.length - 1];
      var image = new Image();
      image.src = imgData;
      image.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          image,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
      };
    }

    function saveState() {
      undoLst.push(canvas.toDataURL());
    }
    saveState();
    /* Mouse Capturing Work */
    canvas.addEventListener(
      "click",
      function (e) {
        mouse.x = e.pageX - canvas.offsetLeft;
        mouse.y = e.pageY - canvas.offsetTop;
        startingX = mouse.x;
        //restart
        recentWordsTab = [];
        return false;
      },
      false
    );

    //add keydwon event  to document

    document.addEventListener(
      "keydown",
      function (e) {
        ctx.font = "50px Arial ";
        if (e.keyCode === 8) {
          //backspace
          undo();
          //remove
          var recentWord = recentWordsTab[recentWordsTab.length - 1];
          mouse.x -= ctx.measureText(recentWord).width;
          recentWordsTab.pop();
        } else if (e.keyCode === 13) {
          // enter key presed
          mouse.x = startingX;
          mouse.y += 54;
        } else {
          ctx.fillText(e.key, mouse.x, mouse.y);

          //move cursor
          mouse.x += ctx.measureText(e.key).width;
          saveState();
          recentWordsTab.push(e.key);
        }
      },
      false
    );

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

    /*********************image section */
    const reader = new FileReader();
    const img = new Image();
    const uploadImage = (e) => {
      reader.onload = () => {
        img.onload = () => {
          // canvas.width = img.width - 200;
          img.width = canvas.width - 500;
          img.height = canvas.height - 700;

          // canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    };
    const imageLoader = document.getElementById("uploader");
    imageLoader.addEventListener("change", uploadImage);
    function download() {
      const image = canvas.toDataURL();
      const link = document.createElement("a");
      link.href = image;
      link.download = "image.png";
      link.click();
    }
    document.querySelector("button").addEventListener("click", download);
  }

  render() {
    return (
      <div class="sketch" id="sketch">
        <canvas className="board" id="board"></canvas>{" "}
        <label for="uploader">Select file:</label>
        <input type="file" id="uploader" />
        <button>Download</button>
      </div>
    );
  }
}

export default Board;
