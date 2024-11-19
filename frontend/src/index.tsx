/*:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
*/
/*
import React, { useState, useMemo } from 'react';
import { Layout, Typography, Input, Button, Table, Space, Image, Modal, Form, Select, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import logo from "../../assets/logo.png";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

interface Warehouse {
  key: string;
  id: string;
  name: string;
  type: string;
  capacity: number;
  status: string;
  address: string;
}

const WarehouseLogo = () => (
  <Image
    alt="Logo"
    src={logo}
    preview={false}
    style={{
      width: '150px',
      height: 'auto',
      marginLeft: '0',
    }}
  />
);

const WarehouseManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      key: '1',
      id: 'W-1',
      name: 'Warehouse A',
      type: 'cold',
      capacity: 100,
      status: 'active',
      address: '123 Cold St, Bangkok, 10100',
    },
    {
      key: '2',
      id: 'W-2',
      name: 'Warehouse B',
      type: 'dry',
      capacity: 200,
      status: 'active',
      address: '456 Dry St, Chiang Mai, 50200',
    },
    {
      key: '3',
      id: 'W-3',
      name: 'Warehouse C',
      type: 'cold',
      capacity: 150,
      status: 'inactive',
      address: '789 Cold St, Phuket, 83000',
    },
    {
      key: '4',
      id: 'W-4',
      name: 'Warehouse D',
      type: 'dry',
      capacity: 250,
      status: 'active',
      address: '101 Dry St, Bangkok, 10100',
    },
    {
      key: '5',
      id: 'W-5',
      name: 'Warehouse E',
      type: 'cold',
      capacity: 180,
      status: 'inactive',
      address: '202 Cold St, Chiang Mai, 50200',
    },
    {
      key: '6',
      id: 'W-6',
      name: 'Warehouse F',
      type: 'dry',
      capacity: 300,
      status: 'active',
      address: '303 Dry St, Phuket, 83000',
    },
    {
      key: '7',
      id: 'W-7',
      name: 'Warehouse G',
      type: 'cold',
      capacity: 120,
      status: 'active',
      address: '404 Cold St, Bangkok, 10100',
    },
    {
      key: '8',
      id: 'W-8',
      name: 'Warehouse H',
      type: 'dry',
      capacity: 220,
      status: 'inactive',
      address: '505 Dry St, Chiang Mai, 50200',
    },
    {
      key: '9',
      id: 'W-9',
      name: 'Warehouse I',
      type: 'cold',
      capacity: 170,
      status: 'active',
      address: '606 Cold St, Phuket, 83000',
    },
    {
      key: '10',
      id: 'W-10',
      name: 'Warehouse J',
      type: 'dry',
      capacity: 280,
      status: 'inactive',
      address: '707 Dry St, Bangkok, 10100',
    },
  ]);

  // Filter warehouses based on search query
  const filteredWarehouses = useMemo(() => {
    const lowercaseQuery = searchQuery.toLowerCase().trim();
    
    if (!lowercaseQuery) {
      return warehouses;
    }

    return warehouses.filter((warehouse) => {
      return (
        warehouse.name.toLowerCase().includes(lowercaseQuery) ||
        warehouse.id.toLowerCase().includes(lowercaseQuery) ||
        warehouse.type.toLowerCase().includes(lowercaseQuery) ||
        warehouse.address.toLowerCase().includes(lowercaseQuery)
      );
    });
  }, [warehouses, searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };
  const columns: ColumnsType<Warehouse> = [
    {
      title: 'Warehouse ID',
      dataIndex: 'id',
      key: 'id',
      width: 150, // กำหนดความกว้างให้กับคอลัมน์นี้
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Warehouse Name',
      dataIndex: 'name',
      key: 'name',
      width: 200, // กำหนดความกว้างให้กับคอลัมน์นี้
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <strong>{text}</strong>, // การแสดงผลที่ปรับแต่ง
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Cold Storage', value: 'cold' },
        { text: 'Dry Storage', value: 'dry' },
      ],
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
      width: 150,
      render: (type) => (
        <Tag color={type === 'cold' ? 'blue' : 'green'}>
          {type === 'cold' ? 'Cold Storage' : 'Dry Storage'}
        </Tag>
      ),
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: (a, b) => a.capacity - b.capacity,
      width: 150,
      render: (capacity) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {capacity} units
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      width: 150,
      render: (status: string) => (
        <span
          style={{
            color: status === 'active' ? '#52c41a' : '#ff4d4f',
            fontWeight: 500,
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 250, // กำหนดความกว้างให้กับคอลัมน์นี้
      render: (address) => (
        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {address}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddWarehouse = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { province, zipcode } = values;
        const address = `${values.address}, ${province}, ${zipcode}`;
        
        setWarehouses([
          ...warehouses,
          {
            key: Date.now().toString(),
            id: `W-${warehouses.length + 1}`,
            ...values,
            address,
          },
        ]);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: '#10515F',
        padding: '0 50px',
        height: '50vh',
        color: 'white'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '16px 0'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            marginLeft: '-50px'
          }}>
            <WarehouseLogo />
            <Title level={2} style={{ margin: 0, color: 'white', marginLeft: '-30px' }}>WAREHOUSE</Title>
          </div>
          <UserOutlined style={{ color: 'white', fontSize: '40px' }} />
        </div>

        <div style={{ maxWidth: '800px', marginTop: '64px', marginBottom: '32px' }}>
          <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
            OUR TEAM
          </Title>
          <Paragraph style={{ color: 'white', fontSize: '16px' }}>
            If you're stressed about work, don't quit just yet—
            because if you do, you'll end up stressing about money too.
          </Paragraph>
        </div>

        <Space direction="vertical" size={20}>
          <Input.Search
            placeholder="Search warehouses..."
            allowClear
            enterButton={<Button type="primary" icon={<SearchOutlined />}>Search</Button>}
            size="large"
            style={{
              width: '500px'
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
            background: '#10515F'
          }}
          onClick={handleAddWarehouse}
        >
          New Warehouse
        </Button>

        <Table<Warehouse>
          columns={columns}
          dataSource={filteredWarehouses}
          pagination={{
            total: filteredWarehouses.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          bordered
          size="middle"
          scroll={{ x: 'max-content' }}
        />
      </Content>

      <Modal
        title="Add New Warehouse"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
        <Form.Item
            name="name"
            label="Warehouse Name"
            rules={[{ required: true, message: 'Please input the warehouse name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select warehouse type!' }]}
          >
            <Select>
              <Select.Option value="cold">Cold Storage</Select.Option>
              <Select.Option value="dry">Dry Storage</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: 'Please input the warehouse capacity!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select warehouse status!' }]}
          >
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input the warehouse address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="province"
            label="Province"
            rules={[{ required: true, message: 'Please select the province!' }]}
          >
            <Select>
              <Select.Option value="Bangkok">Bangkok</Select.Option>
              <Select.Option value="Chiang Mai">Chiang Mai</Select.Option>
              <Select.Option value="Phuket">Phuket</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="zipcode"
            label="Zipcode"
            rules={[{ required: true, message: 'Please input the zipcode!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default WarehouseManagement;*/