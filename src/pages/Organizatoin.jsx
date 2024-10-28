import { Input, Select, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import PageInfo from '../components/PageInfo'
import CustomTable from '../components/CustomTable'
import { HTTP } from '../hook/useEnv';
import axios from 'axios';
import { DashOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useDebounce from '../hook/useDebounce';

function Organizatoin() {
  const [tBodyData, setTBodyData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const tHeadData = [
    {
      title: 'ID',
      dataIndex: 'id',
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

  function handleSearchOrganization(e) {
    setIsLoading(true)
    setSearchData(e.target.value.toLowerCase())
    if (!e.target.value) {
      setTimeout(() => setRefresh(!refresh), 1000)
    }
  }

  const searchByName = useDebounce(searchData, 1000)

  useEffect(() => {
    if (searchByName) {
      setIsLoading(false)
     const filteredData = tBodyData.filter(item => item.name.toLowerCase().includes(searchByName))
     setTBodyData(filteredData)
    }
  }, [searchByName])

  useEffect(() => {
    axios(`${HTTP}/organization`).then(res => {
      setIsLoading(false)
      setTBodyData(res.data.map(item => {
        item.action = <div className='flex items-center gap-5'>
          <DashOutlined className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-[#8b7700] scale-[1.3]'/>
          <EditOutlined className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-[#8b7700] scale-[1.3]'/>
          <DeleteOutlined className='hover:scale-[1.5] duration-300 cursor-pointer hover:text-[#8b7700] scale-[1.3]'/>
        </div>
        item.status = <Switch defaultChecked={item.status} size='small'/>;
        return item
      }))
    })
  }, [refresh])

  console.log(tBodyData)

  return (
    <div className='p-5'>
      <PageInfo title={"Organizations"} subtitle={"organizations"} count={25} btnTitle={"Add"}/>
      <div className='my-5 flex items-center gap-5'>
        <Input onChange={handleSearchOrganization} className='w-[300px]' allowClear placeholder='Search...' type='text' size='large'/>
        <Select
          className='w-[300px]'
          showSearch
          placeholder="Select by INN"
          size='large'
          optionFilterProp="label"
          options={[
          {
            value: 'jack',
            label: 'Jack',
          }
        ]}
      />
      </div>
      <div>
        <CustomTable isLoading={isLoading} tBody={tBodyData} tHead={tHeadData}/>
      </div>
    </div>
  )
}

export default Organizatoin
