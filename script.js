const library = [];

function Book(title, author, pageCount) {
      this.title = title;
      this.author = author;
      this.pageCount = pageCount;
}

function addBookToLibrary(title, author, pageCount) {
      library.push(new Book(title, author, pageCount));
}

//Card Container Elements
const container = document.querySelector('.cards-container');
const card = document.querySelector('.card');
const addCard = document.querySelector('.add-card');
const newCard = document.querySelector('.new-card');

//Get elements of newCard
const input = document.querySelector('#asdf');
input.value = 'asdf';

addCard.onclick = () => {
      const add = newCard.cloneNode(true);
      container.insertBefore(add, addCard);
};




