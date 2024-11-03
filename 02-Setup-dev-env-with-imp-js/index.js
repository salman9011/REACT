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
  books

 function getBookid(id){
    return data.find((d) =>d.id===id)
 }
 const book = getBookid(2);
 book;
//  const title =book.title;
//  const author =book.author;
//  const publicationDate = book.publicationDate;
//  title
//  author
//  publicationDate
 //reading data like this creating mess in code and is more complex , what if book has many more properties
 // so here comes property of destructing
// **************!DESTRUCTRING*************//
//*lets use for objects (relay on object properties)
const {title,author,publicationDate,pages,genres} = book;
console.log(title, author,publicationDate,genres);

//* lets use for arrays (relays on order of element in array)
// const primaryGeners = book.genres[0];
// const secondaryGeners = book.genres[1];
// const thirdGeners = book.genres[2];
// console.log(primaryGeners, secondaryGeners, thirdGeners);

//?lets do same using array destructing
// const [primaryGeners, secondaryGeners, thirdGeners] = genres;
// console.log(primaryGeners,secondaryGeners,thirdGeners);
//! *The main aim of destructuring in JavaScript is to simplify the extraction of values from arrays or properties from objects into distinct variables, making the code more concise and readable. Instead of manually accessing individual values or properties, destructuring allows you to "unpack" data in a more convenient way.*

//************!REST AND SPREAD OPERATOR (for arrays)**********************//
//for suppose we want the primary and secondary genres also we want the whole genres array , or other than primary secondary we want genres , we can use rest operator
const [primaryGeners, secondaryGeners, ...otherGenres] = genres;
console.log(primaryGeners, secondaryGeners, ...otherGenres );

//* now we want to create new array of genres , a new one at the end into existing genres array
// const newGenres = [genres,'epic fantasy']
// console.log(newGenres) // this will be array of array of genres , but we want single array for that we use spread operator

const newGenres = [...genres,'epic fantasy'];
console.log(newGenres)
// we can add this spread at first if we want add new elements at last or at last if we want add new element at first

//*************!REST AND SPREAD OPERATOR (for Objects)
const updatedBook = {...book, publicationDate:"25-05-1998",numberOfStars :"4"};
console.log(updatedBook)
// so we have spread the book object then update its properties
// we can also add new properties to it

//!TERNARY OPERATOR
// IT HAS 3 PART , CONDITION , AND THE RESULT INCASE CONDITION IS TRUE AND FALSE , THE IT WILL BE 3RD PART
const pagesRange = pages> 1000 ?"over a thousand" : "less than 10000";
 console.log(pagesRange);

 //! ARROW FUNCTIONS
 //New way of writing a function , jus introduced in ES6
 //lets split publication date in normal function way
 function productionDate(str){
return str.split("-")[0];
 }
      console.log(productionDate(publicationDate));     
//**writing the same function by using arrow Functions */
const getYear =(str)=>str.split("-")[0];
console.log(getYear(publicationDate))

//*************!SHORT CIRCUITING*************

//Short circuiting in logical operators means that in certain condition the operator will immediately return the first value not even look into the second value//
//when first value is true the operator will automatically return the second value no matter what condition is 
//below are some examples
//*AND OPERATOR//
console.log(true && "something something");
console.log(false && "something something");// here short circuiting works it doesn't even look onto second value//

//in the above function getbookId we are passing 2 book object which has (hasMovieAdaptation false), lets check
 console.log(book.hasMovieAdaptation && "this book has movie");//here short circuit works
//* it is proper work with truthy and falsy value...
//* A truthy value is one which is not falsy like :0, null, undefinied are falsy values"//
//* so if we use falsy values with && then it will return falsy value e.g
console.log(0 && "something"); // cox 0 is falsy

//* OR OPERATOR
// it works opposite of AND Operator... when it got falsy value it will check for second operand and if it got truthy then it will short circuit 
// then it will not even look into second value //
 console.log(true || "something"); //short circuiting 
 console.log(false || "something"); //when "OR" operator gets falsy value it will get for second operand

 //for falsy value there edge an edge , if count is zero for any variable then it will not return that instead it will go for second oprand//
 console.log(book.reviews.librarything.reviewsCount || "no data");
 //here it will not give as 0 it will go for library thing as 0 is falsy value
 //for this issue js introduced operator called knowledge collasing operator (??)
 //it jus resolves the problem of short circuit of falsy value of || operator//
 console.log(book.reviews.librarything.reviewsCount ?? "no data");

 //*********************!SOME IMPORTANT JS FUNCTIONS********************//
 // **MAP// : It is used to create new array with some operations on original array on each element , it takes call back*/
 //suppose we want titles from array of books
 const getTitles = books.map((book) => book.title);
 getTitles;
  
 // we can also do some computations or return some object , suppose we want data as title and author//
 // here is edge if we have to return or used multiple data we can't use directly {} as arrow functions treats it as a declearation block//
 // we can avoid this either by return or ()

const essentialData = books.map((book) =>{
  return{
   title : book.title,
   author: book.author
  };
}
);
 essentialData
// now with out return
const withoutCurly = books.map((book)=>({
  title : book.title,
   author: book.author 
}))
withoutCurly
//* in General  If you don’t use curly braces, JavaScript assumes an implicit return, meaning it automatically returns the result of the expression.
// *  When you use curly braces, you create a function body, and in this case, you need to explicitly return a value with the return keyword.otherwise it understands it as declearation block//

// *FILTER : // it returns the value or element based on condition , if the condition is true then element goes into the new array//
const longBooks = books.filter ((book)=>book.pages>500);
console.log(longBooks);
 // we can also use filter again based on above filtered data//
 const longBooksFiltered = books.filter((book) => book.pages > 500).filter((book)=>book.hasMovieAdaptation);
 console.log(longBooksFiltered);
  //better way of saying this is filter those books which include adventure then we need title of those books
   const advanturedBooks = books.filter((book) => book.genres.includes("adventure")).map((book)=>book.title);
   console.log(advanturedBooks);

   //*REDUCE:  this method is overrides all other methods, infact we can implement all other functions with the reduce method, but things wiil be complex//
   //? the global of reduce is to reduce all the entire array into single value, it takes call back and 2nd argument it takes as starting value//
   //lets read all pages of array
   const pagesAllBooks = books.reduce ((acc,book)=> acc+ book.pages);
   console.log(pagesAllBooks);
   // acc is accumulator we can replace it to sum name as well , the starter of acc is 0//

   //! Now we can sort arrays using sort method , but it effects the original array , but we don't want that on front end//
   //? for that we use slice
   const arr =[1,2,3,4,44,55,64,32,432];
   const sorted = arr.sort((a,b) => a-b); //acending order if (b-a ) then it will sort decending order
   console.log(arr); // here original array is effected  
   //lets use slice
   const arr2 =[1,2,3,4,44,55,64,32,432, 659,33,22];
   const sortedArray = arr.slice().sort((a,b) => a-b);
console.log(arr2) // here original array is not effected//
console.log(sortedArray)

//lets sort pages//
const sortedPage = books.slice().sort((a,b) => a.pages-b.pages);
console.log(sortedPage);



