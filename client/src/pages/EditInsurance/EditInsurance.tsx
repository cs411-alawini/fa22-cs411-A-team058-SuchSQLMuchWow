import React from 'react'
import { useParams } from 'react-router-dom';

const EditInsurance = () => {

    let { id } = useParams();

    return(<div>
        {id}
    </div>)
}

export default EditInsurance