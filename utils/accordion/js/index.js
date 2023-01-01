let activeIndex = null;
const accordions = document.querySelectorAll(".accordion");

/**
 * Function to update index for active accordion
 * @param {number} index
 */
function setActiveIndex(index) {
    if (activeIndex === index) {
        accordions[activeIndex].classList.remove("active");
        activeIndex = null;
        return;
    }
    if (activeIndex !== null) {
        accordions[activeIndex].classList.remove("active");
    }
    activeIndex = index;
    accordions[activeIndex].classList.add("active");
}

// Initialization
(function init() {
    accordions.forEach((accordion, index) => {
        accordion.addEventListener("click", () => {
            setActiveIndex(index);
        });
    });
})();
