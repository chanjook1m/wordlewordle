let index = 0;
let attempts = 0;
let answer = "APPLE";
let timer = null;

function appStart() {
  const displayGameOver = () => {
    const gameOver = document.createElement("div");
    gameOver.classList.add("game-over");
    gameOver.innerText = "Game Over";
    gameOver.style =
      "display: flex; justify-content: center; align-items: center; font-size: 2rem; font-weight: bold; color: red; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);";
    document.body.appendChild(gameOver);
  };

  const nextLine = () => {
    if (attempts === 5) {
      gameOver();

      return;
    }
    attempts++;
    index = 0;
  };

  const showAnswerOnKeyboard = () => {
    for (let i = 0; i < answer.length; i++) {
      const keyBlock = document.querySelector(
        `.kb-block[data-key='${answer[i]}']`
      );
      keyBlock.style.backgroundColor = "#6AAA64";
    }
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
    clearInterval(timer);
    showAnswerOnKeyboard();
  };

  const handleEnterKey = () => {
    let correct = 0;
    for (let i = 0; i < 5; i++) {
      const curBlock = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const curBlockValue = curBlock.innerText;
      const answerValue = answer[i];

      if (curBlockValue === answerValue) {
        curBlock.style.backgroundColor = "#6AAA64";
        correct++;
      } else if (answer.includes(curBlockValue)) {
        curBlock.style.backgroundColor = "#C9B458";
      } else {
        curBlock.style.backgroundColor = "#787C7E";
      }

      curBlock.style.color = "white";
    }
    if (correct === 5) {
      gameOver();

      return;
    }
    nextLine();
  };

  const handleBackspace = () => {
    if (index !== 0) {
      const prevBlock = document.querySelector(
        `.board-block[data-index='${attempts}${--index}']`
      );
      prevBlock.innerText = "";
    }
  };

  const handleClick = (event) => {
    const key = event.target.innerText;
    const curBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (key === "DEL") {
      handleBackspace();
      return;
    }

    if (index === 5 && key === "ENTER") {
      handleEnterKey();
      return;
    }

    if (index >= 5) return;

    curBlock.innerText = key.toUpperCase();
    index++;
    const keyBlock = document.querySelector(
      `.kb-block[data-key='${key.toUpperCase()}']`
    );

    const keyframes = [
      { transform: "translateX(0)", opacity: 1 },
      { transform: "translateX(50px)", opacity: 1 },
      { transform: "translateX(0)", opacity: 1 },
    ];
    const options = {
      duration: 1000,
      easing: "linear",
      fill: "forwards",
    };
    keyBlock.animate(keyframes, options);

    return;
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;

    const curBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (key === "Backspace") {
      handleBackspace();
      return;
    }

    if (index === 5 && key === "Enter") {
      handleEnterKey();
      return;
    }

    if (index >= 5) return;

    if (keyCode <= 90 && keyCode >= 65) {
      curBlock.innerText = key.toUpperCase();
      index++;
      const keyBlock = document.querySelector(
        `.kb-block[data-key='${key.toUpperCase()}']`
      );

      const keyframes = [
        { transform: "translateX(0)", opacity: 1 },
        { transform: "translateX(50px)", opacity: 1 },
        { transform: "translateX(0)", opacity: 1 },
      ];
      const options = {
        duration: 1000,
        easing: "linear",
        fill: "forwards",
      };
      keyBlock.animate(keyframes, options);

      return;
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  const keyBlocks = document.querySelectorAll(`.kb-block`);
  keyBlocks.forEach((keyBlock) => {
    keyBlock.addEventListener("click", handleClick);
  });
}

appStart();

function showTime() {
  const year = new Date().getFullYear().toString().padStart(2, "0");
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const date = new Date().getDate().toString().padStart(2, "0");
  const hour = new Date().getHours().toString().padStart(2, "0");
  const min = new Date().getMinutes().toString().padStart(2, "0");
  const sec = new Date().getSeconds().toString().padStart(2, "0");
  document.getElementById(
    "time"
  ).innerHTML = `${year}-${month}-${date} ${hour}:${min}:${sec}`;
  setTimeout(showTime, 1000);
}

const startTime = new Date();
function setTime() {
  const curTime = new Date();
  const diff = new Date(curTime - startTime);
  const min = diff.getMinutes().toString().padStart(2, "0");
  const sec = diff.getSeconds().toString().padStart(2, "0");
  document.getElementById("time").innerHTML = `${min}:${sec}`;
}

timer = setInterval(setTime, 1000);
