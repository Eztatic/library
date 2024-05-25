const library = [];

function Book(title, author, pageCount) {
      this.title = title;
      this.author = author;
      this.pageCount = pageCount;
}

function addBookToLibrary(title, author, pageCount) {
      // library.push(new Book(title, author, pageCount));
}

function setMultAttrs(element, attrs) {
      for(var key in attrs) {
        element.setAttribute(key, attrs[key]);
      }
}

const container = document.querySelector('.cards-container');

const newCard = document.createElement('div');
newCard.classList.add('new-card');

const bookTitleInput = document.createElement('input');
setMultAttrs(bookTitleInput, {'type' : 'text', 
                              'placeholder' : 'Enter Book Title', 
                              'id' : 'bookTitleInput'});

const authorLabel = document.createElement('p');
authorLabel.innerText = 'By: ';

const authorNameInput = document.createElement('input');
setMultAttrs(authorNameInput, {'type' : 'text', 
                              'placeholder' : 'Author Name', 
                              'id' : 'authorNameInput'});

const pageCountLabel = document.createElement('p');
pageCountLabel.innerText = 'No. of pages: ';

const pageCountInput = document.createElement('input');
setMultAttrs(pageCountInput, {'type' : 'number', 
                              'placeholder' : '0', 
                              'id' : 'pages'});

const getButtons = document.querySelector('.clickables');
const buttons = getButtons.cloneNode(true);

// container.appendChild(newCard);
newCard.appendChild(bookTitleInput);
newCard.appendChild(authorLabel);
authorLabel.appendChild(authorNameInput);
newCard.appendChild(pageCountLabel);
pageCountLabel.appendChild(pageCountInput);
newCard.appendChild(buttons);

const addCard = document.querySelector('.add-card');
addCard.onclick = () => {
      const add = newCard.cloneNode(true);
      container.insertBefore(add, addCard);
};

//Card Container Elements
// const container = document.querySelector('.cards-container');
// const card = document.querySelector('.card');
// const addCard = document.querySelector('.add-card');
// const newCard = document.querySelector('.new-card');

//Get elements of newCard
// const inputTitle = document.querySelector('#bookTitleInput');
// const inputAuthor = document.querySelector('#authorNameInput');
// const inputPage = document.querySelector('#pages');
// const saveBtn = document.querySelector('.save');
// const deleteBtn = document.querySelector('.delete');

//Create Elements
// const h2 = document.createElement('h2');
// const span = document.createElement('span');
// const span1 = document.createElement('span');

// saveBtn.onclick = () => {
//       h2.textContent = inputTitle.value;
//       span.textContent = inputAuthor.value;
//       span1.textContent = inputPage.value;
//       inputTitle.parentNode.replaceChild(h2, inputTitle);
//       inputAuthor.parentNode.replaceChild(span, inputAuthor);
//       inputPage.parentNode.replaceChild(span1, inputPage);

//       saveBtn.setAttribute('src', './edit.svg');
//       saveBtn.classList.remove('save');
// };

// addCard.onclick = () => {
//       const add = newCard.cloneNode(true);
//       container.insertBefore(add, addCard);
// };

// deleteBtn.onclick = () => {
//       newCard.remove();
// };






