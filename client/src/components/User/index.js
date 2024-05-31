import React, {useState} from 'react'
import axios from 'axios'

const User = props => {
    const {user, onDelete} = props
    const [updateClicked, setUpdateClicked] = useState(false)
    const [userData, setUserData] = useState({
        id: user.id,
        name: user.name,
        age: user.age,
        city: user.city
    })

    const onUpdateUser = () => {
        setUpdateClicked(!updateClicked)
    }
    const updateclass = updateClicked ? '': 'border-0'

    const onChangeName = event => {
        setUserData({...userData, name: event.target.value})
    }

    const onChangeAge = event => {
        setUserData({...userData, age: event.target.value})
    }

    const onChangeCity = event => {
        setUserData({...userData, city: event.target.value})
    }

    const onMakeUpdate = async () => {
        const response = await axios.put('http://localhost:3001/', {...userData})
        console.log(response)

        setUpdateClicked(!updateClicked)

    }

    const onClickDelete = async () => {
        onDelete(userData.id)
    }

    return ( 
        <li className='col-12 col-lg-5 card p-4 mb-4 d-flex flex-row justify-content-between'>
            <div className='d-flex flex-column w-50'>
                <input className={`text-dark fs-4 ${updateclass}`} value={userData.name} onChange={onChangeName}/>
                <input className={`fs-4 text-success ${updateclass}`} value={userData.age} onChange={onChangeAge} />
                <input className={`text-primary fs-5 font-monospace ${updateclass}`} value={userData.city} onChange={onChangeCity}/>
            </div>
            <div className='d-flex flex-column justify-content-around'>
                {updateClicked ? <button className='btn btn-secondary btn-sm' onClick={onMakeUpdate}> Done </button>
                :<button className='btn btn-secondary btn-sm' onClick={onUpdateUser}> Update </button>}
                <button className='btn btn-warning btn-sm' onClick={onClickDelete}> Delete</button>
            </div>
        </li>
    )
}

export default User
