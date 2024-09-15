import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import geminiLogic from "../hooks/gemini";
import { setLoading } from "../utils/loadingSlice";
import LoadingSpinner from "./LoadingSpinner"; // Assuming you have a LoadingSpinner component
import { defaultPrompt } from "../constant";

const ResultPage = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const searchQuery = useSelector((store) => store.search);
    const isLoading = useSelector((store) => store.loading); // Assuming you have a loading state in the store

    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery) {
                dispatch(setLoading(true));
                try {
                    const response = await geminiLogic(defaultPrompt+searchQuery);
                    setText(response);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    dispatch(setLoading(false));
                }
            }
        };
        fetchData();
    }, [searchQuery, dispatch]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.log('Failed!')
        }
        
        // Reset the message after a few seconds
        setTimeout(() => {
        }, 2000);
    };

    return (
        <div className="text-[1rem] w-full p-5">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="w-full rounded-md scroll-m-0 text-justify">
                    {text === "" ? (
                        <div className="w-full flex justify-center">
                            <img
                                className="h-40 opacity-20 rounded-full"
                                src="https://imgs.search.brave.com/jP17lJ9jpAg8n4Pur3aYvo4qT2T0cBbW5oyjuPTyzTM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzQxLzE5LzEx/LzM2MF9GXzI0MTE5/MTE3MF9ObXJ3aEtN/d0dOczRBdlZSWWVC/S3VTbGQ2WEx0ZU9E/cy5qcGc"
                                alt="Loading"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-40 overflow-y-scroll scrollbar-hidden"><div className="w-full font-semibold pb-2 px-1 flex justify-between">{searchQuery}<img className="h-6 cursor-pointer" src="https://imgs.search.brave.com/S2s1wkO5rUHeTyYe6fY2CizOz2LaAe65Ul-1jmGFzZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/aWNvbnMuaW8vYXNz/ZXQvaW1hZ2VzL2F0/dHJpYnV0ZS1jb3B5/LnN2Zw" onClick={handleCopy}></img></div>{text}</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResultPage;
