// import React from "react";  // คอมเมนต์การนำเข้า React

// const Warehouse: React.FC = () => {
//   return (
//     <div style={{ display: 'flex' }}>
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h2>เมนูหลัก</h2>
//         <a href="#">หน้าหลัก</a>
//         <a href="#">รายการสินค้า</a>
//         <a href="#">เพิ่มสินค้าใหม่</a>
//         <a href="#">รายงาน</a>
//         <a href="#">ตั้งค่า</a>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <h1>ระบบคลังสินค้า</h1>
//         <h2>รายการสินค้า</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>รหัสสินค้า</th>
//               <th>ชื่อสินค้า</th>
//               <th>จำนวน</th>
//               <th>ราคา</th>
//               <th>การจัดการ</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>001</td>
//               <td>สินค้า A</td>
//               <td>100</td>
//               <td>฿50</td>
//               <td>
//                 <button>แก้ไข</button> <button>ลบ</button>
//               </td>
//             </tr>
//             <tr>
//               <td>002</td>
//               <td>สินค้า B</td>
//               <td>50</td>
//               <td>฿100</td>
//               <td>
//                 <button>แก้ไข</button> <button>ลบ</button>
//               </td>
//             </tr>
//             {/* Add more rows as needed */}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Warehouse;  // คอมเมนต์การส่งออกของคอมโพเนนต์
import React, { useState } from 'react';
import { Table, Input, Button, Space, Row, Col, Divider, message, Tag, Modal, Form, Layout, Breadcrumb } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnType } from 'antd/es/table';
import logo from "../../assets/logo.png";
const { Header, Content, Footer, Sider } = Layout;


interface DataType {
  key: string;
  warehouseCode: string;
  warehouseName: string;
  warehouseType: string;
  capacity: string;
  status: boolean;
  address: string;
  province: string;
  zipcode: string;
}

const data: DataType[] = [
  {
    key: '1',
    warehouseCode: 'W001',
    warehouseName: 'Warehouse A',
    warehouseType: 'Type 1',
    capacity: '5000',
    status: true,
    address: '123 Main St',
    province: 'Bangkok',
    zipcode: '10100',
  },
  {
    key: '2',
    warehouseCode: 'W002',
    warehouseName: 'Warehouse B',
    warehouseType: 'Type 2',
    capacity: '10000',
    status: false,
    address: '456 Second St',
    province: 'Chiang Mai',
    zipcode: '50200',
  },
];

const Warehouse: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Received values: ', values);
      message.success('New warehouse created!');
      setIsModalVisible(false);
    } catch (error) {
      console.log('Validate Failed:', error);
    }
  };

  const columns: ColumnType<DataType>[] = [
    {
      title: 'รหัสคลังสินค้า',
      dataIndex: 'warehouseCode',
      key: 'warehouseCode',
    },
    {
      title: 'ชื่อคลังสินค้า',
      dataIndex: 'warehouseName',
      key: 'warehouseName',
    },
    {
      title: 'ประเภทคลังสินค้า',
      dataIndex: 'warehouseType',
      key: 'warehouseType',
    },
    {
      title: 'ความจุ',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Tag color={status ? 'success' : 'error'}>
          {status ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
        </Tag>
      ),
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
      key: 'address',
      render: (text: string, record: DataType) => (
        <>
          {text}, {record.province} {record.zipcode}
        </>
      ),
    },
  ];
  return (
    <Layout style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {contextHolder}
      {/* Top Header Section */}
      <Header
    style={{
      padding: 0,
      height: '10vh', // กำหนดความสูงของ Header ให้เป็น 10% ของความสูงหน้าจอ
      width: '100%', // ให้ความกว้างของ Header เต็มหน้าจอ
      display: 'flex',
      alignItems: 'center', // จัดตำแหน่งเนื้อหาภายใน Header แนวตั้งให้ตรงกลาง
      backgroundColor: '#10515F', // กำหนดสีพื้นหลังของ Header
    }}
  >
    {/* รูปภาพซ้ายสุด */}
    <img
      //alt="logo"
      alt="Logo"
      src={logo}
      style={{
        width: '100px', // กำหนดขนาดของรูป
        height: 'auto',
        marginLeft: '10px', // ระยะห่างจากขอบซ้าย
      }}
    />
    {/* ข้อความชื่อเว็บไซต์ */}
    <h1 style={{ margin: 0, color: 'white', marginLeft: '10px' }}>
      WAREHOUSE
    </h1>
  </Header>
      
      {/* Content Section */}
      <Content
        style={{
          margin: '0 16px',
          paddingTop: '10px', // ตั้งค่าระยะห่างระหว่าง Header และ Content
          overflow: 'auto', // ป้องกันการเลื่อนขวาซ้าย
          width: '100%',  // กำหนดความกว้างให้เต็มหน้าจอ
          height: 'calc(100vh - 10vh)', // ทำให้ส่วนของ Content ใช้ความสูงที่เหลือจาก Header (10vh)
        }}
      >
        <Breadcrumb style={{ margin: '16px 0' }} />
        <div
          style={{
            padding: 24,
            minHeight: '100%',
            width: '100%',
            boxSizing: 'border-box', // ใช้ box-sizing เพื่อให้ padding นับรวมกับขนาด
          }}
        >
          {/* Your main content goes here */}
          <Row>
            <Col span={12}>
              <h2 style={{ marginTop: -10 }}>คลังสินค้า</h2>
            </Col>
          </Row>
          <Divider style={{ marginTop: -10 }} />
          <Row>
            <Col span={12} style={{ textAlign: 'left', alignSelf: 'left' }}>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{
                    width: '200px',
                    height: '40px',
                    borderRadius: '4px',
                    backgroundColor: '#10515F',
                    borderColor: '#10515F',
                    color: '#ffffff',
                  }}
                  onClick={() => setIsModalVisible(true)}
                >
                  New Warehouse
                </Button>
              </Space>
            </Col>
          </Row>
  
          <Table style={{ marginTop: 20 }} columns={columns} dataSource={data} />
  
          <Modal
            title="Create New Warehouse"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                Save
              </Button>,
            ]}
          >
            <Form form={form} layout="vertical" name="warehouseForm">
              <Form.Item
                label="Warehouse Code"
                name="warehouseCode"
                rules={[{ required: true, message: 'Please input the warehouse code!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Warehouse Name"
                name="warehouseName"
                rules={[{ required: true, message: 'Please input the warehouse name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Warehouse Type"
                name="warehouseType"
                rules={[{ required: true, message: 'Please input the warehouse type!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Capacity"
                name="capacity"
                rules={[{ required: true, message: 'Please input the capacity!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input the address!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Province"
                name="province"
                rules={[{ required: true, message: 'Please input the province!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Zipcode"
                name="zipcode"
                rules={[{ required: true, message: 'Please input the zipcode!' }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Content>
    </Layout>
  );  
}
export default Warehouse;