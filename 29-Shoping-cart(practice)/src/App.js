import { useState } from "react";
import "./App.css";
import SearchComponent from "./search-component";
import ShowCourseComponent from "./show-course-component";
import UserCartComponent from "./user-cart-component";
function App() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "T-shirt",
      price: 499,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230823165506/gfg1.png",
    },
    {
      id: 2,
      name: "Bag",
      price: 699,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230823165553/gfg2.jpg",
    },
    {
      id: 3,
      name: "Hoodie",
      price: 799,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230823165623/gfg3.jpg",
    },
  ]);

  const [searchCourses, setSearchCourses] = useState("");
  const [cartCourses, setCartCourses] = useState([]);
  console.log("cartttttt",cartCourses);
  //for searching the courses
  function handleCourseSearch(e) {
    setSearchCourses(e.target.value);
  }

  // filtering for matching the course name with search text if match it returns new array...of that object
  const handleFilterCourse = courses.filter((course) =>
    course.name.toLowerCase().includes(searchCourses.toLowerCase())
  );
  // remember the includes methods return true if searchCourse is empty string initially so it will return all the courses 
  const addCourseCart = (product) => {
    const alreadyCourses = cartCourses.find((item) => item.product.id === product.id);
    // first it matches the product object with the cartCourses object which is extract from it ,if id matches then simply add quantity to it//
    if (alreadyCourses) {
      const latestCartUpdate = cartCourses.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartCourses(latestCartUpdate);
    } else {
      setCartCourses([...cartCourses, { product: product, quantity: 1 }]);
      // product : product the product object is added to maintain the cart related stuff like quantity and product object
      // if the product is not present in the cartCourses then simply add the product to the cartCourses array with quantity 1
    }
 
  };

  const deleteCourseFromCartFunction = (course) => {
    const updatedCart = cartCourses.filter(item => item.product.id !== course.id);
    setCartCourses(updatedCart);
};

const totalAmountCalculationFunction = () => {
    return cartCourses
        .reduce((total, item) => 
                    total + item.product.price * item.quantity, 0);
};

  return (
    <div className="app">
      <SearchComponent
        searchCourses={searchCourses}
        onCourseSearch={handleCourseSearch}
      />
      <main className="App-main">
        <ShowCourseComponent
          courses={courses}
          onFilterCourse={handleFilterCourse}
          onCourseCart={addCourseCart}
        />
        <UserCartComponent
          cartCourses={cartCourses}
          setCartCourses ={setCartCourses}
          deleteCourseFromCartFunction={deleteCourseFromCartFunction}
    totalAmountCalculationFunction= {totalAmountCalculationFunction}
          
        />
      </main>
    </div>
  );
}

export default App;
