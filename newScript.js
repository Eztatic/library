// Logic
const shelve = JSON.parse(localStorage.getItem("shelve")) || [];

const updateShelve = () => {
  localStorage.setItem("shelve", JSON.stringify(shelve));
};

const createBook = (title, author, pages, status) => {
  const book = { id: crypto.randomUUID(), title, author, pages, status };
  shelve.push(book);
  return book.id;
};

const toggleStatus = (id) => {
  const index = bookIndex(id);
  shelve[index].status = revertBookStatus(shelve[index].status);
  return shelve[index].status;
};

const deleteBook = (id) => {
  shelve.splice(bookIndex(id), 1);
};

const bookIndex = (id) => {
  return shelve.findIndex((book) => book.id === id);
};

const revertBookStatus = (currentStatus) => {
  return currentStatus === "Read" ? "Unread" : "Read";
};

// UI
const createBookUI = (id, bookTitle, bookAuthor, bookPages, bookStatus) => {
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
  statusBtn.innerText = `Mark as ${revertBookStatus(bookStatus)}`;
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

  statusBtn.addEventListener("click", () => {
    let changeStatus = toggleStatus(id);
    statusBtn.innerText = `Mark as ${revertBookStatus(changeStatus)}`;
    updateShelve();
  });

  deleteBtn.addEventListener("click", () => {
    deleteBook(id);
    deleteBtn.parentElement.remove();
    updateShelve();
  });
};

const getUserInput = () => {
  const bookTitle = document.querySelector("#bookTitle");
  const bookAuthor = document.querySelector("#bookAuthor");
  const bookPages = document.querySelector("#bookPages");
  let bookStatus = document.querySelector("#bookStatus");
  bookStatus = bookStatus.checked ? "Read" : "Unread";

  return [bookTitle.value, bookAuthor.value, bookPages.value, bookStatus];
};

const addBook = (inputs) => {
  const id = createBook(...inputs);
  createBookUI(id, ...inputs);
  updateShelve();
};

// Validation
const formValidation = () => {
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
      addBook(getUserInput());
      document.querySelector("form").reset();
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  formValidation();
  if (shelve.length === 0) {
    const defaultBook = ["Think and Grow Rich", "Napoleon Hill", "238", "Read"];
    addBook(defaultBook);
    updateShelve();
  } else {
    JSON.parse(localStorage.getItem("shelve")).forEach((book) => {
      createBookUI(...Object.values(book));
    });
  }
});
