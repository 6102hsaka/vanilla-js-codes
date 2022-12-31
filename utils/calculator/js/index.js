const screen = document.querySelector(".calculator-screen");

const appendToScreen = (char) => {
    if (screen.innerText.includes("\n")) {
        screen.innerText = char;
    } else {
        screen.innerText += char;
    }
};

// numbers
document.querySelector("#btn-0").addEventListener("click", () => {
    appendToScreen("0");
});
document.querySelector("#btn-1").addEventListener("click", () => {
    appendToScreen("1");
});
document.querySelector("#btn-2").addEventListener("click", () => {
    appendToScreen("2");
});
document.querySelector("#btn-3").addEventListener("click", () => {
    appendToScreen("3");
});
document.querySelector("#btn-4").addEventListener("click", () => {
    appendToScreen("4");
});
document.querySelector("#btn-5").addEventListener("click", () => {
    appendToScreen("5");
});
document.querySelector("#btn-6").addEventListener("click", () => {
    appendToScreen("6");
});
document.querySelector("#btn-7").addEventListener("click", () => {
    appendToScreen("7");
});
document.querySelector("#btn-8").addEventListener("click", () => {
    appendToScreen("8");
});
document.querySelector("#btn-9").addEventListener("click", () => {
    appendToScreen("9");
});

// operators
document.querySelector("#btn-add").addEventListener("click", () => {
    appendToScreen("+");
});
document.querySelector("#btn-subtract").addEventListener("click", () => {
    appendToScreen("-");
});
document.querySelector("#btn-multiply").addEventListener("click", () => {
    appendToScreen("*");
});
document.querySelector("#btn-divide").addEventListener("click", () => {
    appendToScreen("/");
});
document.querySelector("#btn-modulo").addEventListener("click", () => {
    appendToScreen("%");
});
document.querySelector("#btn-dot").addEventListener("click", () => {
    appendToScreen(".");
});
document.querySelector("#btn-clear").addEventListener("click", () => {
    screen.innerText = "";
});

document.querySelector("#btn-equal").addEventListener("click", () => {
    try {
        const res = eval(screen.innerText);
        appendToScreen("\n" + res);
    } catch (err) {
        screen.innerText = "Invalid Expression";
    }
});
