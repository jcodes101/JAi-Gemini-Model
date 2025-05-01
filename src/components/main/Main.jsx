import React, { useContext } from "react";
import { assets } from "../../assets/assets"
import { Context } from "../../context/Context";
import "./Main.css"
import { FaRegLightbulb, FaUserAstronaut } from "react-icons/fa";
import { TbBrandSafari, TbSend } from "react-icons/tb";
import { FaRegMessage, FaCode } from "react-icons/fa6";
import { IoSparklesOutline, IoMicOutline } from "react-icons/io5";
import { RiImageCircleLine } from "react-icons/ri";


const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)

    return (

        <div className="main">
            <div className="nav">
                <p>JAi</p>
                <FaUserAstronaut className="astronaut-user-icon" />
            </div>

            <div className="main-container">

                {!showResult?
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>

                        <div className="cards">
                            <div 
                            className="card"
                            onClick={() => onSent("Suggest top computers for Computer Science majors.")}
                            >
                                <p>Suggest top computers for Computer Science majors.</p>
                                <TbBrandSafari className="safari-icon"/>
                            </div>

                            <div 
                            className="card"
                            onClick={() => onSent("Tell me a story.")}
                            >
                                <p>Tell me a story.</p>
                                <FaRegLightbulb className="lightbulb-icon" />
                            </div>

                            <div 
                            className="card"
                            onClick={() => onSent("What do you think of the NBA right now?")}
                            >
                                <p>What do you think of the NBA right now?</p>
                                <FaRegMessage className="chat-message-icon" />
                            </div>

                            <div 
                            className="card"
                            onClick={() => onSent("Help me write and understand my code.")}
                            >
                                <p>Help me write and understand my code.</p>
                                <FaCode className="code-icon" />
                            </div>
                        </div>
                    </>
                    :<div className="result">
                        <div className="result-title">
                            <FaUserAstronaut className="astronaut-user-icon" />
                            <p>{recentPrompt}</p>
                        </div>

                        <div className="result-data">
                            <IoSparklesOutline className="sparkle-icon" />
                            {loading?
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                        </div>

                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSent();
                            }
                        }}
                        value={input}
                        type="text" 
                        placeholder="Type Here..."/>
                        <div>
                            <RiImageCircleLine className="image-opener-icon" />
                            <IoMicOutline className="mic-icon" />
                            {input?
                                <TbSend onClick={() => onSent()} className="send-icon" />
                            :null}
                        </div>
                    </div>

                    <p className="bottom-info">
                        Type wise boy.
                        <br/>
                        <br/>
                        Disclaimer: This project is independently developed and is not affiliated with, endorsed by, or intended to replicate Google's Gemini AI. All trademarks and product names are the property of their respective owners.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main;