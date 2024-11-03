const data = [
    {
      id: 1,
      title: "The Lord of the Rings",
      publicationDate: "1954-07-29",
      author: "J. R. R. Tolkien",
      genres: [
        "fantasy",
        "high-fantasy",
        "adventure",
        "fiction",
        "novels",
        "literature",
      ],
      hasMovieAdaptation: true,
      pages: 1216,
      translations: {
        spanish: "El señor de los anillos",
        chinese: "魔戒",
        french: "Le Seigneur des anneaux",
      },
      reviews: {
        goodreads: {
          rating: 4.52,
          ratingsCount: 630994,
          reviewsCount: 13417,
        },
        librarything: {
          rating: 4.53,
          ratingsCount: 47166,
          reviewsCount: 452,
          likesCount : 0
        },
      },
    },
    {
      id: 2,
      title: "The Cyberiad",
      publicationDate: "1965-01-01",
      author: "Stanislaw Lem",
      genres: [
        "science fiction",
        "humor",
        "speculative fiction",
        "short stories",
        "fantasy",
      ],
      hasMovieAdaptation: false,
      pages: 295,
      translations: {},
      reviews: {
        goodreads: {
          rating: 4.16,
          ratingsCount: 11663,
          reviewsCount: 812,
        },
        librarything: {
          rating: 4.13,
          ratingsCount: 2434,
          reviewsCount: 0,
        },
      },
    },
    {
      id: 3,
      title: "Dune",
      publicationDate: "1965-01-01",
      author: "Frank Herbert",
      genres: ["science fiction", "novel", "adventure"],
      hasMovieAdaptation: true,
      pages: 658,
      translations: {
        spanish: "",
      },
      reviews: {
        goodreads: {
          rating: 4.25,
          ratingsCount: 1142893,
          reviewsCount: 49701,
        },
      },
    },
    {
      id: 4,
      title: "Harry Potter and the Philosopher's Stone",
      publicationDate: "1997-06-26",
      author: "J. K. Rowling",
      genres: ["fantasy", "adventure"],
      hasMovieAdaptation: true,
      pages: 223,
      translations: {
        spanish: "Harry Potter y la piedra filosofal",
        korean: "해리 포터와 마법사의 돌",
        bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
        portuguese: "Harry Potter e a Pedra Filosofal",
      },
      reviews: {
        goodreads: {
          rating: 4.47,
          ratingsCount: 8910059,
          reviewsCount: 140625,
        },
        librarything: {
          rating: 4.29,
          ratingsCount: 120941,
          reviewsCount: 1960,
        },
      },
    },
    {
      id: 5,
      title: "A Game of Thrones",
      publicationDate: "1996-08-01",
      author: "George R. R. Martin",
      genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
      hasMovieAdaptation: true,
      pages: 835,
      translations: {
        korean: "왕좌의 게임",
        polish: "Gra o tron",
        portuguese: "A Guerra dos Tronos",
        spanish: "Juego de tronos",
      },
      reviews: {
        goodreads: {
          rating: 4.44,
          ratingsCount: 2295233,
          reviewsCount: 59058,
        },
        librarything: {
          rating: 4.36,
          ratingsCount: 38358,
          reviewsCount: 1095,
        },
      },
    },
  ];
  
  //lets console whole data by quokka 
  function getBooks() {
    return data;
  }

  const books = getBooks();

  //! Lets work with immutable arrays , means how to add delete update elements in an arrays with altering original array...
  //? ADD: Lets add book object into array...
  const newBook ={
    id : 6,
    title : "Harry Porter and the chamber of secrets",
    author : "J.K Rowlings"
  }
 // now to add this into original array  we can use spread 
 const booksAfterAdd = [...books,newBook];
 // it will added at last of the array without altering original array books...
console.log(booksAfterAdd);

//* DELETE : Lets delete the element/object from array
const booksAfterDelete =  booksAfterAdd.filter((book)=>book.id !==3);
//here filter will not include the object with id ==3 hence new array without this object will be created, so deleted
console.log(booksAfterDelete);

//* UPDATE : Lets update the array without altering the array
 const updatedBook = booksAfterDelete.map((book)=>book.id == 1 ? {...book,pages:1280} : book);
 updatedBook
// here we update the property of array and with id ==1 , remaining things where not updated...
// so we updated one property of an array

//!ASYNC JAVASCRIPT......//////////
// to call api using fetch its send https request and request is processed and the data is  loaded ...and it will
// take sometime untill data is loaded, to wait for the data we use async js , and data is loaded in the form of promises
// if   promise is fullfilled then we can call "THEN" and pass response to call back to it and convert into into json///
fetch("https://jsonplaceholder.typicode.com/todos/1").then((res)=>res.json().then((data)=>{
    console.log(data)
}));

//? Now lets do same thing using much optimal way using async await ////
async function getTodos(){
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    console.log(data);
    return data;
   
    
}
const respond = getTodos();
console.log(respond);
 //The line const respond = getTodos(); will not wait for the data; it will execute immediately and assign a Promise to respond.
// The actual data is not available immediately outside the function. You need to wait for the promise to resolve, which can only happen after the asynchronous operations inside getTodos() complete.

//?Key Differences Promise Handling:

//*Chained Promises: The first snippet uses a chained approach, where each asynchronous operation is followed by a .then(). This can become harder to read and maintain if you have multiple asynchronous operations.
//*Async/Await: The second snippet uses async/await, making the code look more synchronous and often easier to read and maintain.
//*Error Handling:

//*Chained Promises: Error handling can be done by adding a .catch() at the end of the chain, which can catch errors from any part of the promise chain.
//*Async/Await: Error handling can be done using try/catch blocks, allowing for more natural and structured error handling.

// !Both snippets achieve the same goal of fetching and logging data from an API, but they do so in different ways: the first snippet uses a promise chaining approach, while the second uses async/await.
//!Chained promises can be harder to read and manage for complex asynchronous flows, while async/await provides a clearer and more concise syntax for handling asynchronous code.