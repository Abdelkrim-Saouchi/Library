/* eslint-disable prefer-const */
const myLibrary = [
  {
    title: 'Hurry Potter',
    author: 'Unkown',
    pages: 230,
  },
  {
    title: 'Hurry Potter',
    author: 'Unkown',
    pages: 230,
  },
];

const addBtn = document.querySelector('#btn');
const content = document.querySelector('.content');
const modal = document.querySelector('.modal');
const container = document.querySelector('.container');

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function AddBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.push(book);
}

addBtn.addEventListener('click', () => {
  //   const promptOuputs = [];
  //   let title = prompt('book title');
  //   promptOuputs.push(title);
  //   let author = prompt('book author');
  //   promptOuputs.push(author);
  //   let pages = prompt('book pages');
  //   promptOuputs.push(pages);
  //   console.log('h', promptOuputs);
  //   AddBookToLibrary(promptOuputs[0], promptOuputs[1], promptOuputs[2]);
  //   window.AddBookToDom();
  modal.style.display = 'block';
  container.style.opacity = '0.5';
});

console.log('outside', myLibrary);

function AddBookToDom() {
  content.innerHTML = '';
  const myLibraryList = Array.from(myLibrary);
  myLibraryList.forEach((book) => {
    const cardDiv = `
        <div class= "card">
        <h2>Book</h2>
        <h3>title: ${book.title}</h3>
        <p class="author">author: ${book.author}</p>
        <p class="pages">pages: ${book.pages}</p>
        </div>
    `;
    content.innerHTML += cardDiv;
  });
}

// AddBookToDom();
