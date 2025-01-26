const SearchComponent = ({searchCourses, onCourseSearch }) =>{
    return (
        <header className="App-header">
            <h1>Shopping Cart for Courses </h1>
            <div className="search-bar">
            <input type ="text" placeholder="Search for item..." value={searchCourses} onChange={onCourseSearch}/>
            </div>
        </header>
    )
}
export default SearchComponent;