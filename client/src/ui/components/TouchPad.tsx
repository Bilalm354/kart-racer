import React from "react"
import { keyboard } from "~/misc/Keyboard"

export const Touchpad = () => {
    return (
        <>
            <div className="controls" id="go" onTouchStart={() => keyboard.up = true} onTouchEnd={() => keyboard.up = false}></div>
            <div className="controls" id="stop" onTouchStart={() => keyboard.down = true} onTouchEnd={() => keyboard.down = false}></div>
            <div className="controls" id="turbo" onTouchStart={() => keyboard.space = true} onTouchEnd={() => keyboard.space = false}></div>
            <div className="controls" id="left" onTouchStart={() => keyboard.left = true} onTouchEnd={() => keyboard.left = false}></div>
            <div className="controls" id="right" onTouchStart={() => keyboard.right = true} onTouchEnd={() => keyboard.right = false}></div>
        </>
    )
}