import React from 'react';
import { Table } from 'antd';

const CustomTable = ({tHead, tBody, isLoading}) => <Table loading={isLoading} className='shadow-md shadow-[#8b7700] rounded-md' columns={tHead} dataSource={tBody} />;
export default CustomTable;