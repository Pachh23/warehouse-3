import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Loadable from "../components/third-patry/Loadable";
//import WarehouseManagement from "../pages/warehouse/index";  // นำเข้า Warehouse component
import InventoryCount from "../pages/InventoryCount/index";  // นำเข้า InventoryCount component
const WarehouseManagement = Loadable(lazy(() => import("../pages/warehouse")));
const WarehouseCreate = Loadable(lazy(() => import("../pages/warehouse/create")));

const ConfigRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WarehouseManagement />} />  {/* กำหนดเส้นทางเพื่อแสดงหน้า Warehouse */}
      <Route path="/inventory-count" element={<InventoryCount />} />  {/* กำหนดเส้นทางเพื่อแสดงหน้า InventoryCount */}
      <Route path="/warehouse-create" element={<WarehouseCreate />} />  {/* กำหนดเส้นทางเพื่อแสดงหน้า WarehouseCreate */}

      {/* เพิ่มเส้นทางอื่น ๆ ถ้าจำเป็น */}
    </Routes>
  );
};

export default ConfigRoutes;
