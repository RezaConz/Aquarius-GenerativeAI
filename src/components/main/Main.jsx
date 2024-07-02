import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSend,
    recentPrompts,
    showResults,
    loading,
    resultData,
    input,
    setInput,
    setRecentPrompts,
  } = useContext(Context);

  return (
    <div className='main'>
      <div className='nav'>
        <p>Aquarius</p>
        <img src={assets.user_icon} alt='' />
      </div>
      <div className='main-container'>
        {!showResults ? (
          <>
            <div className='greet'>
              <p>
                <span>Hello, Traveler</span>
              </p>
              <p>How can i help you today?</p>
            </div>
            <div className='cards'>
              <div
                onClick={() =>
                  onSend("What are the best places to visit in Semarang?") &&
                  setRecentPrompts(
                    "What are the best places to visit in Semarang?"
                  )
                }
                className='card'
              >
                <p>What are the best places to visit in Semarang?</p>
                <img src={assets.compass_icon} alt='' />
              </div>
              <div
                onClick={() =>
                  onSend("Predict my future") &&
                  setRecentPrompts("Predict my future")
                }
                className='card'
              >
                <p>Predict my future</p>
                <img src={assets.bulb_icon} alt='' />
              </div>
              <div
                onClick={() =>
                  onSend("Gemini and GPT, who is better?") &&
                  setRecentPrompts("Gemini and GPT, who is better?")
                }
                className='card'
              >
                <p>Gemini and GPT, who is better?</p>
                <img src={assets.message_icon} alt='' />
              </div>
              <div
                onClick={() =>
                  onSend("Code for GPT-5 please") &&
                  setRecentPrompts("Code for GPT-5 please")
                }
                className='card'
              >
                <p>Code for GPT-5 please</p>
                <img src={assets.code_icon} alt='' />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} alt='' />
              <p>{recentPrompts}</p>
            </div>
            <div className='result-data'>
              <img src={assets.aquarius_icon} alt='' />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className='main-bottom'>
          <div className='search-box'>
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSend();
                }
              }}
              value={input}
              type='text'
              placeholder='Enter a promt here'
            />
            <div>
              {/* <img src={assets.gallery_icon} alt='' />
              <img src={assets.mic_icon} alt='' /> */}
              {input ? (
                <img onClick={() => onSend()} src={assets.send_icon} alt='' />
              ) : (
                <img src={assets.send_icon} alt='' />
              )}
            </div>
          </div>
          <p className='bottom-info'>
            Aquarius may display inaccurate info, including about people, so
            double-check its responses. Your privacy & Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
