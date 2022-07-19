function ready() {
  var element1 = document.getElementById("train");
  element1.classList.add("posH");
}
document.addEventListener("DOMContentLoaded", ready);

function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);

  console.log('The original line: "' + stringToSplit + '"');
  console.log('Separator: "' + separator + '"');
  console.log(
    "The array contains " +
      arrayOfStrings.length +
      " elements: " +
      arrayOfStrings.join(" / ")
  );
}

var comma = ",";

var pos = 750;
var hor = 400;

class Computer {
  constructor() {
    console.log("Computer created");
  }

  right() {
    var elem = document.getElementById("train");
    var el2 = document.getElementById("el2");
    var el3 = document.getElementById("el3");
    train.offsetBottom = train.offsetTop + train.offsetHeight;
    train.offsetRight = train.offsetLeft + train.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;
    el3.offsetBottom = el3.offsetTop + el3.offsetHeight;
    el3.offsetRight = el3.offsetLeft + el3.offsetWidth;

    if (
      train.offsetBottom < el2.offsetTop ||
      train.offsetTop > el2.offsetBottom ||
      train.offsetRight + 100 < el2.offsetLeft ||
      train.offsetLeft > el2.offsetRight
    ) {
      var top = pos + 100;
      var id = setInterval(frame, 5);
      function frame() {
        if (pos == top) {
          clearInterval(id);
        } else {
          pos++;
          elem.style.left = pos + "px";
        }
      }
    } else {
      alert("Something's in the way.");
    }

    if (
      !(
        train.offsetBottom < el3.offsetTop ||
        train.offsetTop > el3.offsetBottom ||
        train.offsetRight + 100 < el3.offsetLeft ||
        train.offsetLeft > el3.offsetRight
      )
    ) {
      document.getElementById("el3").hidden = true;
      alert("You win");
    }
  }

  down() {
    var elem = document.getElementById("train");
    train.offsetBottom = train.offsetTop + train.offsetHeight;
    train.offsetRight = train.offsetLeft + train.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;
    el3.offsetBottom = el3.offsetTop + el3.offsetHeight;
    el3.offsetRight = el3.offsetLeft + el3.offsetWidth;

    if (
      train.offsetBottom + 100 < el2.offsetTop ||
      train.offsetTop > el2.offsetBottom ||
      train.offsetRight < el2.offsetLeft ||
      train.offsetLeft > el2.offsetRight
    ) {
      var top = hor + 100;
      var id = setInterval(frame, 5);
      function frame() {
        if (hor == top) {
          clearInterval(id);
        } else {
          hor++;
          elem.style.top = hor + "px";
        }
      }
    } else {
      alert("Something's in the way.");
    }

    if (
      !(
        train.offsetBottom + 100 < el3.offsetTop ||
        train.offsetTop > el3.offsetBottom ||
        train.offsetRight < el3.offsetLeft ||
        train.offsetLeft > el3.offsetRight
      )
    ) {
      document.getElementById("el3").hidden = true;
      alert("You win");
    }
  }

  up() {
    var elem = document.getElementById("train");
    train.offsetBottom = train.offsetTop + train.offsetHeight;
    train.offsetRight = train.offsetLeft + train.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;
    el3.offsetBottom = el3.offsetTop + el3.offsetHeight;
    el3.offsetRight = el3.offsetLeft + el3.offsetWidth;

    if (
      train.offsetBottom < el2.offsetTop ||
      train.offsetTop - 100 > el2.offsetBottom ||
      train.offsetRight < el2.offsetLeft ||
      train.offsetLeft > el2.offsetRight
    ) {
      var top = hor - 100;
      var id = setInterval(frame, 5);
      function frame() {
        if (hor == top) {
          clearInterval(id);
        } else {
          hor--;
          elem.style.top = hor + "px";
        }
      }
    } else {
      alert("Something's in the way.");
    }

    if (
      !(
        train.offsetBottom < el3.offsetTop ||
        train.offsetTop - 100 > el3.offsetBottom ||
        train.offsetRight < el3.offsetLeft ||
        train.offsetLeft > el3.offsetRight
      )
    ) {
      document.getElementById("el3").hidden = true;
      alert("You win");
    }
  }

  left() {
    var elem = document.getElementById("train");
    train.offsetBottom = train.offsetTop + train.offsetHeight;
    train.offsetRight = train.offsetLeft + train.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;
    el3.offsetBottom = el3.offsetTop + el3.offsetHeight;
    el3.offsetRight = el3.offsetLeft + el3.offsetWidth;

    if (
      train.offsetBottom < el2.offsetTop ||
      train.offsetTop > el2.offsetBottom ||
      train.offsetRight < el2.offsetLeft ||
      train.offsetLeft > el2.offsetRight + 100
    ) {
      var top = pos - 100;
      var id = setInterval(frame, 5);
      function frame() {
        if (pos == top) {
          clearInterval(id);
        } else {
          pos--;
          elem.style.left = pos + "px";
        }
      }
    } else {
      alert("Something's in the way.");
    }

    if (
      !(
        train.offsetBottom + 100 < el3.offsetTop ||
        train.offsetTop > el3.offsetBottom ||
        train.offsetRight < el3.offsetLeft ||
        train.offsetLeft > el3.offsetRight
      )
    ) {
      document.getElementById("el3").hidden = true;
      alert("You win");
    }
  }
}

class Invoker {
  constructor() {
    console.log("Invoker created");
  }

  SetCommand(...command) {
    this.commands = command;
  }
  Execute() {
    for (let command of this.commands) {
      command();
    }
  }
}

let invoker = new Invoker();
let receiver = new Computer();

document.querySelector("#submit").onclick = function () {
  var a = document.getElementById("key").value;
  let qwe = a.split(" ").join("");
  console.log("qwe", qwe);
  let r = qwe.split(",");
  console.log("r", r);

  splitString(a, comma);

  function showTime() {
    r.forEach(function (i) {
      switch (i) {
        case "invoker.SetCommand(receiver.right)":
          invoker.SetCommand(receiver.right);
          invoker.Execute();
          break;
        case "invoker.SetCommand(receiver.down)":
          invoker.SetCommand(receiver.down);
          invoker.Execute();
          break;
        case "invoker.SetCommand(receiver.left)":
          invoker.SetCommand(receiver.left);
          invoker.Execute();
          break;
        case "invoker.SetCommand(receiver.up)":
          invoker.SetCommand(receiver.up);
          invoker.Execute();
          break;
      }
    });
  }
  showTime();
};
