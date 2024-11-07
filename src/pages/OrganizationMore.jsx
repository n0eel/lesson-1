import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Modal, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '../hook/useAxios'
import OrganizationMoreItem from '../components/OrganizationMoreItem'
import toast, { Toaster } from 'react-hot-toast'
import Item from 'antd/es/list/Item'

function OrganizationMore() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [singleData, setSingleData] = useState({})
    const [deleteMoreModal, setDeleteMoreModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)


    function handleCheckSwitch(e) {
        singleData.status = e
        useAxios().put(`/organization/${id}`, singleData).then(res => {
            setRefresh(!refresh)
        })
    }


    function handleMoreDeleteItem() {
        setDeleteMoreModal(true)
    }

    function handleSureMoreDeleteItem() {
        setDeleteMoreModal(false)
        toast.success("Deleting...")
        setIsLoading(true)
        useAxios().delete(`/organization/${id}`).then(res => {
            setTimeout(() => {
                toast.success("Successfully deleted!")
              }, 700)
            setTimeout(() => {
              navigate(-1)
              setIsLoading(false)
            }, 1400)
          });
    }    

    useEffect(() => {
        useAxios().get(`/organization/${id}`).then(res => {
            setSingleData(res.data)  
        })
    }, [refresh])

  return (
    <div className='p-5'>
        <Toaster  position="top-center"  reverseOrder={false}/>
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <ArrowLeftOutlined onClick={() => navigate(-1)} className='pr-3 cursor-pointer' />
                <h2 className='font-bold text-[25px]'>{singleData.name}</h2>
            </div>
            <div className='flex items-center gap-2'>
                <Switch onChange={handleCheckSwitch} size='large' checked={singleData.status}/>
                <Button onClick={() => handleMoreDeleteItem(id)} icon={isLoading ? <LoadingOutlined/> : <DeleteOutlined/>} className='delete-btn' type='primary' size='large'>Delete</Button>
                <Button onClick={() => navigate(`/edit/${id}`)} icon={<EditOutlined/>} className='edit-btn' type='primary' size='large'>Edit</Button>
            </div>
        </div>
        <div className='flex justify-between w-[45%] mt-5'>
            <ul className='p-5 rounded-md border-[1px] border-slate-400 w-full space-y-3'>
                <OrganizationMoreItem  spanTitle={"ID"} strongTitle={singleData.id}/>
                <OrganizationMoreItem  spanTitle={"Organization`s name"} strongTitle={singleData.name}/>
                <OrganizationMoreItem  spanTitle={"INN"} strongTitle={singleData.inn}/>
                <OrganizationMoreItem  spanTitle={"Director`s name"} strongTitle={singleData.director}/>
                <OrganizationMoreItem  spanTitle={"Address"} strongTitle={singleData.address}/>
                <OrganizationMoreItem  spanTitle={"Created time"} strongTitle={singleData.createdOn}/>
                <OrganizationMoreItem  spanTitle={"Status"} strongTitle={singleData.status ? <Checkbox checked={singleData.status}/> : <Checkbox checked={singleData.status}/> }/>
            </ul>
        </div>
        <Modal title='Are you sure?' open={deleteMoreModal} onCancel={() => setDeleteMoreModal(false)} onOk={handleSureMoreDeleteItem}></Modal>
    </div>
  )
}

export default OrganizationMore
