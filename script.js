const library = [];

function Book(title, author, pageCount, readStatus) {
      this.title = title;
      this.author = author;
      this.pageCount = pageCount;
      this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pageCount, readStatus) {
      library.push(new Book(title, author, pageCount, readStatus));
}

function setMultAttrs(element, attrs) {
      for(var key in attrs) {
        element.setAttribute(key, attrs[key]);
      }
}

const container = document.querySelector('.cards-container');
const addCard = document.querySelector('.add-card');
const dialog = document.querySelector('dialog');
const addBtn = document.querySelector('#addBtn')
const cancelBtn = document.querySelector('#cancelBtn');

const bookTitleInput = document.querySelector('#bookTitleInput').value;
const authorNameInput = document.querySelector('#authorNameInput').value;
const pageNum = document.querySelector('#pages').value;
const readStatus = document.querySelector('#readCheck').checked;

addCard.addEventListener("click", () => {
      // const add = newCard.cloneNode(true);
      // container.insertBefore(add, addCard);
      dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
      dialog.close();
      console.log(readStatus);
});






