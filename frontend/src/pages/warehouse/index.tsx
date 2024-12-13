import React, { useState, useEffect, useMemo } from "react";
import { 
  Layout, Typography, Input, Button, Table, Space, 
  Image, Modal, Form, Select, Tag, Card, message, InputNumber 
} from 'antd';
import { 
  PlusOutlined, SearchOutlined, UserOutlined, 
  DeleteTwoTone, EditTwoTone, SaveOutlined, HomeOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from "react-router-dom";

// Import assets and services
import logo from "../../assets/logo.png";
import w1 from "../../assets/w1.png";
import { 
  GetWarehouseTypes, GetWarehouseStatuses, GetProvince, 
  CreateWarehouse, GetWarehouses, DeleteWarehousesById 
} from '../../services/https';

// Import interfaces
import { WarehouseStatusesInterface } from "../../interfaces/WarehouseStatuses";
import { ProvinceInterface } from "../../interfaces/Province";
import { WarehousesInterface } from "../../interfaces/Warehouses";
import { WarehouseTypesInterface } from "../../interfaces/WarehouseTypes";

// Destructure Layout and Typography components
const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

// Component for Warehouse Logo
const WarehouseLogo: React.FC = () => (
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

// Main Warehouse Management Component
const WarehouseManagement: React.FC = () => { 
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // State Management
  const [warehouses, setWarehouses] = useState<WarehousesInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [warehouseStatus, setWarehouseStatus] = useState<WarehouseStatusesInterface[]>([]);
  const [warehouseType, setWarehouseType] = useState<WarehouseTypesInterface[]>([]);
  const [province, setGetProvince] = useState<ProvinceInterface[]>([]);

  // Fetch Initial Data
  const fetchInitialData = async () => {
    try {
      const [statusRes, typeRes, provinceRes] = await Promise.all([
        GetWarehouseStatuses(),
        GetWarehouseTypes(),
        GetProvince()
      ]);

      if (statusRes.status === 200) setWarehouseStatus(statusRes.data);
      if (typeRes.status === 200) setWarehouseType(typeRes.data);
      if (provinceRes.status === 200) setGetProvince(provinceRes.data);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error fetching initial data",
      });
      setTimeout(() => navigate("/"), 2000);
    }
  };

  // Fetch Warehouses
  const getWarehouses = async () => {
    try {
      const res = await GetWarehouses();
      if (res.status === 200) {
        setWarehouses(res.data);
      } else {
        setWarehouses([]);
        messageApi.open({
          type: 'error',
          content: res.data.error,
        });
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Failed to fetch warehouses',
      });
    }
  };

  // Initial Data Fetching
  useEffect(() => {
    fetchInitialData();
    getWarehouses();
  }, []);

  // Filtered Warehouses
  const filteredWarehouses = useMemo(() => {
    const lowercaseQuery = searchQuery.toLowerCase().trim();
  
    if (!lowercaseQuery) return warehouses;
  
    return warehouses.filter((warehouse) => {
      const searchableFields = [
        warehouse.WarehouseName?.toLowerCase() || '',
        warehouse.Address?.toLowerCase() || '',
        warehouse.ID?.toString() || '',
        warehouse.Zipcode?.toString() || '',
        warehouse.Capacity?.toString() || ''
      ];
      
      return searchableFields.some(field => field.includes(lowercaseQuery));
    });
  }, [warehouses, searchQuery]);

  // Modal Handlers
  const handleAddWarehouse = () => setIsModalVisible(true);
  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Create Warehouse
  const handleModalOk = async () => {
    try {
      const values: WarehousesInterface = await form.validateFields();
      const res = await CreateWarehouse(values);

      if (res.status === 201) {
        message.success(res.data.message);
        setIsModalVisible(false);
        getWarehouses();
      } else {
        message.error(res.data.error);
      }
    } catch (errorInfo) {
      console.error("Validation failed:", errorInfo);
    }
  };

  // Delete Warehouse
  const deleteWarehouseById = async (id: string) => {
    try {
      const res = await DeleteWarehousesById(id);
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
        await getWarehouses();
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Failed to delete warehouse",
      });
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };
  
  const columns: ColumnsType<WarehousesInterface> = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'id',
      width: 80,
      sorter: (a, b) => {
        if (a.ID === undefined) return 1;
        if (b.ID === undefined) return -1;
        return a.ID - b.ID;
      },
    },      
    {
      title: 'Warehouse Name',
      dataIndex: 'WarehouseName',  // แก้ไขจาก WarehouseName
      key: 'WarehouseName',
      // ...
      sorter: (a, b) => {
        if (!a.WarehouseName || !b.WarehouseName) {  // แก้ไขการอ้างอิง
          return 0;
        }
        return a.WarehouseName.localeCompare(b.WarehouseName);  // แก้ไขการอ้างอิง
      },
    },  
    {
      title: 'Type',
      key: 'WarehouseType',
      render: (record) => {
        const type = record?.WarehouseType?.WarehouseType;
        let color = 'black';
        if (type === 'Cold Storage') {
          color = 'blue';
        } else if (type === 'Dry Storage') {
          color = 'green';
        } else if (type === 'Hazardous Storage') {
          color = 'red';
        } else if (type === 'Bulk Storage') {
          color = 'orange';
        }
    
        return (
          <Tag bordered={false} color={color}>
            {type}
          </Tag>
        );
      },
    },    
    {
      title: 'Capacity (m³)',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: (a, b) => (a.Capacity || 0) - (b.Capacity || 0),
      render: (capacity) => (
        <span style={{ fontWeight: 'bold', color: 'black' }}>
          {capacity} m³
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'WarehouseStatus',
      width: 150,
      render: (record) => {
        const status = record?.WarehouseStatus?.WarehouseStatus;
        let color = 'black';
        if (status === 'Available') {
          color = '#52c41a';
        } else if (status === 'Full') {
          color = '#f5222d';
        } else if (status === 'Nearly Full') {
          color = 'orange';
        } else if (status === 'Empty') {
          color = '#1677ff';
        }
        return (
          <span
            style={{
              color: color,
              fontWeight: 550,
              textTransform: 'capitalize',
            }}
          >
            {status}
          </span>
        );
      },
    },    
    {
      title: 'Address',
      key: 'address',
      render: (record) => (
        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {record.address}, {record?.Province?.Province}, {record.zipcode}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => deleteWarehouseById(record.ID)}><EditTwoTone twoToneColor="#10515F" /></Button>
          <Button onClick={() => deleteWarehouseById(record.ID)}>
            <DeleteTwoTone twoToneColor="#FF7236" />
          </Button>
        </Space>
      ),
    },
  ];


  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {contextHolder}
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
                style={{ borderRadius: 0, backgroundColor: '#FF7236' }}
              >
                Search
              </Button>
            }
            size="large"
            style={{
              width: '800px',
              borderRadius: 0,
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
              marginLeft: '90px',
              borderRadius: '0px',
              width: '250px',
              height: '50px'
            }}
            onClick={handleAddWarehouse}
          >
            New Warehouse
          </Button>
      <Card>
          <Table
            columns={columns}
            dataSource={filteredWarehouses}
            pagination={{ pageSize: 10 }}
            rowKey="ID"
          />
        </Card>

      <Modal
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={
          <span>
            <SaveOutlined style={{ marginRight: 10 }} />
            Save
          </span>
        }
        cancelText="Cancel"
        okButtonProps={{
          style: { backgroundColor: '#FF7236', color: 'white', borderColor: '#FF7236' },
        }}
        cancelButtonProps={{
          style: { backgroundColor: '#FFFFFF', color: 'black', borderColor: '#FF7236' },
        }}
      >
      <Card
        style={{
          backgroundColor: '#FFFFFF',  // กำหนดสีพื้นหลังที่นี่
          borderRadius: '8px',  // เพิ่มขอบมุมโค้ง (ถ้าต้องการ)
          padding: '0px',  // เพิ่ม padding เพื่อให้เนื้อหาดูไม่ติดขอบ
          border: '2px solid #f0f0f0',  // กำหนดสีขอบของ card
        }}
      >
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0rem' }}>
    <h2 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <HomeOutlined style={{ marginRight: '10px', color: '#FF7236' }} /> {/* ไอคอนที่เพิ่มมา */}
      Add New Warehouse
    </h2>
    </div >
      <Form form={form} layout="vertical">
        {/* Row 1: WarehouseName */}
        <Form.Item
          name="WarehouseName"
          label="Warehouse Name"
          rules={[{ required: true, message: 'Please input the warehouse name!' }]}
        >
          <Input />
        </Form.Item>

        {/* Row 2: WarehouseTypeID, WarehouseStatusID */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Form.Item
            name="WarehouseTypeID"
            label="Type"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please select warehouse type!' }]}
          >
            <Select placeholder="Select Type" style={{ width: '100%' }}>
              {warehouseType?.map((item) => (
                <Select.Option value={item?.ID} key={item?.ID}>
                  {item?.WarehouseType}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="WarehouseStatusID"
            label="Status"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please select warehouse status!' }]}
          >
            <Select placeholder="Select Status" style={{ width: '100%' }}>
              {warehouseStatus?.map((item) => (
                <Select.Option value={item?.ID} key={item?.ID}>
                  {item?.WarehouseStatus}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Row 3: Capacity */}
        <Form.Item
          name="capacity"
          label="Capacity"
          rules={[{ required: true, message: 'Please input the warehouse capacity!' }]}
        >
          <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
        </Form.Item>

        {/* Row 4: Address */}
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input the warehouse address!' }]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
        
        {/* Row 5: Province, Zipcode */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Form.Item
            name="ProvinceID"
            label="Province"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please select the province!' }]}
          >
            <Select placeholder="Select Province" style={{ width: '100%' }}>
              {province?.map((item) => (
                <Select.Option value={item?.ID} key={item?.ID}>
                  {item?.Province}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="zipcode"
            label="Zipcode"
            style={{ flex: 1 }}
            rules={[
              { required: true, message: 'Please input the zipcode!' },
              { pattern: /^\d{5}$/, message: 'Zipcode must be 5 digits!' },
            ]}
          >
            <Input placeholder="Enter 5-digit zipcode" type="text" />
          </Form.Item>
        </div>
      </Form>
      </Card>
    </Modal>
    </Content>
    </Layout>
  );
}

export default WarehouseManagement;