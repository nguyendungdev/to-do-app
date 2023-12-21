import axios from "axios";
import env from "../utils/env"
const instance = axios.create({
  baseURL: `${env.apiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getData = (path) => {
  return instance.get(path);
};

export const addData = (path, data) => {
  return instance.post(path, data);
};

export const updateStatus = (path, idList) => {
  return instance.patch(path, idList);
};

export const remove = (path) => {
  return instance.delete(path);
};

