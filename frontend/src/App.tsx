/*import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ConfigRoutes from "./routes";
import "./App.css";
const App: React.FC = () => {
  return (
    <Router>
      <ConfigRoutes />
    </Router>
  );
};
*/
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ConfigRoutes from "./routes";  // นำเข้า ConfigRoutes
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <ConfigRoutes />  {/* เรียกใช้ ConfigRoutes ที่กำหนดเส้นทาง */}
    </Router>
  );
};

export default App;

