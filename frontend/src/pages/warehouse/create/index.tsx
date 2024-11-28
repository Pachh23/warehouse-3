import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button,message } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { GetWarehouseTypes,GetWarehouseStatuses,GetProvince,CreateWarehouse } from '../../../services/https';
import { WarehouseStatusesInterface } from '../../../interfaces/WarehouseStatuses';
import { WarehouseTypesInterface } from '../../../interfaces/WarehouseTypes';
import { ProvinceInterface } from '../../../interfaces/Province';
import { WarehousesInterface } from '../../../interfaces/Warehouses';

function WarehouseCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [warehouseStatus, setWarehouseStatus] = useState<WarehouseStatusesInterface[]>([]);
  const [warehouseType, setWarehouseType] = useState<WarehouseTypesInterface[]>([]);
  const [province, setGetProvince] = useState<ProvinceInterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
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

  const onFinish = async (values: WarehousesInterface) => {
    let res = await CreateWarehouse(values);
   
    if (res.status == 201) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      setTimeout(function () {
        navigate("/warehouse");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  useEffect(() => {
    onGetWarehouseStatus(),onGetWarehouseType(),onGetProvince();
    return () => {};
  }, []);
  
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '20px' }}>
  
  <Modal
    visible={isModalVisible}
    onCancel={handleModalCancel}
    okText="Save"
    cancelText="Cancel"
    okButtonProps={{
      style: { backgroundColor: '#FF7236', color: 'white', borderColor: '#FF7236' },
      onClick: () => form.submit(), // เรียก submit ฟอร์มเมื่อกดปุ่ม OK
    }}
    cancelButtonProps={{
      style: { backgroundColor: '#FFFFFF', color: 'black', borderColor: '#FF7236' },
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0rem' }}>
      <img 
        alt="Logo"
        src="https://via.placeholder.com/150" // เปลี่ยน URL ของโลโก้ตามความต้องการ
        style={{
          width: '150px',
          height: 'auto',
          marginLeft: '-10px',
        }}
      />
          <h2 style={{ marginLeft: '10px' }}>Add New Warehouse</h2>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish} >
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
    </div>
  );
};

export default WarehouseCreate;
