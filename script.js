/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
const myLibrary = [];

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  toggleReadStatus(ele) {
    if (this.readStatus === 'read') {
      this.readStatus = 'Not read';
      ele.style.color = 'rgb(187, 0, 0)';
      ele.textContent = 'Not read';
    } else {
      this.readStatus = 'read';
      ele.style.color = 'green';
      ele.textContent = 'read';
    }
  }
}

class DisplayController {
  constructor(array) {
    this.array = array;
  }

  AddBookToLibrary(title, author, pages, readStatus) {
    const book = new Book(title, author, pages, readStatus);
    this.array.push(book);
  }

  displayFormModal(display, opacity) {
    modal.style.display = display;
    container.style.opacity = opacity;
  }

  getUserInputs() {
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

  deleteBookFromDom(ele) {
    let index = ele.parentElement.dataset.id;
    this.array.splice(index, 1);
    ele.parentElement.remove();
  }

  AddBookToDom() {
    content.innerHTML = '';
    const myLibraryList = Array.from(this.array);
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

  isValidate() {
    const [title, author, pages] = this.getUserInputs();
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

  clearForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
  }
}

const displayController = new DisplayController(myLibrary);

const addBtn = document.querySelector('#btn');
const content = document.querySelector('.content');
const modal = document.querySelector('.modal');
const container = document.querySelector('.container');
const submitBtn = document.querySelector('button[type="submit"]');
const cancelBtn = document.querySelector('button[type="button"]');

addBtn.addEventListener('click', () => {
  displayController.displayFormModal('block', '0.5');
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (displayController.isValidate()) {
    const inputs = displayController.getUserInputs();

    displayController.AddBookToLibrary(...inputs);
    displayController.AddBookToDom();

    displayController.displayFormModal('none', '1');
    displayController.clearForm();
  }
});

cancelBtn.addEventListener('click', () => {
  displayController.displayFormModal('none', '1');
  displayController.clearForm();
});

content.addEventListener('click', (e) => {
  if (e.target.id === 'remove') {
    displayController.deleteBookFromDom(e.target, myLibrary);
  }
  if (e.target.id === 'read-status') {
    let bookIndex = e.target.parentElement.dataset.id;
    myLibrary[bookIndex].toggleReadStatus(e.target);
  }
});
