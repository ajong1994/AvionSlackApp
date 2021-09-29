
const RecipientResults = ({recipientList}) => {
    return (
        <div className="text-gray-200 max-h-96 overflow-y-auto ml-6 mr-2 border-gray-300 border rounded-lg
            p-6 bg-gray-700">
            {recipientList?.length > 0 
            ? recipientList.map((recipient) => (
                <p key={recipient.id}>{recipient.email}</p>
            ))
            : <p>No items</p>
            }
        </div>
    )
}

export default RecipientResults
