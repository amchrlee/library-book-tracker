const myLibrary = [];

function Book(title, author, totalPages, readStatus) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.readStatus = readStatus;
}

function addBookToLibrary() {
    let title = bookTitleInput.value;
    let author = bookAuthorInput.value;
    let totalPages = bookTotalPagesInput.value;
    let readStatus = bookStatusInput.value;
    
    const book = new Book(title, author, totalPages, readStatus);
    myLibrary.push(book);
}

// DIALOG-RELATED ELEMENTS
const addBookBtn = document.getElementById("add-book-btn");
const addBookDialog = document.getElementById("add-book-dialog");
const bookTitleInput = document.getElementById("book-title-input");
const bookAuthorInput = document.getElementById("book-author-input");
const bookTotalPagesInput = document.getElementById("book-total-pages-input");
const bookStatusInput = document.getElementById("reading-status-input");
const readingStatusInput = document.getElementById("reading-status-input");
const confirmBtn = document.getElementById("confirm-btn");

// BOOK CARD-RELATED ELEMENTS
const bookContainer = document.getElementById("all-books-container");

addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal();
}); 

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    addBookDialog.close();
    createCard(myLibrary[myLibrary.length - 1]);
    clearBookDialog();
});

function clearBookDialog() {
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookTotalPagesInput.value = "";
    readingStatusInput.value = "";
}

function createCard(book) {
    const bookCard = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const totalPages = document.createElement("p");
    const btnContainer = document.createElement("div");
    const readStatusBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    const libraryArrayLength = String(myLibrary.length);
    bookCard.classList.add("book-card", "book-" + libraryArrayLength);
    title.classList.add("book-card-title");
    author.classList.add("book-card-author");
    totalPages.classList.add("book-card-total-pages");
    removeBtn.classList.add("book-card-remove");
    readStatusBtn.classList.add("book-card-read-status");

    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    totalPages.textContent = book.totalPages;    
    removeBtn.textContent = 'Remove';
    linkTrashIcon(removeBtn);

    if(book.readStatus === "Read") {
        readStatusBtn.textContent = "Read";
        readStatusBtn.classList.add("btn-green");
    } else if (book.readStatus === "In Progress") {
        readStatusBtn.textContent = "In Progress";
        readStatusBtn.classList.add("btn-yellow");
    } else {
        readStatusBtn.textContent = "Not Started";
        readStatusBtn.classList.add("btn-red");
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(totalPages);
    bookCard.appendChild(btnContainer);
    btnContainer.appendChild(readStatusBtn);
    btnContainer.appendChild(removeBtn);
    bookContainer.appendChild(bookCard);
}

function linkTrashIcon(node) {
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

    iconSvg.setAttribute("viewBox","0 0 24 24");
    iconPath.setAttribute(
        "d", 
        "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
    );
    
    iconSvg.appendChild(iconPath);
    return node.appendChild(iconSvg);
}