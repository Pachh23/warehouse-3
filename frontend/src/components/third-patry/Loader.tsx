import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Button, Space } from "antd";
import React, { useState } from "react";

const Loader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    console.log("Searching for:", value); // ใช้สำหรับ debug
  };

  return (
  <div
    style={{
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    }}
  >
    <LoadingOutlined
      style={{
        fontSize: 100,
        color: "#180731",
      }}
      spin
      />
      {/* Search Input */}
      <Space direction="vertical" style={{ width: "60%" }}>
        <Input.Search
          placeholder="Search warehouses..."
          allowClear
          enterButton={
            <Button
              type="primary"
              icon={<SearchOutlined />}
              style={{
                backgroundColor: "#FF7236",
                borderColor: "#FF7236",
              }}
            >
              Search
            </Button>
          }
          size="large"
          onSearch={handleSearch}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Space>
    </div>
  );
};

export default Loader;
