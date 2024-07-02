import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
        setResultData(prev=>prev+nextWord)
    },75*index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResults(false);
  }

  const onSend = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResults(true);

    let response;
    if (prompt!== undefined) {
        response = await run(prompt);
        setRecentPrompts(prompt);
    }else{
        setPrevPrompts((prev) => [...prev, input]);
        setRecentPrompts(input);
        response = await run(input);
    }
 
    let responeArray = response.split("**");
    let newResponse="";
    for (let index = 0; index < responeArray.length; index++) {
      if (index === 0 || index % 2 !== 1) {
        newResponse += responeArray[index];
      } else {
        newResponse += "<b>" + responeArray[index] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponse3 = newResponse2.split(" ");
    for (let index = 0; index < newResponse3.length; index++) {
      const nextWord = newResponse3[index];
      delayPara(index, nextWord+" ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSend,
    setRecentPrompts,
    recentPrompts,
    showResults,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
