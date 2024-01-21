const msgEl = document.querySelector(".msg");
const hangmanEl = document.querySelector(".hangman");
const drawEl = document.querySelector(".draw");
const letters = document.querySelector(".letters");
const hint = document.querySelector("header .hint span");
const letterGuess = document.querySelector(".letter_guess");
const succesAudios = document.querySelector('#success');
const failAudios = document.querySelector('#fail');

// console.log(succesAudios, failAudios);

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

alphabet.forEach((letter) => {
  const spanEl = document.createElement("span");
  spanEl.innerText = letter;
  spanEl.className = "letter";

  letters.appendChild(spanEl);
});

const allKeys = Object.keys(words);
const randomkeys = Math.floor(Math.random() * allKeys.length);
// console.log(randomkeys);
const randomName = allKeys[randomkeys];
// console.log(randomName);
const randomValue = Math.floor(Math.random() * words[randomName].length);
const wordGuess = words[randomName][randomValue];

hint.innerText = randomName;

console.log(wordGuess);

wordGuess.split("").forEach((el) => {
  // console.log(el);
  const span = document.createElement("span");
  // span.className = 'guess';
  // span.innerText = el.toUpperCase();
  if (el == " ") {
    span.className = "empty_span";
  }

  letterGuess.appendChild(span);
});

const allLetters = document.querySelectorAll(".letter");
const allSpanGuesses = document.querySelectorAll(".letter_guess span");
let wrongLetter = 0;
// let countCorrectLetter = 0;
const choosenWord = [];

document.addEventListener("click", (e) => {
  let state = false;
  if (e.target.className === "letter") {
    e.target.classList.add("clicked");
    let clickedLetter = e.target.innerText.toLowerCase();
    let wordGuessArr = Array.from(wordGuess.toLowerCase());
    // console.log(wordGuess.split(''));
    // console.log(wordGuessArr);
    wordGuessArr.forEach((letter, indexLetter) => {
      if (letter == clickedLetter) {
        state = true;
        allSpanGuesses[indexLetter].innerText = clickedLetter.toUpperCase();
        choosenWord.push(letter);

        // allSpanGuesses[indexLetter].classList.add("correct");
        // allSpanGuesses.forEach((span, spanIndex) => {
        //   console.log(indexLetter + " => " + spanIndex);
        //   if (indexLetter === spanIndex) {
        //     span.innerHTML = clickedLetter.toUpperCase();
        //     span.classList.add("correct");
        //   }
        // });
      }
    });

    console.log(state);

    if (!state) {
      wrongLetter++;
      failAudios.play();
      //    console.log(wrongLetter);
      hangmanEl.classList.add(`wrong-${wrongLetter}`);
      if (wrongLetter === 5) {
        youLose();
      }
    } else {
      //   countCorrectLetter++;
      //   let correctLetter = document.querySelectorAll(".correct");
      // console.log(correctLetter.length, wordGuess.length);
      succesAudios.play();
      let CorrectWordFiltred = wordGuessArr.filter((el) => {
        return el != " ";
      });
      //   console.log(choosenWord, CorrectWordFiltred);
      if (choosenWord.length == CorrectWordFiltred.length) {
        youWin();
      }
    }
  }
});

function youWin() {
  const popupEl = document.createElement("div");
  popupEl.classList.add("popup");
  popupEl.innerHTML = `<div>
                          <i class="fa-solid fa-xmark close"></i>
                          <p>You Win! The Word Is <br><span>${wordGuess}</span}>
                          <p>tu a fait <span>${wrongLetter}</span> Faute, Ton niveau Est ${
    wrongLetter < 2 ? "Fort" : wrongLetter == 2 ? "Medium" : "faible"
  }</p>
                  </div>`;

  document.body.appendChild(popupEl);

  reloadGame();
}

function youLose() {
  const popupEl = document.createElement("div");
  popupEl.classList.add("popup");
  popupEl.innerHTML = `<div>
                          <i class="fa-solid fa-xmark close"></i>
                          <p>You Lose! The Word Is <br><span>${wordGuess}</span}>
                  </div>`;

  document.body.appendChild(popupEl);

  reloadGame();
}

function reloadGame() {
  const btnClose = document.querySelector(".close");
  btnClose.addEventListener("click", () => {
    btnClose.parentElement.parentElement.remove();

    document.querySelectorAll(".letters span").forEach((el) => {
      el.classList.remove("clicked");
    });

    document.querySelectorAll(".letter_guess span").forEach((el) => {
      el.innerText = "";
    });

    wrongLetter = 0;
    hangmanEl.className = "hangman";
  });
}
