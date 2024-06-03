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
const addDialog = document.querySelector('dialog.addDialog');
const editDialog = document.querySelector('dialog.editDialog');
const addBtn = document.querySelector('#addBtn');
const editBtn = document.querySelector('#editBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const newCard = document.createElement('div');
const form = document.querySelector('form');
const editForm = document.querySelector('.editDialog');

addCardBtn.addEventListener("click", () => {
      addDialog.showModal();
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
      addDialog.close();
      displayCard();
});   

cancelBtn.addEventListener("click", () => {
      addDialog.close();
});

let selectCard = document.querySelector('.cards-container');

selectCard.addEventListener("click", (e) => {
      e.preventDefault();
      let target = e.target;

      if(target.id === 'delete') {
            const currTitle = target.parentNode.parentNode.querySelector('p').innerText;
            library.map((obj) => {
                  if(obj.title === currTitle) {
                        target.parentNode.parentNode.remove();
                        library.splice(library.indexOf(obj), 1);
                  };
            });
      }

      if(target.id === 'edit') {
            editDialog.showModal();

            let currTitle = target.parentNode.parentNode.querySelector('p');
            let currAuthor = target.parentNode.parentNode.querySelector('p:nth-child(2)');
            let currPages = target.parentNode.parentNode.querySelector('p:nth-child(3)');
            
            library.map((obj) => {
                  if(obj.title === currTitle.innerText) {
                        editDialog.querySelector('#editBookTitle').value = obj.title;
                        editDialog.querySelector('#editAuthorName').value = obj.author;
                        editDialog.querySelector('#editNumPages').value = obj.pageCount;
                  };
            });

            editForm.addEventListener("click", (e) => {
                  e.preventDefault();
                  library.map((obj) => {
                        if(obj.title === currTitle.innerText) {
                              obj.title = editDialog.querySelector('#editBookTitle').value;
                              obj.author = editDialog.querySelector('#editAuthorName').value;
                              obj.pageCount = editDialog.querySelector('#editNumPages').value;
                              currTitle.innerText = obj.title;
                              currAuthor.innerText = `By: ${obj.author}`;
                              currPages.innerText = `No. of Pages: ${obj.pageCount}`;
                        };  
                  });

                  editDialog.close();
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















