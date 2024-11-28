import { useState, useEffect, useMemo } from "react";
import { Layout, Typography, Input, Button, Table, Space, Image, Modal, Form, Select, Tag, Card, message, InputNumber } from 'antd';
import { PlusOutlined, SearchOutlined, UserOutlined, DeleteTwoTone, DeleteFilled, EditTwoTone } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import logo from "../../assets/logo.png";
import w1 from "../../assets/w1.png";
import { GetWarehouseTypes,GetWarehouseStatuses,GetProvince,CreateWarehouse } from '../../services/https';
import { WarehouseStatusesInterface } from "../../interfaces/WarehouseStatuses";
import { ProvinceInterface } from "../../interfaces/Province";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [warehouseStatus, setWarehouseStatus] = useState<WarehouseStatusesInterface[]>([]);
  const [warehouseType, setWarehouseType] = useState<WarehouseTypesInterface[]>([]);
  const [province, setGetProvince] = useState<ProvinceInterface[]>([]);
  const [form] = Form.useForm();


//---------onGetWarehouseStatus--------//
const onGetWarehouseStatus = async () => {
  let res = await GetWarehouseStatuses();
  if (res.status == 200) {
    setWarehouseStatus(res.data);
  } else {
    messageApi.open({
      type: "error",
      content: "ไม่พบข้อมูลสถานะ",
    });
    setTimeout(() => {
      navigate("/warehouse");
    }, 2000);
  }
};

//---------GetWarehouseTypes--------//
const onGetWarehouseType = async () => {
let res = await GetWarehouseTypes();
if (res.status == 200) {
  setWarehouseType(res.data);
} else {
  messageApi.open({
    type: "error",
    content: "ไม่พบข้อมูลสถานะ",
  });
  setTimeout(() => {
    navigate("/warehouse");
  }, 2000);
}
};

//---------onGetProvince--------//
const onGetProvince = async () => {
let res = await GetProvince();
if (res.status == 200) {
  setGetProvince(res.data);
} else {
  messageApi.open({
    type: "error",
    content: "ไม่พบข้อมูลสถานะ",
  });
  setTimeout(() => {
    navigate("/warehouse");
  }, 2000);
}
};

useEffect(() => {
  onGetWarehouseStatus(),onGetWarehouseType(),onGetProvince();
  return () => {};
}, []);
  // ใช้ useMemo เพื่อ optimize performance ในการ filter ข้อมูล
  const filteredWarehouses = useMemo(() => {
    const lowercaseQuery = searchQuery.toLowerCase().trim();
  
    if (!lowercaseQuery) {
      return warehouses;
    }
  
    return warehouses.filter((warehouse) => {
      // เพิ่มเงื่อนไขในการค้นหาให้ครอบคลุมทุกฟิลด์ที่ต้องการ
      const searchableFields = [
        warehouse.WarehouseName?.toLowerCase() || '',
        warehouse.Address?.toLowerCase() || '',
        warehouse.ID?.toString() || '',
        warehouse.Zipcode?.toString() || '',
        warehouse.Capacity?.toString() || ''
      ];
      
      // ค้นหาจากทุกฟิลด์ที่กำหนด
      return searchableFields.some(field => field.includes(lowercaseQuery));
    });
  }, [warehouses, searchQuery]);

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
      dataIndex: 'warehouse_name',  // แก้ไขจาก WarehouseName
      key: 'warehouse_name',
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
          <Tag bordered={true} color={color}>
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
          {record.address}, {record.zipcode}, {record?.province?.province}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: (record) => (
        <Space size="middle">
          <Button type="link"><EditTwoTone twoToneColor="#10515F" /></Button>
          <Button onClick={() => deleteUserById(record.ID)}>
            <DeleteTwoTone twoToneColor="#FF7236" />
          </Button>
        </Space>
      ),
    },
  ];

  const getWarehouses = async () => {
    let res = await GetWarehouses();
    if (res.status === 200) {
      console.log('Warehouses data:', res.data);
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
  
  const deleteUserById = async (id: string) => {
    let res = await DeleteWarehousesById(id);
    if (res.status == 200) {
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
  };
  
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
      </Content>

      <Modal
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{
          style: { backgroundColor: '#FF7236', color: 'white', borderColor: '#FF7236' }, // สีปุ่ม OK
        }}
        cancelButtonProps={{
          style: { backgroundColor: '#FFFFFF', color: 'black', borderColor: '#FF7236' }, // สีปุ่ม Cancel
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0rem' }}>
        <img 
          alt="Logo"
          src={logo}
          style={{
            width: '150px',
            height: 'auto',
            marginLeft: '-10px',
          }}
        />
        <h2>Add New Warehouse</h2>
      </div>
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
            <Select defaultValue="" style={{ width: "100%" }}>
                  {warehouseType?.map((item) => (
                    <Select.Option
                      value={item?.ID}
                    >
                      {item?.WarehouseType}
                    </Select.Option>
                  ))}
              </Select>
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: 'Please input the warehouse capacity!' }]}
          >
            <InputNumber
                  min={0}
                  //max={99}
                  defaultValue={0}
                  style={{ width: "100%" }}
                />
          </Form.Item>
          <Form.Item
            name="WarehouseStatusID"
            label="Status"
            rules={[{ required: true, message: 'Please select warehouse status!' }]}
          >
            <Select defaultValue="" style={{ width: "100%" }}>
                  {warehouseStatus?.map((item) => (
                    <Select.Option
                      value={item?.ID}
                    >
                      {item?.WarehouseStatus}
                    </Select.Option>
                  ))}
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
            name="ProvinceID"
            label="Province"
            rules={[{ required: true, message: 'Please select the province!' }]}
          >
            <Select defaultValue="" style={{ width: "100%" }}>
                  {province?.map((item) => (
                    <Select.Option
                      value={item?.ID}
                    >
                      {item?.Province}
                    </Select.Option>
                  ))}
                </Select>
          </Form.Item>
          <Form.Item
            name="zipcode"
            label="Zipcode"
            rules={[
              { 
                required: true, 
                message: 'Please input the zipcode!' 
              },
              { 
                pattern: /^\d{5}$/, 
                message: 'Zipcode must be 5 digits!' 
              }
            ]}
          >
            <Input 
              type="text" // ใช้ type="text" แทน type="number" เพื่อให้สามารถใช้ pattern ได้
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default WarehouseManagement;