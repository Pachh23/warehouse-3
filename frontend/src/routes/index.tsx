import { Routes, Route } from "react-router-dom";
import Warehouse from "../pages/warehouse/index";  // นำเข้า Warehouse component
import InventoryCount from "../pages/InventoryCount/index";  // นำเข้า InventoryCount component

const ConfigRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Warehouse />} />  {/* กำหนดเส้นทางเพื่อแสดงหน้า Warehouse */}
      <Route path="/inventory-count" element={<InventoryCount />} />  {/* กำหนดเส้นทางเพื่อแสดงหน้า InventoryCount */}
      {/* เพิ่มเส้นทางอื่น ๆ ถ้าจำเป็น */}
    </Routes>
  );
};

export default ConfigRoutes;
