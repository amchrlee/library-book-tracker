const myLibrary = [
    {
        title: "Charlotte's Web",
        author: "E. B. White",
        totalPages: 300,
        readStatus: "Not Started"
    },
    {
        title: "blink",
        author: "Malcolm Gladwell",
        totalPages: 320,
        readStatus: "Read"
    },
    {
        title: "Our Souls at Night",
        author: "Kent Haruf",
        totalPages: 200,
        readStatus: "In Progress"
    }
];

function Book(title, author, totalPages, readStatus) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.readStatus = readStatus;
}

function addBookToLibrary(title, author, totalPages, readStatus) {
    const book = new Book(title, author, totalPages, readStatus);
    myLibrary.push(book);
}

