import { useRef } from "react"
import { PaperAirplaneIcon } from "@heroicons/react/solid";

const ChatInterface = ({msgStat}) => {

    //Create state for input value here for searching for message recipient 
    //import message util functions
    const msgRef = useRef();

    return (
        <div className="col-start-2 row-start-2 flex flex-col">
            {msgStat &&
            <div className="flex text-gray-300 items-center p-4 border-b border-gray-600">
                <p className="pr-4">To:</p>
                <input type="text" className="bg-transparent w-full border-0 focus:ring-0 focus:outline-none" 
                placeholder="#a-channel, @uid, or somebody@example.com"/>
            </div>}
            <div className='p-4 flex-grow text-gray-200'>
                Messages will be mapped here.
            </div>
            <div className="mt-auto flex gap-2 p-4">
                <textarea 
                className="custom-textarea"
                ref={msgRef}
                placeholder="Enter a message"
                ></textarea>
                <div className="bg-green-700 hover:bg-green-500 cursor-pointer flex items-center justify-center px-4 rounded">
                    <PaperAirplaneIcon className="h-6 w-6 transform rotate-45 -mt-1 pb-1 text-white"/>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface
