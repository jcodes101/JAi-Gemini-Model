import React, { useContext, useCallback, useState } from "react";
import './Sidebar.css'
import { assets } from "../../assets/assets.js"
import { Context } from "../../context/Context.jsx";
import { FiMenu, FiPlus, FiMessageCircle, FiHelpCircle, FiActivity, FiSettings } from 'react-icons/fi';

const Sidebar = () => {

    const[extended, setExtended] = useState(false)
    const {onSent, previousPrompts, setRecentPrompt, newChat} = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (

        <div className={`sidebar ${extended ? "extended" : ""}`}>

            <div className="top">
                <FiMenu onClick={() => setExtended(prev=>!prev)} className="menu" />
                <div onClick={() => newChat()} className="new-chat">
                    <FiPlus className="new-chat-icon" />
                    {extended?<p>New Chat</p>:null}
                </div>

                {extended?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {previousPrompts.map((item, index) => {
                            return (
                                <div
                                onClick={() => loadPrompt(item)}
                                key={item.id} 
                                className="recent-entry">
                                    <FiMessageCircle className="message-icon"/>
                                    <p>{item.slice(0,5)} ...</p>
                                </div>
                            )
                        })}
                        
                    </div>
                :null}           
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <FiHelpCircle className="help-icon" />
                    {extended?<p>Help</p>:null}
                </div>

                <div className="bottom-item recent-entry">
                    <FiActivity className="activity-icon" />
                    {extended?<p>Activity</p>:null}
                </div>

                <div className="bottom-item recent-entry">
                    <FiSettings className="settings-icon" />
                    {extended?<p>Settings</p>:null}
                </div>
 
            </div>
        </div>
    )
}

export default Sidebar;
