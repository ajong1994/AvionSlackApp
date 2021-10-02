import { useContext } from "react";
import { assignImage, assignBg } from "../utils/Utils";
import { SessionContext } from '../contexts/SessionContext';


const MainHeader = () => {
    const {msgRecipient, recipientMetadata} = useContext(SessionContext);
    return (
        <div className="col-start-2 row-start-1 flex items-center py-2 px-4 border-b border-gray-600">
            {!!(recipientMetadata?.id !== '') && 
                <div className="flex justify-center items-center h-8 w-8 mr-2">
                    <span className={assignBg(recipientMetadata?.id)}>
                        <img src={assignImage(recipientMetadata?.id, recipientMetadata?.type)} className="h-8 w-8 items-center"/>
                        </span>
                </div>
            }
            <h3 className="text-white">{recipientMetadata.id === '' ? 'New message' : msgRecipient}</h3>
        </div>
    )
}

export default MainHeader
