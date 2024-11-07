import { AppstoreAddOutlined, ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Checkbox, DatePicker, Input } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HTTP } from '../hook/useEnv'
import toast, { Toaster } from 'react-hot-toast'
import { useAxios } from '../hook/useAxios'
import dayjs from 'dayjs'

function OrganizationAdd() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [inn, setInn] = useState("")
    const [director, setDirector] = useState("")
    const [createdOn, setCreatedOn] = useState("")
    const [address, setAddress] = useState("")
    const [status, setStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const dateFormat = 'YYYY-MM-DD';

    function handleAddOrganization(e) {
        e.preventDefault()
        const data = { name, inn, director, createdOn, status, address }
        if (id) {
            data.id = id
            toast.success("Adding...")
            setIsLoading(true)
            useAxios().put(`${HTTP}/organization/${id}`, data).then(res => {
                    setTimeout(() => {
                        toast.success("Successfully added")
                    }, 700);
                    setTimeout(() => {
                        setIsLoading(false)
                        navigate(-1)
                    }, 1400)
                });
        }else{
            toast.success("Adding...")
            setIsLoading(true)
            useAxios().post(`${HTTP}/organization`, data).then(res => {
                    setTimeout(() => {
                        toast.success("Successfully added")
                    }, 700);
                    setTimeout(() => {
                        setIsLoading(false)
                        navigate(-1)
                    }, 1400)
                });
        }
    }

    useEffect(() => {
        if (id) {
            useAxios().get(`/organization/${id}`).then(res => {
                setName(res.data.name)
                setInn(res.data.inn)
                setDirector(res.data.director)
                setCreatedOn(res.data.createdOn)
                setAddress(res.data.address)
                setStatus(res.data.status)
            })
        }
    }, [])

  return (  
    <form onSubmit={handleAddOrganization} className='p-5'>
        <Toaster position="top-center" reverseOrder={false}/>
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
            <ArrowLeftOutlined onClick={() => navigate(-1)} className='pr-3 cursor-pointer'/>
            <h2 className='font-bold text-[25px]'>{id ? "Edit" : "Add"} Organization</h2>
            </div>
            <Button htmlType='submit' icon={isLoading ? <LoadingOutlined/> : <AppstoreAddOutlined/>} size='large' type='primary'>{id ? "Edit" : "Save"}</Button>
        </div>
        <div className='flex mt-5'>
            <div className='w-[45%] p-5 border-[1px] border-slate-400 rounded-md space-y-5'>
                <label className='flex flex-col'>
                    <span className='text-[15px] text-slate-400 mb-1'>Enter Organization`s name</span>
                    <Input value={name} onChange={(e) => setName(e.target.value)} size='large' allowClear placeholder='Enter Organization`s name'/>
                </label>    
                <label className='flex flex-col'>
                    <span className='text-[15px] text-slate-400 mb-1'>Enter INN</span>
                    <Input type='number' value={inn} onChange={(e) => setInn(e.target.value)} size='large' allowClear placeholder='Enter INN'/>
                </label>    
                <label className='flex flex-col'>
                    <span className='text-[15px] text-slate-400 mb-1'>Enter Director`s name</span>
                    <Input value={director} onChange={(e) => setDirector(e.target.value)} size='large' allowClear placeholder='Enter name'/>
                </label>    
                <label className='flex flex-col'>
                    <span className='text-[15px] text-slate-400 mb-1'>Enter Created Time</span>
                    <DatePicker value={dayjs(createdOn, dateFormat)} onChange={(b) => setCreatedOn(b)} size='large' placeholder='Enter time' />
                </label>    
                <label className='flex flex-col'>
                    <span className='text-[15px] text-slate-400 mb-1'>Enter Organization`s Address</span>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} size='large' allowClear placeholder='Enter address'/>
                </label>    
                <label className='flex flex-col'>
                    <span className='text-[15px] text-slate-400 mb-1'>Status</span>
                    <Checkbox checked={status} onChange={(a) => setStatus(a.target.checked)}>Status</Checkbox>
                </label>    
            </div>    
        </div>    
    </form>
  )
}

export default OrganizationAdd
