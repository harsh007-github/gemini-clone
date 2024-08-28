import React, {useState, useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../Context/Context";
import Markdown from 'react-markdown'

function checkEnter(e, onSent) {
  if (e.key === 'Enter') {
    onSent();  
  }
}

const TypingEffect = ({ resultData }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const typingSpeed = 30; // Adjust typing speed (in ms) for words

  // Split the resultData into an array of words
  const words = resultData.split(" ");

  useEffect(() => {
    if (index < words.length) {
      const timeout = setTimeout(() => {
        // Append the next word to displayedText
        setDisplayedText((prev) => prev + (index > 0 ? " " : "") + words[index]);
        setIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [index, words]);

  return (
    <Markdown>
      {displayedText}
    </Markdown>
  );
};

const Main = () => {
  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)
  return (
    <div className="Main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {
          !showResult
          ?
            <>
            <div className="greet">
            <p>
              {" "}
              <span>Hello, Harsh.</span>{" "}
            </p>
            <p>How Can I Help You Today?</p>
          </div>
          <div className="cards">
            <div className="card">
            <p>Suggest some beautiful places to visit in India</p>
            <img src={assets.compass_icon} alt="" />
            </div>    
            <div className="card">
              <p>Tell me the current rankings of Paris Olympics 2024</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
              <p>Give me the format of a formal email</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
              <p>Briefly summarize the topic:- Binary Search</p>
              <img src={assets.code_icon} alt="" />
            </div>
          </div>
            </>
          : 
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon}/>
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon}/>
                {
                  loading
                  ?
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                  :
                  <p>
                      <TypingEffect resultData={resultData}/>
                  </p> 
                }
              </div>    
            </div>
          
        }
        <div className="main-bottom">
          <div className="search-bar">
              <input onKeyDown={(e) => checkEnter(e, onSent)} onChange={(e) =>{setInput(e.target.value)}} value={input} type="text" placeholder="Enter a prompt here"/>
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <img onClick={()=> {onSent()}} src={assets.send_icon} alt="" />
              </div>
          </div>
          <p className="bottom-info">Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini AppsOpens</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
