let words = [
  "Document",
  "Game",
  "Script",
  "Value",
  "School",
  "Fun",
  "Facebook",
  "Run",
  "Google",
  "Documentation",
  "Play",
  "Teacher",
  "Turkey",
  "Door",
  "Work",
  "Future",
  "Boost",
  "Home",
  "Garden",
  "Anime",
];
let lvls = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
};
let textinput = document.querySelector("input");
let myleftSec = document.querySelector(".time-left");
//set values of header on load
window.onload = () => {
  document.querySelector(".lvl").textContent =
    Object.keys(lvls)[document.querySelector("#select").value];
  document.querySelector(".sec").textContent =
    Object.values(lvls)[document.querySelector("#select").value];
};
myleftSec.textContent =
  Object.values(lvls)[document.querySelector("#select").value];
//set values of header on select
document.querySelector("#select").onchange = () => {
  document.querySelector(".lvl").textContent =
    Object.keys(lvls)[document.querySelector("#select").value];
  document.querySelector(".sec").textContent =
    Object.values(lvls)[document.querySelector("#select").value];
  myleftSec.textContent =
    Object.values(lvls)[document.querySelector("#select").value];
};
//pick random word function
function pickRandom(arr) {
  let myArr = [];
  let y = arr.map((e) => e);
  for (let i = 0; i < 5; i++) {
    let x = Math.floor(Math.random() * y.length);
    myArr.push(y[x]);
    y.splice(x, 1);
  }
  return myArr;
}
pickRandom(words);
//Timer effect function & focus input field
function counter() {
  let i = 3;
  let num = document.createElement("span");
  num.className = "counter";
  function myFunction() {
    document.querySelector(".counter")
      ? document.querySelector(".counter").remove()
      : true;
    num.textContent = "";
    num.append(i);
    document.body.appendChild(num);
    i--;
    if (i < 0) {
      clearInterval(x);
      document.querySelector(".counter").remove();
      document.querySelector(".input").focus();
    }
  }
  myFunction();
  let x = setInterval(myFunction, 1000);
}
//Call timer effect function on click & focus input field
document.querySelector(".button").onclick = (e) => {
  let mycounter = 0;
  document.querySelector(".my-score").textContent = mycounter;
  if (document.querySelector("#finish")) {
    document.querySelector("#finish").remove();
  }
  counter();
  setTimeout(() => {
    addWords();
    pickFromWords();
    secLeft();
    document.querySelector("#select").style.display = "none";
    document.querySelector(".top-massage").style.display = "none";
    e.target.style.display = "none";

    let myInt = setInterval(() => {
      if (
        document.querySelector(".word").textContent.toLocaleLowerCase() !=
        textinput.value.toLocaleLowerCase()
      ) {
        clearInterval(myInt);
        document.querySelector(".word").textContent = "";
        document.querySelector(".pre-words").textContent =
          "Words will show here";
        textinput.value = "";
        let finish = document.createElement("div");
        finish.setAttribute("id", "finish");
        document.body.appendChild(finish);
        document.querySelector("#finish").append("Game Over");
        document.querySelector("#finish").className = "failed";
        document.querySelector(".input").blur();
        document.querySelector("#select").style.display = "block";
        document.querySelector(".top-massage").style.display = "block";
        e.target.style.display = "block";
      } else {
        mycounter++;
        document.querySelector(".my-score").textContent = mycounter;
        textinput.value = "";
        pickFromWords();
        secLeft();
        if (document.querySelectorAll(".pre-words div").length == 0) {
          setTimeout(() => {
            document.querySelector("#select").style.display = "block";
            document.querySelector(".top-massage").style.display = "block";
            e.target.style.display = "block";
            if (
              document.querySelector(".word").textContent.toLocaleLowerCase() ==
              textinput.value.toLocaleLowerCase()
            ) {
              mycounter++;
              document.querySelector(".my-score").textContent = mycounter;
              let finish = document.createElement("div");
              finish.setAttribute("id", "finish");
              document.body.appendChild(finish);
              document.querySelector("#finish").append("Good Job");
              document.querySelector("#finish").className = "done";
              document.querySelector(".input").blur();
            }
            document.querySelector(".word").textContent = "";
            textinput.value = "";
          }, Object.values(lvls)[document.querySelector("#select").value] * 1000);
          clearInterval(myInt);
          document.querySelector(".pre-words").textContent =
            "Words will show here";
        }
      }
    }, Object.values(lvls)[document.querySelector("#select").value] * 1000);
  }, 3000);
};
//Add words to pre-words field
function addWords() {
  document.querySelector(".pre-words").textContent = "";
  let myWords = pickRandom(words);
  myWords.forEach((ele) => {
    let myDiv = document.createElement("div");
    myDiv.append(ele);
    document.querySelector(".pre-words").appendChild(myDiv);
  });
}
// function to add words that will be written
function pickFromWords() {
  let myWords = document.querySelectorAll(".pre-words div");
  document.querySelector(".word").textContent = "";
  document.querySelector(".word").append(myWords[0].textContent);
  myWords[0].remove();
}
//function to type seconds left
function secLeft() {
  let count = 0;
  let b = setInterval(() => {
    count++;
    let i = Object.values(lvls)[document.querySelector("#select").value];
    i -= count;
    myleftSec.textContent = i;
    if (i <= 0) {
      clearInterval(b);
    }
  }, 1000);
}
