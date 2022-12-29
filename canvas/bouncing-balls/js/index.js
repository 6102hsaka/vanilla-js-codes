const colors = [
    "#10454F",
    "#506266",
    "#818274",
    "#A3AB78",
    "#BDE038",
    "#2C3532",
    "#0F6466",
    "#D8B08C",
    "#FFCB9A",
    "#D2E8E3",
];

const getRandomValue = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const friction = 0.8;
const gravity = 0.5;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#53565b";

// make canvas size equal to window size
function resizeCanvas() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
}

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    };
    this.update = function () {
        if (this.y + this.radius + this.dy >= innerHeight) {
            this.dy *= -friction;
        } else {
            this.dy += gravity;
        }
        this.y += this.dy;
        this.x += this.dx;
        this.draw();
    };
}

let balls = [];

// initializing function
function init() {
    balls = [];

    for (let i = 0; i < 200; i++) {
        const x = getRandomValue(10, innerWidth - 10);
        const y = getRandomValue(0, innerHeight / 3);
        const radius = getRandomValue(10, 20);
        const dx = getRandomValue(-1, 1);
        const dy = getRandomValue(1, 10);
        const color = getRandomColor();
        balls.push(new Ball(x, y, dx, dy, radius, color));
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => ball.update());
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
