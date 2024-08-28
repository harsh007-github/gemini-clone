import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    //Mainitaing states of various UI components like search bar, welcome screen, recentchat, loading the result and displaying the result
    const [input, setInput] = useState(""); 
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPrevioustPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response = "";
        if(prompt !== undefined)
        {
            response = await run(prompt);
            setRecentPrompt(prompt);
            
        }
        else
        {
            setPrevioustPrompt(prev=>[...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }
        setResultData(response);
        setLoading(false);
        setInput("");
        return response;
    }
    
    const contextValue = {
        previousPrompt,
        setPrevioustPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider> 
    );
}
export default ContextProvider