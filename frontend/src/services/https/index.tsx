import { WarehousesInterface } from "../../interfaces/Warehouses";
import axios from "axios";
const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");
const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

async function GetProvince() {
  return await axios
    .get(`${apiUrl}/provinces`)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetWarehouseTypes() {
  return await axios
    .get(`${apiUrl}/warehouseTypes`)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetWarehouses() {
  return await axios
    .get(`${apiUrl}/warehouses`)
    .then((res) => res)
    .catch((e) => e.response);
}
async function GetWarehousesById(warehouse_id: string) {
  return await axios
    .get(`${apiUrl}/warehouse/${warehouse_id}`)
    .then((res) => res)
    .catch((e) => e.response);
}
async function UpdateWarehousesById(warehouse_id: string, data: WarehousesInterface) {
  return await axios
    .put(`${apiUrl}/warehouse/${warehouse_id}`, data)
    .then((res) => res)
    .catch((e) => e.response);
}
async function DeleteWarehousesById(warehouse_id: string) {
  return await axios
    .delete(`${apiUrl}/warehouse/${warehouse_id}`)
    .then((res) => res)
    .catch((e) => e.response);
}
async function CreateWarehouse(data: WarehousesInterface) {
  return await axios
    .post(`${apiUrl}/warehouses`, data)
    .then((res) => res)
    .catch((e) => e.response);
}
export {
  GetProvince,
  GetWarehouseTypes,
  GetWarehouses,
  GetWarehousesById,
  UpdateWarehousesById,
  DeleteWarehousesById,
  CreateWarehouse,
};