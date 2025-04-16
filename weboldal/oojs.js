class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    render() {
        const div = document.createElement("div");
        div.textContent = `${this.title} – ${this.author}`;
        div.style.padding = "8px";
        div.style.borderBottom = "1px solid #ccc";
        return div;
    }
}

class BookManager {
    constructor() {
        this.books = [];
        this.container = document.getElementById("bookList");
    }

    addBook(book) {
        this.books.push(book);
        this.render();
    }

    render() {
        this.container.innerHTML = "";
        this.books.forEach(book => {
            this.container.appendChild(book.render());
        });
    }
}

class App extends BookManager {
    constructor() {
        super();
        this.init();
    }

    init() {
        document.getElementById("addBookBtn").addEventListener("click", () => {
            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;

            if (title.length === 0 || author.length === 0) {
                alert("Minden mezőt ki kell tölteni!");
                return;
            }

            const book = new Book(title, author);
            this.addBook(book);

            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new App();
});
