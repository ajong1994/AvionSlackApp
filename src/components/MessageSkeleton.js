
const MessageSkeleton = () => {
    return (
        <div className="p-4 max-w-2xl w-full">
            <div className="animate-pulse flex flex-col space-y-4">
                <div className="flex space-x-4 items-center">
                    <div className="rounded bg-gray-400 h-8 w-8"></div>
                        <div className="flex-1 items-center py-1">
                            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                            <div className="space-y-2">
                        </div>
                    </div>
                </div>
                <div className="h-2 bg-gray-400 rounded"></div>
            </div>
        </div>
    )
}

export default MessageSkeleton
