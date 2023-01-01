let activeIndex = 0;
let timeout = null;

const images = document.querySelectorAll("img");
const circles = document.querySelectorAll(".circle");
const previousBtn = document.querySelector("#btn-previous");
const nextBtn = document.querySelector("#btn-next");

/**
 * Function to update active index of the image to be displayed
 * @param {number} count
 * @param {boolean} isabsolute
 */
function updateActiveIndex(count, isabsolute) {
    images[activeIndex].style.display = "none";
    circles[activeIndex].style.backgroundColor = "transparent";
    if (isabsolute) {
        activeIndex = count;
    } else {
        activeIndex += count;
        activeIndex = (activeIndex + images.length) % images.length;
    }
    images[activeIndex].style.display = "block";
    circles[activeIndex].style.backgroundColor = "#ffffff";
    resetTimeout();
}

/**
 * Function to update timeout whenever active index changes
 */
function resetTimeout() {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
        updateActiveIndex(1);
    }, 1500);
}

// Initialization
(function init() {
    updateActiveIndex(0);
    circles.forEach((circle, index) => {
        circle.addEventListener("click", () => updateActiveIndex(index, true));
    });
})();

previousBtn.addEventListener("click", () => updateActiveIndex(-1));
nextBtn.addEventListener("click", () => updateActiveIndex(1));
