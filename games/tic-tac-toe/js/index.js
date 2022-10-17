(function () {
    let player = "X";
    let cells = document.querySelectorAll(".grid-item");
    let isGameActive = true;

    const currentPlayerMessage = () => `${player}'s turn`;
    const winMessage = () => `${player} won`;
    const drawMessage = () => `Draw!!`;

    const statusElement = document.querySelector(".status");
    statusElement.innerHTML = currentPlayerMessage();

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const matchCompleted = () => {
        //check for win condition
        const matchWon = winConditions.reduce((acc, cur) => {
            if (
                !!cells[cur[0]].innerHTML &&
                cells[cur[0]].innerHTML === cells[cur[1]].innerHTML &&
                cells[cur[1]].innerHTML === cells[cur[2]].innerHTML
            ) {
                isGameActive = false;
                statusElement.innerHTML = winMessage();
                cur.forEach((el) => cells[el].classList.add("won"));
                return true;
            }
            return acc;
        }, false);

        if (!matchWon) {
            // check for draw condition
            const matchDraw = Array.from(cells).reduce(
                (acc, cur) => acc && !!cur.innerHTML,
                true
            );
            if (matchDraw) {
                cells.forEach((element) => element.classList.add("draw"));
                statusElement.innerHTML = drawMessage();
            }
            return matchDraw;
        }
        return true;
    };

    // clicking cell
    document
        .querySelector(".grid-container")
        .addEventListener("click", ({ target }) => {
            if (!target.innerHTML && isGameActive) {
                target.innerHTML = player;
                if (!matchCompleted()) {
                    player = player === "X" ? "O" : "X";
                    statusElement.innerHTML = currentPlayerMessage();
                }
            }
        });

    // resetting cell
    document.querySelector(".reset-btn").addEventListener("click", () => {
        player = "X";
        isGameActive = true;

        cells.forEach((element) => {
            element.innerHTML = "";
            element.classList.remove("won", "draw");
        });
        statusElement.innerHTML = currentPlayerMessage();
    });
})();
