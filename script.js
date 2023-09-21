const myLibrary = [
    {
        title: "Broken Harbor",
        author: "Tana French",
        totalPages: 496,
        readStatus: "In Progress",
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        totalPages: 366,
        readStatus: "Not Started",
    },
    {
        title: "The Joy Luck Club",
        author: "Amy Tan",
        totalPages: 352,
        readStatus: "Read",
    },
];

Book.prototype.updateReadStatusValue = function(index, value) {
    myLibrary[index].readStatus = value;
}

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
const cancelBtn = document.getElementById("cancel-btn");
const confirmBtn = document.getElementById("confirm-btn");

// BOOK CARD-RELATED ELEMENTS
const bookContainer = document.getElementById("all-books-container");

addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal();
}); 

cancelBtn.addEventListener("click", () => {
    clearBookDialog();
});

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    addBookDialog.close();
    printBookCards();
    clearBookDialog();
});

function printBookCards() {
    bookContainer.textContent = "";
    myLibrary.forEach((book, index) => {
        createCard(book, index);
    });

    removeBook();
    updateReadStatus();
}

function clearBookDialog() {
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookTotalPagesInput.value = "";
    readingStatusInput.value = "";
}

function createCard(book, index) {
    const bookCard = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const totalPages = document.createElement("p");
    const btnContainer = document.createElement("div");
    const readStatusBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    bookCard.classList.add("book-card");
    bookCard.setAttribute('data', index);
    title.classList.add("book-card-title");
    author.classList.add("book-card-author");
    totalPages.classList.add("book-card-total-pages");
    btnContainer.classList.add("book-card-btn-container")
    removeBtn.classList.add("book-card-remove");
    removeBtn.setAttribute('data', index);
    readStatusBtn.classList.add("book-card-read-status");
    readStatusBtn.setAttribute('data', index);

    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    totalPages.textContent = book.totalPages;
    linkTrashIcon(removeBtn);

    if(book.readStatus === "Read") {
        readStatusBtn.textContent = "Read";
        readStatusBtn.classList.add("read","btn-green");
    } else if (book.readStatus === "In Progress") {
        readStatusBtn.textContent = "In Progress";
        readStatusBtn.classList.add("in-progress","btn-yellow");
    } else {
        readStatusBtn.textContent = "Not Started";
        readStatusBtn.classList.add("not-started","btn-red");
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

function removeBook() {
    const removeBtns = document.querySelectorAll(".book-card-remove");
    removeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            myLibrary.splice(btn.getAttribute('data'), 1);
            printBookCards();
        });
    });
}

function updateReadStatus() {
    const readStatusBtns = document.querySelectorAll(".book-card-read-status");
    readStatusBtns.forEach((btn) => {
        btn.addEventListener("click", (update) => {
            const bookIndex = btn.getAttribute('data');

            // create an object this way so I can have the ability to choose the prototype property of the object as the updateReadStatusValue method, which is called later on
            update = Object.create(Book.prototype);
            
            if(btn.textContent === "Read") {
                let readStatusValue = "Not Started";
                update.updateReadStatusValue(bookIndex, readStatusValue);
                btn.textContent = "Not Started";
                btn.classList.remove("read","btn-green");
                btn.classList.add("not-started","btn-red");
            } else if (btn.textContent === "In Progress") {
                let readStatusValue = "Read";
                update.updateReadStatusValue(bookIndex, readStatusValue);
                btn.textContent = "Read";
                btn.classList.remove("in-progress","btn-yellow");
                btn.classList.add("read","btn-green");
            } else {
                let readStatusValue = "In Progress";
                update.updateReadStatusValue(bookIndex, readStatusValue);
                btn.textContent = "In Progress";
                btn.classList.remove("not-started","btn-red");
                btn.classList.add("in-progress","btn-yellow");
            }
        });
    });
}

printBookCards();