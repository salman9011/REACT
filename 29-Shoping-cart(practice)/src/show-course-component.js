const ShowCourseComponent = ({ onFilterCourse,onCourseCart }) => {
  return (
    <div className="product-list">
      {onFilterCourse.length === 0 ? (
        <p className="no-results">No Results Found</p>
      ) : (
        onFilterCourse.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <button className="add-to-cart-button" onClick={()=> onCourseCart(product)}>Add to Shopping Cart</button>
          </div>
        ))
      )}
    </div>
  );
};
export default ShowCourseComponent;
