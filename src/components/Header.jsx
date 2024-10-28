import { AppleOutlined, BellOutlined } from '@ant-design/icons'
import { Badge, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='p-5 text-white bg-[#001529] flex items-center justify-between border-b-[1px] border-white'>
        <Link className='pl-2 items-center flex' to={'/'}>
            <AppleOutlined className='text-white scale-[1.7]'/>
            <span className='text-[22px] pl-3.5'>Apple</span>
        </Link>
        <div className='pr-2 flex gap-8 items-center'>
            <Badge count={5} size='small'>
                <BellOutlined className='text-white scale-[1.7]'/>
            </Badge>
            <Button type='primary'>Log Out</Button>
        </div>
    </div>
  )
}

export default Header
