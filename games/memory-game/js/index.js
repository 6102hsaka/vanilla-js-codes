(function () {
    const ar = [
        "&#8986;",
        "&#8986;",
        "&#8987;",
        "&#8987;",
        "&#9748;",
        "&#9748;",
        "&#9749;",
        "&#9749;",
        "&#9924;",
        "&#9924;",
        "&#127748;",
        "&#127748;",
    ];
    const n = ar.length;

    let steps = 0;
    let cardMatch = 0;

    const cards = document.querySelectorAll(".card");
    const statusEl = document.querySelector(".status");

    function shuffle() {
        for (let i = 0; i < n; i++) {
            let x = Math.floor(Math.random() * i + n) % (i + 1);
            [ar[i], ar[x]] = [ar[x], ar[i]];
        }
        cards.forEach((card, index) => {
            card.lastElementChild.innerHTML = ar[index];
        });
    }

    window.onload = shuffle;

    const cardLookup = [];

    const showCard = (card) => card.classList.add("flip");
    const hideCard = (card) => card.classList.remove("flip");

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (card.classList.contains("flip")) return;
            steps++;
            showCard(card);
            if (cardLookup.length === 0) {
                cardLookup.push(card);
            } else {
                const previousCard = cardLookup.pop();
                if (previousCard.innerHTML !== card.innerHTML) {
                    setTimeout(() => {
                        hideCard(previousCard);
                        hideCard(card);
                    }, 600);
                } else {
                    cardMatch += 2;
                    if (cardMatch === n) {
                        statusEl.innerHTML = `You finished in ${steps} steps`;
                    }
                }
            }
        });
    });

    document.querySelector(".reset-btn").addEventListener("click", () => {
        steps = 0;
        cardMatch = 0;
        statusEl.innerHTML = ``;
        cards.forEach(hideCard);
        setTimeout(shuffle, 500);
    });
})();
