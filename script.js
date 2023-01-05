/* eslint-disable prefer-const */
const myLibrary = [
  // {
  //   title: 'Hurry Potter',
  //   author: 'Unkown',
  //   pages: 230,
  // },
  // {
  //   title: 'Hurry Potter',
  //   author: 'Unkown',
  //   pages: 230,
  // },
];

const addBtn = document.querySelector('#btn');
const content = document.querySelector('.content');
const modal = document.querySelector('.modal');
const container = document.querySelector('.container');
const submitBtn = document.querySelector('button[type="submit"]');

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function AddBookToLibrary(title, author, pages, readStatus) {
  const book = new Book(title, author, pages, readStatus);
  myLibrary.push(book);
}

addBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  container.style.opacity = '0.5';
});

function AddBookToDom() {
  content.innerHTML = '';
  const myLibraryList = Array.from(myLibrary);
  myLibraryList.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = myLibraryList.indexOf(book);
    content.appendChild(card);
    const bookTitle = document.createElement('h3');
    bookTitle.textContent = `${book.title}`;
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `${book.author}`;
    const bookPages = document.createElement('p');
    bookPages.textContent = `${book.pages}`;
    const bookStatus = document.createElement('p');
    bookStatus.textContent = `${book.readStatus}`;
    const removeBtn = document.createElement('button');
    removeBtn.id = 'remove';
    removeBtn.textContent = 'Remove';
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookStatus);
    card.appendChild(removeBtn);
  });
}

// AddBookToDom();
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  const readStatusObj = document.getElementById('read');
  let readStatus = readStatusObj.value;
  if (readStatusObj.checked) {
    readStatus = 'read';
  }
  AddBookToLibrary(title, author, pages, readStatus);
  AddBookToDom();
  modal.style.display = 'none';
  container.style.opacity = '1';
});

content.addEventListener('click', (e) => {
  if (e.target.id === 'remove') {
    let index = e.target.parentElement.dataset.id;
    myLibrary.splice(index, 1);
    e.target.parentElement.remove();
  }
});
