import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeData } from "../utils/searchSlice";
import ResultPage from "./ResultPage";
import { setLoading } from "../utils/loadingSlice";
import LoadingSpinner from "./LoadingSpinner";

const Home = () => {
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("Dive!"); // Ensure correct spelling
    const loading = useSelector((store) => store.loading);
    const dispatch = useDispatch();

    const handleClick = async () => {
        setPlaceholder('Dive!'); // Update placeholder on search start
        dispatch(setLoading(true));
        console.log("Dispatching query:", query); // Debugging log
        dispatch(storeData(query)).then(() => {
            setQuery(""); // Clear input after dispatch
            dispatch(setLoading(false));
        }).catch((error) => {
            console.error("Error dispatching query:", error);
            dispatch(setLoading(false));
        });
    };

    return (
        <>
            <div className="w-full flex justify-center pt-3">
                <span className="text-[1.5rem] text-blue-500">Word</span>
                <span className="w-2"></span>
                <span className="text-[1.5rem] text-red-500">Wizard</span>
            </div>
            <div className="w-full text-[1.1rem] flex justify-center pt-16 pb-4">Ready To Explore!</div>
            <div className="w-full flex justify-center">
                <input 
                    className="border-2 w-[18rem] h-[2.5rem] p-2 rounded-s-md bg-yellow-50 text-[1.1rem]" 
                    placeholder={placeholder} 
                    type="text" 
                    value={query} // Bind input value to query state
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <img 
                    className="h-10 border-2 rounded-e-md bg-slate-200 p-[0.1rem] cursor-pointer" 
                    src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/09_search-1024.png" 
                    alt="Search" 
                    onClick={handleClick} 
                />
            </div>
            {loading && <LoadingSpinner />} {/* Show spinner when loading */}
            <ResultPage />
        </>
    );
};

export default Home;
