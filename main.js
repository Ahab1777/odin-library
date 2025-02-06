// dummy list for test

const myLibrary = [
    {
    title: 'Infinite Jest',
    year: 1996,
    author: 'David Foster Wallace',
    country: 'United States',
    read: false
    },
    {
    title: 'Blood Meridian',
    year: 1985,
    author: 'Cormac McCarthy',
    country: 'United States',
    read: false
    },
    {
    title: 'Moby Dick',
    year: 1851,
    author: 'Herman Melville',
    country: 'United States',
    read: false
    }

];

function Book(title, year, author, country) {
    this.title = title;
    this.year = year;
    this.author = author;
    this.country = country;
    this.read = false;
    this.readToggler = function() {
        this.read = !this.read
    }
}

function addBookToLibrary(title, year, author, country) {
    let newBook = new Book(title, year, author, country);
    myLibrary.push(newBook)
}

const libraryContainer = document.querySelector('.library-container');


function libraryRender(library) {
    libraryContainer.innerHTML = '';
    bookIndex = 0
    library.forEach((book, index) => {
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
        <button class="toggle-read">Read</button>
        `

        libraryContainer.appendChild(bookCard)
    });
    //create delete button
    document.querySelectorAll('.delete-book').forEach((button) => {
        button.addEventListener('click', function() {
            const index = this.parentElement.getAttribute('data-index');
            myLibrary.splice(index, 1);
            libraryRender(myLibrary)
        })
    })
    //create toggle read button
    document.querySelectorAll('.toggle-read').forEach((button) => {
        button.addEventListener('click', function() {
            const index = this.parentElement.getAttribute('data-index');
            myLibrary[index].readToggler()
            button.textContent = myLibrary[index].read ? 'Read' : 'Unread'
        })
    })

}

libraryRender(myLibrary)



//Modal functionalities

const openModal = document.querySelector('.open-modal')
const addBookModal = document.querySelector('.add-book-modal')
const addBookSubmitButton = document.getElementById('book-form')
const bookForm = document.getElementById('book-form')

openModal.addEventListener('click', () => {
    addBookModal.showModal();
})

addBookSubmitButton.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('book-title').value
    const author = document.getElementById('book-author').value
    const country = document.getElementById('book-country').value
    const year = document.getElementById('book-year').value

    addBookToLibrary(title, year, author, country);
    addBookModal.close();
    libraryRender(myLibrary);
    bookForm.reset()
})