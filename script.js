/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// eslint-disable-next-line func-names
Book.prototype.toggleReadStatus = function (ele) {
  if (this.readStatus === 'read') {
    this.readStatus = 'Not read';
    ele.style.color = 'rgb(187, 0, 0)';
    ele.textContent = 'Not read';
  } else {
    this.readStatus = 'read';
    ele.style.color = 'green';
    ele.textContent = 'read';
  }
};

function AddBookToLibrary(arr, title, author, pages, readStatus) {
  const book = new Book(title, author, pages, readStatus);
  arr.push(book);
}

function displayFormModal(display, opacity) {
  modal.style.display = display;
  container.style.opacity = opacity;
}

function getUserInputs() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;

  const readStatusObj = document.getElementById('read');
  let readStatus = readStatusObj.value;
  if (readStatusObj.checked) {
    readStatus = 'read';
  }
  return [title, author, pages, readStatus];
}

function deleteBookFromDom(ele, arr) {
  let index = ele.parentElement.dataset.id;
  arr.splice(index, 1);
  ele.parentElement.remove();
}

function AddBookToDom(arr) {
  content.innerHTML = '';
  const myLibraryList = Array.from(arr);
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
    bookPages.textContent = `${book.pages} pages`;

    const bookStatus = document.createElement('p');
    bookStatus.textContent = `${book.readStatus}`;
    bookStatus.id = 'read-status';
    if (book.readStatus === 'read') {
      bookStatus.style.color = 'green';
    }

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

function isValidate() {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  if (title === '' || author === '' || pages === '') {
    const alertMsg = document.createElement('p');
    alertMsg.textContent = '*Please fill all inputs';
    alertMsg.id = 'alert';
    alertMsg.style.color = 'red';
    modal.insertBefore(alertMsg, document.querySelector('form'));
    setTimeout(() => {
      alertMsg.remove();
    }, 3000);
    return false;
  }
  return true;
}

function clearForm() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#read').checked = false;
}

const addBtn = document.querySelector('#btn');
const content = document.querySelector('.content');
const modal = document.querySelector('.modal');
const container = document.querySelector('.container');
const submitBtn = document.querySelector('button[type="submit"]');

addBtn.addEventListener('click', () => {
  displayFormModal('block', '0.5');
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (isValidate()) {
    const inputs = getUserInputs();

    AddBookToLibrary(myLibrary, ...inputs);
    AddBookToDom(myLibrary);

    displayFormModal('none', '1');
    clearForm();
  }
});

content.addEventListener('click', (e) => {
  if (e.target.id === 'remove') {
    deleteBookFromDom(e.target, myLibrary);
  }
  if (e.target.id === 'read-status') {
    let bookIndex = e.target.parentElement.dataset.id;
    myLibrary[bookIndex].toggleReadStatus(e.target);
  }
});

// AddBookToDom(myLibrary);
