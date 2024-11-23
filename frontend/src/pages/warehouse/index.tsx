import { useState, useEffect, useMemo } from "react";
import { Layout, Typography, Input, Button, Table, Space, Image, Modal, Form, Select, Tag, Card, message } from 'antd';
import { PlusOutlined, SearchOutlined, UserOutlined, DeleteTwoTone, DeleteFilled, EditTwoTone } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import logo from "../../assets/logo.png";
import w1 from "../../assets/w1.png";
import { WarehousesInterface } from "../../interfaces/Warehouses";
import { WarehouseTypesInterface } from "../../interfaces/WarehouseTypes";
import { GetWarehouses, DeleteWarehousesById } from "../../services/https";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const WarehouseLogo = () => (
  <Image
    alt="Logo"
    src={logo}
    preview={false}
    style={{
      width: '150px',
      height: 'auto',
      marginLeft: '0',
      marginTop: '-22px'
    }}
  />
);

function WarehouseManagement() { 
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState<WarehousesInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const myId = localStorage.getItem("id");
  const [searchQuery, setSearchQuery] = useState('');

  // Filter warehouses based on search query
  const filteredWarehouses = useMemo(() => {
    const lowercaseQuery = searchQuery.toLowerCase().trim(); 

    if (!lowercaseQuery) {
      return warehouses;
    }

    return warehouses.filter((warehouse) => {
      return (
        warehouse.WarehouseName?.toLowerCase().includes(lowercaseQuery) ||
        warehouse.WarehouseID?.toLowerCase().includes(lowercaseQuery) ||
        warehouse.Address?.toLowerCase().includes(lowercaseQuery)
      );
    });
  }, [warehouses, searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const columns: ColumnsType<WarehousesInterface> = [
    {
      title: 'Warehouse ID',
      dataIndex: 'warehouse_id',
      key: 'warehouse_id',
      width: 150,
      sorter: (a, b) => a.WarehouseID?.localeCompare(b.WarehouseID || '') || 0,
    },
    {
      title: 'Warehouse Name',
      dataIndex: 'warehouse_name',
      key: 'warehouse_name',
      width: 200,
      sorter: (a, b) => a.WarehouseName?.localeCompare(b.WarehouseName || '') || 0,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Type',
      key: 'warehouse_type',
      render: (record) => {
        // กำหนดสีตามประเภท WarehouseType
        const type = record?.warehouse_type?.warehouse_type;
        let color = 'purple'; // ค่า default
        if (type === 'Cold Storage') {
          color = 'blue';
        } else if (type === 'Dry Storage') {
          color = 'green';
        } else if (type === 'Hazardous Storage') {
          color = 'red';
        } else if (type === 'Bulk Storage') {
          color = 'orange'; // ใช้สีส้มสำหรับ Bulk Storage
        }
    
        return (
          <Tag color={color}>
            {type}
          </Tag>
        );
      },
    }
,    
    {
      title: 'Capacity (m³)',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: (a, b) => (a.Capacity || 0) - (b.Capacity || 0),
      render: (capacity) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {capacity} m³
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'WarehouseStatus',
      key: 'WarehouseStatus',
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value, record) => record.WarehouseStatus === value, // กรองโดยตรงตามค่า boolean
      width: 150,
      render: (status: any) => {
        // แปลงค่าของ status ให้เป็น boolean
        const isActive = status === true || status === 'true' || status === 1;
        
        return (
          <span
            style={{
              color: isActive ? '#52c41a' : '#ff4d4f',  // สีเขียวถ้า Active, สีแดงถ้า Inactive
              fontWeight: 500,
            }}
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address, record) => {
        const addressParts = [];
        if (address) addressParts.push(address);
        if (record.Zipcode) addressParts.push(record.Zipcode);
        if (record.ProvinceID) addressParts.push(record.ProvinceID);
        
        // If some parts are missing, join the available parts with commas
        return (
          <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {addressParts.join(', ') || 'Not available'}
          </div>
        );
      },
    },
    
    
    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link"><EditTwoTone twoToneColor="#10515F" /></Button>
          <Button
            type="link"
            //onClick={() => handleDeleteWarehouse(record.WarehouseID)}
          >
            <DeleteTwoTone twoToneColor="#FF7236" />
          </Button>
        </Space>
      ),
    },
  ];const getWarehouses = async () => {
    let res = await GetWarehouses();
  
    if (res.status === 200) {
      console.log('Warehouses data:', res.data); // ตรวจสอบข้อมูลที่ได้รับจาก API
      setWarehouses(res.data);
    } else {
      setWarehouses([]);
      messageApi.open({
        type: 'error',
        content: res.data.error,
      });
    }
  };
  
  useEffect(() => {
    getWarehouses();
  }, []);
  
  const handleDeleteWarehouse = async (warehouseId: string) => {
    const res = await DeleteWarehousesById(warehouseId);
    if (res.status === 200) {
      getWarehouses(); // Refetch warehouses after deletion
    } else {
      messageApi.open({
        type: "error",
        content: "Failed to delete warehouse",
      });
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Header style={{
        position: 'relative',
        background: `url(${w1}) no-repeat center center`,
        backgroundSize: 'cover',
        padding: '0 50px',
        height: '50vh',
        color: 'white',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '12vh',
          background: 'rgba(16, 81, 95, 0.9)',
          zIndex: 1,
        }} />
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 0',
          zIndex: 2,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginLeft: '-50px'
          }}>
            <WarehouseLogo />
            <Title level={2} style={{ margin: 0, color: 'white', marginLeft: '-30px', marginTop: '-40px' }}>WAREHOUSE</Title>
          </div>
          <UserOutlined style={{ color: 'white', fontSize: '40px', marginTop: '-40px' }} />
        </div>
        <div style={{
          maxWidth: '800px',
          marginTop: '64px',
          marginBottom: '32px',
          zIndex: 4,
          position: 'relative',
        }}>
          <Title level={1} style={{
            color: 'white',
            marginBottom: '16px',
            position: 'relative',
            left: '90px',
          }}>
            OUR TEAM
          </Title>
          <Paragraph style={{
            color: 'white',
            fontSize: '16px',
            position: 'relative',
            left: '90px',
          }}>
            If you're stressed about work, don't quit just yet—
            because if you do, you'll end up stressing about money too.
          </Paragraph>
        </div>
        <Space
          direction="vertical"
          size={20}
          style={{
            marginLeft: '90px',
          }}
        >
          <Input.Search
          placeholder="Search warehouses..."
          allowClear
          enterButton={
            <Button 
              type="primary" 
              icon={<SearchOutlined />}
              style={{ borderRadius: 0 ,backgroundColor: '#FF7236',}} // ปรับปุ่มให้เป็นเหลี่ยม
            >
              Search
            </Button>
          }
          size="large"
          style={{
            width: '800px',
            borderRadius: 0, // ทำให้ input เป็นเหลี่ยม
          }}
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
        </Space>
      </Header>

      <Content style={{ padding: '24px 50px' }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="large"
        style={{ 
          marginBottom: '24px',
          background: '#10515F',
          marginLeft: '90px', // ขยับปุ่มไปทางขวา
          borderRadius: '0px', // กำหนดให้ปุ่มเป็นเหลี่ยม
          width: '250px', // กำหนดความกว้างของปุ่ม
          height: '50px'
        }}
        //onClick={handleAddWarehouse}
      >
        New Warehouse
      </Button>
        <Table
          columns={columns}
          dataSource={warehouses}
          pagination={{ pageSize: 10 }}
          rowKey="WarehouseID"
        />
      </Content>
    </Layout>
  );
};

export default WarehouseManagement;
