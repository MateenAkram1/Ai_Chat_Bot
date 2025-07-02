import React from 'react'
import {Send} from 'lucide-react';
export default function ChatInput({darkMode,input,setinput ,loading,handleSendMessage}) {
  return (
    <div className={`${darkMode?"bg-gray-800 border-t border-gray-700":
    "bg-white border-t border-gray-200"}p-4 my-2`}>
        <div className='max-w-5xl mx-auto'>
            <div className='flex items-center space-x-3'>
                <input type="text" 
                value={input}
                onChange={(e)=>setinput(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === "Enter" && !e.shiftKey){
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
                placeholder='Type your message' className={`flex-1 border ${darkMode?
                    "bg-gray-700 border-gray-600 text-white placeholder-gray-400":
                    "bg-white border-gray-300 text-gray-900"
                } rounded-full px-5 py-3 focus:border-transparent`}/>
            <button className={`p-3 rounded-full transition-colors shadow-md cursor-pointer`}
            onClick={handleSendMessage}
            disabled={loading ||!input.trim()}
            >
                <Send className={`${darkMode?"text-white":"text-gray-800"}`}/>
            </button>
            </div>
        </div>
    </div>
  )
}
