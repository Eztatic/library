const shelve = [];

const createBook = (title, author, pages, status) => {
  const book = { id: crypto.randomUUID(), title, author, pages, status };
  shelve.push(book);
};

const getBook = (index) => {
  return shelve[index];
};

const deleteBook = (id) => {
  const index = shelve.findIndex((book) => book.id === id);
  shelve.splice(index, 1);
};

// TEST
// createBook("Title 1", "Author 1", 1, "Read");
// createBook("Title 2", "Author 2", 2, "Unread");
