let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2,5,8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            box.classList.add("o");
            box.classList.remove("x");
            turn0 = false;
        } else {
            box.innerText = "X";
            box.classList.add("x");
            box.classList.remove("o");
            turn0 = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
        checkDraw();
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o", "x");
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }
};

const checkDraw = () => {
    if (count === 9) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
