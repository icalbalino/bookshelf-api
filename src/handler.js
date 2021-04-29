/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = pageCount == readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  } else if (newBook.name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  } else {
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });

    response.code(500);
    return response;
  }
};

const getAllBooksHandler = () => ({
//     if (books == null) {
//         status: 'success',
//         data: {
//             books: [],
//         }
//     }
//   status: 'success',
//   data: {
//     books: [
//       {
//         id: books.id,
//         name: books.name,
//         publisher: books.publisher,
//       },

  //     ],
  //   },

});

module.exports = {addBookHandler, getAllBooksHandler};
