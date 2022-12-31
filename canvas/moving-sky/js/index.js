const getRandomValue = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const radius = 0.8;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// make canvas size equal to window size
function resizeCanvas() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
}

function Moon(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = new Image();

    this.draw = function () {
        this.img.onload = function () {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        };
        this.img.src =
            "https://i.pinimg.com/originals/a1/01/e2/a101e22fc458c1110d418ee309f240c8.png";
    };

    this.update = function () {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
}

function Star(x, y) {
    this.x = x;
    this.y = y;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    };

    this.update = function () {
        this.x = this.x <= 0 ? canvas.width : this.x - 0.2;
        this.y = this.y >= canvas.height ? 0 : this.y + 0.08;
        this.draw();
    };
}

let moon = null;
let stars = [];

// initializing function
function init() {
    ctx.fillStyle = "#faf9b6";
    ctx.shadowColor = "#fcfcfa";
    ctx.shadowBlur = 10;

    moon = new Moon(
        (canvas.width * 3) / 4,
        canvas.height / 5,
        canvas.width / 10,
        canvas.width / 10
    );
    moon.draw();

    stars = [];
    for (let i = 0; i < 400; i++) {
        const x = getRandomValue(0, innerWidth);
        const y = getRandomValue(0, innerHeight);
        stars.push(new Star(x, y));
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((ball) => ball.update());
    moon.update();
}

resizeCanvas();
init();
animate();

addEventListener("resize", () => {
    resizeCanvas();
    init();
});

addEventListener("click", function (event) {
    init();
});
