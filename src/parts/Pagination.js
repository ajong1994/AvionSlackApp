import axios from 'axios';
import React from 'react'
import { useState, useEffect, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { AuthContext } from '../contexts/AuthContext'
import { SessionContext } from '../contexts/SessionContext'
import { getAllUsers } from '../utils/Utils';


const Pagination = () => {
    const { activeUser } = useContext(AuthContext)
    const { updateUserList } = useContext(SessionContext)
    
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPAge] = useState(10)


    useEffect(() => {
        getAllUsers(activeUser, updateUserList)
        setItems(updateUserList)
    }, [])


    console.log(items)



    return (
        <div>
            
        </div>
    )

}


export default Pagination
