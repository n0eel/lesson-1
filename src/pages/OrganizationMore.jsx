import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '../hook/useAxios'
import OrganizationMoreItem from '../components/OrganizationMoreItem'
import toast, { Toaster } from 'react-hot-toast'

function OrganizationMore() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [singleData, setSingleData] = useState({})
    const [deleteMoreModal, setDeleteMoreModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [deleteMoreId, setDeleteMoreId] = useState(null)

    function handleMoreDeleteItem(id) {
        setDeleteMoreModal(true)
        setIsLoading(id)
        setDeleteMoreId(id)
    }

    function handleSureMoreDeleteItem() {
        setDeleteMoreModal(false)
        setIsLoading(true)
        toast.success("Deleting...")
        useAxios().delete(`/organization/${deleteMoreId}`).then(res => {
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
    }, [])

  return (
    <div className='p-5'>
        <Toaster  position="top-center"  reverseOrder={false}/>
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <ArrowLeftOutlined onClick={() => navigate(-1)} className='pr-3 cursor-pointer' />
                <h2 className='font-bold text-[25px]'>{singleData.name}</h2>
            </div>
            <div className='flex items-center gap-2'>
                <Button onClick={() => handleMoreDeleteItem(id)} icon={isLoading ? <LoadingOutlined/> : ""} className='delete-btn' type='primary' size='large'>Delete</Button>
                <Button className='edit-btn' type='primary' size='large'>Edit</Button>
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
