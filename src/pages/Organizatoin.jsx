import { Input, Modal, Select, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import PageInfo from '../components/PageInfo'
import CustomTable from '../components/CustomTable'
import { HTTP } from '../hook/useEnv';
import axios from 'axios';
import { DashOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useDebounce from '../hook/useDebounce';
import {usePath} from '../hook/usePath'
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../hook/useAxios';

function Organizatoin() {
  const navigate = useNavigate()
  const [tBodyData, setTBodyData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [innData, setInnData] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)

  const tHeadData = [
    {
      title: 'ID',
      dataIndex: 'key',
    },
    {
      title: 'Organization',
      dataIndex: 'name',
    },
    {
      title: 'INN',
      dataIndex: 'inn',
    },
    {
      title: 'Director',
      dataIndex: 'director',
    },
    {
      title: 'Created time',
      dataIndex: 'createdOn',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Details',
      dataIndex: 'action',
    },
  ];

  const [searchData, setSearchData] = useState("")

  function handleChangeSwitch(item, evt) {
    item.status = evt
    useAxios().put(`/organization/${item.id}`, item).then(res => {
        setRefresh(!refresh)
    })
  }


  function handleSearchOrganization(e) {
    setIsLoading(true)
    setSearchData(e.target.value.toLowerCase())
    if (!e.target.value) {
      setTimeout(() => setRefresh(!refresh), 1000)
    }
  }

  const [deleteId, setDeleteId] = useState(null)
  function handleDeleteItem(id) {
    setDeleteModal(true)
    setDeleteId(id)
  }

  function handleSureDeleteItem() {
    setDeleteModal(false)
    setIsLoading(true)
    useAxios().delete(`/organization/${deleteId}`).then(res => {
      setTimeout(() => {
        setIsLoading(false)
        setRefresh(!refresh)
      }, 1000)
    });
  }

  const searchByName = useDebounce(searchData, 1000)

  useEffect(() => {
    if (searchByName) {
      setIsLoading(false)
     const filteredData = tBodyData.filter(item => item.name.toLowerCase().includes(searchByName))
     setTBodyData(filteredData)
    }
  }, [searchByName])


  const [innId, setInnId] = useState("")

  function handleInnSelectChange(e) {
    setIsLoading(true)
    setTimeout(() => setInnId(e), 500)
  }

  useEffect(() => {
   useAxios().get(`/organization?id=${innId ? innId : ""}`).then(res => {
      setIsLoading(false)
      setTBodyData(res.data.map((item, index) => {
        item.action = <div className='flex items-center gap-5'>
          <DashOutlined onClick={() => navigate(`${item.id}`)} className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-[#8b7700] scale-[1.3]'/>
          <EditOutlined onClick={() => navigate(`/edit/${item.id}`)} className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-[#8b7700] scale-[1.3]'/>
          <DeleteOutlined onClick={() => handleDeleteItem(item.id)} className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-[#8b7700] scale-[1.3]'/>
        </div>
        item.key = index + 1
        item.status = <Switch onChange={(evt) => handleChangeSwitch(item, evt)} checked={item.status} size='small'/>;
        return item
      }))
    })
  }, [refresh, innId])

  useEffect(() => {
    axios(`${HTTP}/organization`).then(res => {
      setInnData(res.data.map(item => {
        const data = {
          label: `INN: ${item.inn}`,
          value: item.id
        }
        return data 
      }))
    })
  }, [])


  return (
    <div className='p-5'>
      <PageInfo addPath={usePath.organizationAdd} title={"Organizations"} subtitle={"organizations"} count={25} btnTitle={"Add"}/>
      <div className='flex items-center gap-5 my-5'>
        <Input onChange={handleSearchOrganization} className='w-[300px]' allowClear placeholder='Search...' type='text' size='large'/>
        <Select
          onChange={handleInnSelectChange}
          allowClear
          className='w-[300px]'
          showSearch
          placeholder="Select by INN"
          size='large'
          optionFilterProp="label"
          options={innData}
      />
      </div>
      <div>
        <CustomTable isLoading={isLoading} tBody={tBodyData} tHead={tHeadData}/>
      </div>
      <Modal title='Are you sure?' open={deleteModal} onCancel={() => setDeleteModal(false)} onOk={handleSureDeleteItem}></Modal>
    </div>
  )
}

export default Organizatoin
