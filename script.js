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
const addCardBtn = document.querySelector('.add-card');
const dialog = document.querySelector('dialog');
const addBtn = document.querySelector('#addBtn')
const cancelBtn = document.querySelector('#cancelBtn');
const newCard = document.createElement('div');
const form = document.querySelector('form');

addCardBtn.addEventListener("click", () => {
      dialog.showModal();
});

addBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
            form.reportValidity(); 
            return; 
      }
      const bookTitleInput = document.querySelector('#bookTitleInput').value;
      const authorNameInput = document.querySelector('#authorNameInput').value;
      const pageNum = document.querySelector('#pages').value;
      let readStatus = document.querySelector('#readCheck');
      readStatus.checked === true ? readStatus = 'Have Read' 
                                  : readStatus = 'Not Read';
      addBookToLibrary(bookTitleInput, authorNameInput, pageNum, readStatus);
      dialog.close();
      displayCard();
});   

cancelBtn.addEventListener("click", () => {
      dialog.close();
      console.log(readStatus);
});

let deleteThis = document.querySelector('.cards-container');

deleteThis.addEventListener("click", (e) => {
      let target = e.target;
      if(target.id === 'delete') {
            const getTitle = target.parentNode.parentNode.querySelector('p').innerText;
            library.map((obj) => {
                  if(obj.title === getTitle) {
                        target.parentNode.parentNode.remove();
                        library.splice(library.indexOf(obj), 1);
                  };
            });
      }
});

const displayCard = () => {
      const obj = library[library.length-1];
      (() => {
            newCard.innerHTML = `
                  <div class="card">
                        <p>${obj.title}</p>
                        <p>By: ${obj.author}</p>
                        <p>No. of Pages: ${obj.pageCount}</p>
                        <p>Status: ${obj.readStatus}</p>
                        <div class="buttons">
                              <button id="edit">Edit</button>
                              <button id="delete">Delete</button>
                        </div>
                  </div>
            `;
            container.insertBefore(newCard.cloneNode(true), addCardBtn);
      })(obj);
};















