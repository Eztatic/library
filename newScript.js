// Logic
const shelve = [];

const createBook = (title, author, pages, status) => {
  const book = { id: crypto.randomUUID(), title, author, pages, status };
  shelve.push(book);
  return book.id;
};

const getBook = (index) => {
  return shelve[index];
};

const toggleStatus = (id, newStatus) => {
  const index = shelve.findIndex((book) => book.id === id);
  if (newStatus === "Read") {
    newStatus = "Unread";
  } else {
    newStatus = "Read";
  }
  shelve[index].status = newStatus;
};

const deleteBook = (id) => {
  const index = shelve.findIndex((book) => book.id === id);
  shelve.splice(index, 1);
};

// UI

const createBookUI = (bookTitle, bookAuthor, bookPages, bookStatus) => {
  const cardContainer = document.querySelector(".cards-container");
  const card = document.createElement("div");
  const title = document.createElement("p");
  const authLabel = document.createElement("p");
  const author = document.createElement("span");
  const pageContainer = document.createElement("div");
  const pages = document.createElement("span");
  const pageLabel = document.createElement("p");
  const statusBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  card.classList.add("card");
  title.classList.add("title");
  author.classList.add("author");
  pages.classList.add("numPages");
  statusBtn.setAttribute("id", "status");
  deleteBtn.setAttribute("id", "delete");

  title.innerText = bookTitle;
  authLabel.innerText = "By: ";
  author.innerText = bookAuthor;
  pages.innerText = bookPages;
  pageLabel.innerText = "Pages";
  statusBtn.innerText = bookStatus;
  deleteBtn.innerText = "Remove";

  card.appendChild(title);
  card.appendChild(authLabel);
  authLabel.appendChild(author);
  card.appendChild(pageContainer);
  pageContainer.appendChild(pages);
  pageContainer.appendChild(pageLabel);
  card.appendChild(statusBtn);
  card.appendChild(deleteBtn);
  cardContainer.appendChild(card);
};

const getUserInput = () => {
  const bookTitle = document.querySelector("#bookTitle");
  const bookAuthor = document.querySelector("#bookAuthor");
  const bookPages = document.querySelector("#bookPages");
  let bookStatus = document.querySelector("#bookStatus");
  bookStatus = bookStatus.checked ? "Read" : "Unread";

  return [bookTitle.value, bookAuthor.value, bookPages.value, bookStatus];
};

// Validation
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector("#addBtn");
  const bookTitle = document.querySelector("#bookTitle");
  const bookAuthor = document.querySelector("#bookAuthor");
  const bookPages = document.querySelector("#bookPages");

  const validateInput = (inputElement, errorMessage, checkValidity) => {
    if (checkValidity()) {
      inputElement.setCustomValidity(errorMessage);
      inputElement.reportValidity();
    } else {
      inputElement.setCustomValidity("");
    }
  };

  // Input event listeners
  bookTitle.addEventListener("input", () => {
    validateInput(
      bookTitle,
      "Book title must not be empty",
      () => bookTitle.validity.valueMissing
    );
  });

  bookAuthor.addEventListener("input", () => {
    validateInput(
      bookAuthor,
      "Book author must not be empty",
      () => bookAuthor.validity.valueMissing
    );
  });

  bookPages.addEventListener("input", () => {
    validateInput(
      bookPages,
      bookPages.validity.valueMissing
        ? "Page count must not be empty"
        : "Page count cannot be zero",
      () => bookPages.validity.valueMissing || bookPages.validity.rangeUnderflow
    );
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!bookTitle.checkValidity()) {
      bookTitle.reportValidity();
    } else if (!bookAuthor.checkValidity()) {
      bookAuthor.reportValidity();
    } else if (!bookPages.checkValidity()) {
      bookPages.reportValidity();
    } else {
      createBook(...getUserInput());
      createBookUI(...getUserInput());
      document.querySelector("form").reset();
    }
  });
});

// TEST
// createBook("Title 1", "Author 1", 1, "Read");
// createBook("Title 2", "Author 2", 2, "Unread");
