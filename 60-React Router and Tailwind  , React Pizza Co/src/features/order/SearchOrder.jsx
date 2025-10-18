import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchOrder(){
const [query, setQuery] = useState("");
const navigate = useNavigate();

function handleSubmit(e){
    e.preventDefault();
    // now we want to move to page order/id , when we enter
    if(!query) return;
    navigate(`/order/${query}`)
    setQuery("");

}
    return (
        <form onSubmit={handleSubmit} className="border-r-0">
        <input placeholder="Search order number" value={query} onChange={e=>setQuery(e.target.value)} className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-72 sm-focus:w-80" />
        </form>
    )
}

export default SearchOrder;