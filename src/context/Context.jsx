import { createContext, useState } from "react";
import runChat from '../config/Gemini'

export const Context = createContext();

const ContextProvider = (props) => {

    // for saving the input data
    const [input, setInput] = useState("");

    // when the send button is clicked it will be displayed
    const [recentPrompt, setRecentPrompt] = useState("");

    // used to save input history and display in recent tab
    const [previousPrompts, setPreviousPrompts] = useState([]);

    // greet text will be hidden and replaced with results
    const [showResult, setShowResult] = useState(false);

    // display loading animation
    const [loading, setLoading] = useState(false);

    const delayPara = (index, nextWord) => {
        setTimeout (function () {
            setResultData(prev => prev+nextWord)
        },75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    // used to display result on UI
    const [resultData, setResultData] = useState("");

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)

        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt)
            setRecentPrompt(prompt)
        } else {
            setPreviousPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        // setRecentPrompt(input)
        // setPreviousPrompts(prev => [...prev, input])
        // const response = await runChat(input)

        let responseArray = response.split("**")
        let newResponse="";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i%2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>"+responseArray[i]+"</b>"
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ")
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i]
            delayPara(i, nextWord+" ")
        }

        setLoading(false)
        setInput("")
    }

    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider