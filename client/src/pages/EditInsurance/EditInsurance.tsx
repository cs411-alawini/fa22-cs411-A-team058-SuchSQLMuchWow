import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {AddNewInsurance} from "../AddNewInsurance";

type PropType = {
    id: string
}

const EditInsurance = () => {

    let { id } = useParams();
    const navigate = useNavigate();
    const urlParams = { id }
    return <AddNewInsurance {...urlParams} navigate={navigate} />
}

export default EditInsurance