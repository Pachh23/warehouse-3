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
    .get(`${apiUrl}/provinces`,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetWarehouseTypes() {
  return await axios
    .get(`${apiUrl}/warehouseTypes`,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetWarehouseStatuses() {
  return await axios
    .get(`${apiUrl}/warehouseStatuses`,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetWarehouses() {
  return await axios
    .get(`${apiUrl}/warehouses`,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetWarehousesById(id: string) {
  return await axios
    .get(`${apiUrl}/warehouse/${id}`,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateWarehousesById(id: string, data: WarehousesInterface) {
  return await axios
    .put(`${apiUrl}/warehouse/${id}`, data ,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteWarehousesById(id: string) {
  return await axios
    .delete(`${apiUrl}/warehouse/${id}` ,requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateWarehouse(data: WarehousesInterface) {
  return await axios
    .post(`${apiUrl}/warehouses-create`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  GetProvince,
  GetWarehouseTypes,
  GetWarehouseStatuses,
  GetWarehouses,
  GetWarehousesById,
  UpdateWarehousesById,
  DeleteWarehousesById,
  CreateWarehouse,
};