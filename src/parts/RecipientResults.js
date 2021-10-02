import { assignImage, assignBg } from "../utils/Utils";

const RecipientResults = ({onClick, recipientList, resultChannelList}) => {
    return (
        <div className="text-gray-200 max-h-96 overflow-y-auto ml-6 mr-2 border-gray-300 border rounded-lg bg-gray-700 py-2">
            { !!resultChannelList?.length && resultChannelList.map((channel) => (
                <div key={channel.id} onClick={() => onClick({identifier: channel?.name, id: channel?.id, type:'Channel'})}>
                    <div className="px-6 py-1 flex gap-2 text-white hover:bg-white hover:text-gray-700 cursor-pointer">
                        <span className="flex justify-center items-center">
                            <span className={assignBg(channel?.id)}>
                                <img src={assignImage(channel?.id, "Channel")} className="h-5 w-5 items-center rounded"/>
                            </span>
                        </span>
                        <span>
                            #{channel.name}
                        </span>
                    </div>
                </div>
            ))}
            { !!recipientList?.length && recipientList.map((recipient) => (
                <div key={recipient.id} onClick={() => onClick({identifier: recipient?.email, id: recipient?.id, type:'User'})}>
                    <div className="px-6 py-1 flex gap-2 text-white hover:bg-white hover:text-gray-700 cursor-pointer">
                        <span className="flex justify-center items-center">
                            <span className={assignBg(recipient?.id)}>
                                <img src={assignImage(recipient?.id, "User")} className="h-5 w-5 items-center rounded"/>
                            </span>
                        </span>
                        <span>
                            {recipient.email}
                        </span>
                        <span>
                            (UID: {recipient.id})
                        </span>
                    </div>
                </div>
            ))}
            {(!resultChannelList?.length && !recipientList?.length) &&
            <div className="py-2 px-6">
                No items
            </div>
            }
        </div>
    )
}

export default RecipientResults
