let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Adding book info to myLibrary 
function addBookToLibrary() {
  const newBookForm = document.querySelector('#new-book-form')
  newBookForm.addEventListener('submit', (event) => {
   event.preventDefault();
   const title = document.querySelector('#title').value;
   const author = document.querySelector('#author').value;
   const pages = parseInt(document.querySelector('#pages').value);
   const read = document.querySelector('#read').checked;
   const newBook = new Book(title, author, pages, read);
  //  console.log(newBook);
  myLibrary.push(newBook);
  console.log(myLibrary);
  render();
  
  const modal = document.querySelector('.modal');
  modal.style.display = "none";
  newBookForm.reset();
  });
}

// displaying form when clicking button
const newBookBtn = document.querySelector('#new-book-btn');
newBookBtn.addEventListener('click', function() {
  const modal = document.querySelector('#modal');
  modal.style.display = 'block';
});

// rendering the book list
function render() {
  const bookList = document.querySelector('#book-list');
  bookList.innerHTML = "";
  console.log(bookList);
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? "yes" : "no"}</p>
      <button class='toggle-read-btn' data-index="${index}">
        ${book.read ? "Unread" : "read"}
      </button>
      <button class='remove-book-btn' data-index="${index}">
        Remove
      </button>
      `;
    bookList.appendChild(bookCard);
  });

  removeBook();
  toggleReadStatus();
}

// deleting the book card
function removeBook() {
  const removeButton = document.querySelectorAll('.remove-book-btn');
  removeButton.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      myLibrary.splice(index, 1);
      render();
    });
  });
}

// book readed or not
function toggleReadStatus() {
  const removeToggler = document.querySelectorAll('.toggle-read-btn');
  removeToggler.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const index = toggle.dataset.index;
      myLibrary[index].read = !myLibrary[index].read;
      render();
    });
  });
}

// closing the form when clicking on close icon
const closeModalBtn = document.querySelector(".close");
closeModalBtn.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
});

addBookToLibrary();