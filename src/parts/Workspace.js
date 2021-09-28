import { PencilAltIcon } from "@heroicons/react/outline"

const Workspace = ({onClick}) => {
    return (
        <div className="col-start-1 col-end-2 row-start-1 px-4 py-2 flex items-center justify-between bg-gray-900 border-b border-r border-gray-600">
            <h2 className="text-white">Avion School</h2>
            <span className="rounded-full bg-white p-2 flex justify-center items-center" onClick={() => onClick(true)}>
                <PencilAltIcon className="h-4 w-4"/>
            </span>
        </div>
    )
}

export default Workspace
