let posts = [];
let itemPerPageCount = 5;
let totalPages = 1;
let activePage = 0;
let startPageNum = 0;
let endPageNum = 0;

const itemPerPage = document.querySelector(".item-per-page > select");
const tbody = document.querySelector("tbody");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const pageNums = document.querySelector("#paginator-page-nums");

/**
 * Function to update page number in paginator
 * @param {number} dPage
 */
const showPageNums = (dPage) => {
    if (!!dPage) {
        startPageNum += dPage;
    }
    if (startPageNum < 0) {
        startPageNum = 0;
    } else if (startPageNum + 5 >= totalPages) {
        startPageNum = totalPages - 5;
    }
    endPageNum = Math.min(totalPages, startPageNum + 5);
    let pageNumsHtml = "";
    for (let i = startPageNum; i < endPageNum; i++) {
        pageNumsHtml += `<span onclick="setActivePage(${i})" class=${
            activePage === i ? "active" : ""
        }>${i + 1}</span>`;
    }
    pageNums.innerHTML = pageNumsHtml;
};

/**
 * Function to update table rows
 */
const showRows = () => {
    let tBodyHtml = "";
    const start = activePage * itemPerPageCount;
    const end = Math.min((activePage + 1) * itemPerPageCount, posts.length);
    for (let i = start; i < end; i++) {
        tBodyHtml += `<tr>`;
        tBodyHtml += `<td>${posts[i].id}</td>`;
        tBodyHtml += `<td>${posts[i].userId}</td>`;
        tBodyHtml += `<td>${posts[i].title}</td>`;
        tBodyHtml += `</tr>`;
    }
    tbody.innerHTML = tBodyHtml;
    showPageNums();
};

// Function to set active page
const setActivePage = (index) => {
    activePage = index;
    showRows();
};

onload = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    posts = await res.json();
    totalPages = Math.ceil(posts.length / itemPerPageCount);
    setActivePage(0);
};

itemPerPage.onchange = (e) => {
    itemPerPageCount = e.target.value;
    totalPages = Math.ceil(posts.length / itemPerPageCount);
    setActivePage(0);
};

prevBtn.onclick = () => showPageNums(-1);
nextBtn.onclick = () => showPageNums(1);
