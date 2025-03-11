// dummy list for test


class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }

    toggleRead(index) {
        this.books[index].toggleRead();
    }
}

class Book{
    constructor(title, year, author, country) {
        this.title = title;
        this.year = year;
        this.author = author;
        this.country = country;
        this.read = false
    }

    get(property) {
        return this[property];
    }

    set(property, value) {
        if (property !== 'read') {
            this[property] = value;
        } else {
            console.error('Use toggleRead method to change the read property.');
        }
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class UI {
    static renderLibrary(library) {
        const libraryContainer = document.querySelector('.library-container');
        libraryContainer.innerHTML = '';
        library.books.forEach((book, index) => {
            const bookCard = document.createElement('div');
            bookCard.setAttribute('data-index', index);
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                <div class="card-header">
                    <h2 class="book-title">${book.title}</h2>
                    <button class='delete-book'>X</button>
                </div>
                <p class="author">${book.author}</p>
                <p class="country">${book.country}</p>
                <p class="year">${book.year}</p>
                <button class="toggle-read">${book.read ? 'Read' : 'Unread'}</button>
            `;
            libraryContainer.appendChild(bookCard);
        });

        // Add event listeners for delete and toggle read buttons
        document.querySelectorAll('.delete-book').forEach((button) => {
            button.addEventListener('click', function() {
                const index = this.parentElement.getAttribute('data-index');
                library.removeBook(index);
                UI.renderLibrary(library);
            });
        });

        document.querySelectorAll('.toggle-read').forEach((button) => {
            button.addEventListener('click', function() {
                const index = this.parentElement.getAttribute('data-index');
                library.toggleRead(index);
                button.textContent = library.books[index].read ? 'Read' : 'Unread';
            });
        });
    }
}

//Initialize library
const myLibrary = new Library();



//Modal functionalities

const openModal = document.querySelector('.open-modal')
const addBookModal = document.querySelector('.add-book-modal')
const bookForm = document.getElementById('book-form')

openModal.addEventListener('click', () => {
    addBookModal.showModal();
})

bookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('book-title').value
    const author = document.getElementById('book-author').value
    const country = document.getElementById('book-country').value
    const year = document.getElementById('book-year').value

    const newBook = new Book(title, year, author, country); // Create a Book instance
    myLibrary.addBook(newBook);
    addBookModal.close();
    UI.renderLibrary(myLibrary)
    bookForm.reset()
})

const yearInput = document.getElementById('book-year')
yearInput.addEventListener('input', function(event) {
    if (event.target.value > new Date().getFullYear()){
        yearInput.setCustomValidity('Year cannot be in the future');
    } else {
        yearInput.setCustomValidity('');
    }
});
