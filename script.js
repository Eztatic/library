const library = [];

function Book(title, author, pageCount) {
      this.title = title;
      this.author = author;
      this.pageCount = pageCount;
}

function addBookToLibrary(title, author, pageCount) {
      library.push(new Book(title, author, pageCount));
}

function setMultAttrs(element, attrs) {
      for(var key in attrs) {
        element.setAttribute(key, attrs[key]);
      }
}

const container = document.querySelector('.cards-container');


const getButtons = document.querySelector('.clickables');

const newCard = document.createElement('div');

const authorLabel = document.createElement('p');
const authorNameInput = document.createElement('input');
const pageCountLabel = document.createElement('p');
const pageCountInput = document.createElement('input');
const bookTitleInput = document.createElement('input');

newCard.classList.add('new-card');

setMultAttrs(bookTitleInput, {'type' : 'text', 
                              'placeholder' : 'Enter Book Title', 
                              'id' : 'bookTitleInput'});
authorLabel.innerText = 'By: ';
setMultAttrs(authorNameInput, {'type' : 'text', 
                              'placeholder' : 'Author Name', 
                              'id' : 'authorNameInput'});
pageCountLabel.innerText = 'No. of pages: ';
setMultAttrs(pageCountInput, {'type' : 'number', 
                              'placeholder' : '0', 
                              'id' : 'pages'});
newCard.appendChild(bookTitleInput);
newCard.appendChild(authorLabel);
authorLabel.appendChild(authorNameInput);
newCard.appendChild(pageCountLabel);
pageCountLabel.appendChild(pageCountInput);

const addCard = document.querySelector('.add-card');
const dialog = document.querySelector('dialog');
const cancelBtn = document.querySelector('#cancelBtn');
addCard.addEventListener("click", (e) => {
      // const add = newCard.cloneNode(true);
      // container.insertBefore(add, addCard);
      e.preventDefault();
      dialog.showModal();
});

cancelBtn.addEventListener("click", (e) => {
      dialog.close();
});






