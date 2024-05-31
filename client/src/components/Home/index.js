import './index.css'

import {useState, useEffect} from 'react'
import axios from 'axios'
import User from '../User'

const Home = () => {
    const [data, setData] = useState([])
    const [postData, setPostData] = useState({
        name: '',
        age: '',
        city: ''
    })

    const fetchHomeData = async () => {
        const response = await axios.get('http://localhost:3001/')
        setData(response.data.reverse())
    }

    useEffect(() => fetchHomeData, [])

    const onChangename = event => {
        setPostData({...postData, name: event.target.value})
    }

    const onChangeAge = event => {
        setPostData({...postData, age: event.target.value})
    }

    const onChangeCity = event => {
        setPostData({...postData, city: event.target.value})
    }

    const onSubmitForm = async (event) => {
        event.preventDefault()
        const {name, age, city} = postData

        if (name !== '' && age !== '' && city !== ''){
            const response = await axios.post('http://localhost:3001/', {
                name: name,
                age: age,
                city: city
            })

            setPostData({...postData, name: '', age: '', city: ''})

            if (response.status === 200){
                fetchHomeData()
            }
        }
        setPostData({name: '', age: '', city: ''})
    }

    const onDeleteUser = async (id) => {
        const response = await axios.delete(`http://localhost:3001/${id}`)
        console.log(response)
        fetchHomeData()
    }

    return (
        <div className='bg-dark bg-gradient pb-5 pt-5'>
        <div className='container pb-5 pt-5 bg-dark'>
            <div className='row d-flex flex-column justify-content-center align-items-center'>
                <div className='col-12 col-md-8 mb-5 d-flex flex-column'>
                    <h1 className='p-4 text-center text-info'> MYSQL CURD</h1>
                    <p className='text-center font-monospace fs-3 text-info-emphasis'> Create A User</p>
                    <form onSubmit={onSubmitForm}>
                        <input className='mb-3 form-control' value={postData.name}
                            type='text' placeholder='name' onChange={onChangename}/>
                        <input className='mb-3 form-control' value={postData.age}
                            type='text' placeholder='age' onChange={onChangeAge}/>
                        <input className='mb-3 form-control' value={postData.city}
                            type='text' placeholder='city' onChange={onChangeCity}/>
                        <button className='w-100 btn btn-outline-primary'> Submit</button>
                    </form>
                </div>

            </div>
            <div className='row d-flex flex-column justify-content-center align-items-center'>
                <div className='col-12 col-md-8'>
                    <ul className='p-0 d-flex flex-row justify-content-around flex-wrap'>
                        {data.map(item => 
                           <User user={item} key={item.id} onDelete={onDeleteUser} />
                        )}
                    </ul>
                </div>
            </div>
        </div>
        </div>
    )
}
 

export default Home
