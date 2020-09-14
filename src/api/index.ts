import axios from "axios";
import { IPreferredCity } from "../interfaces";

let cancel: any;
const CancelToken = axios.CancelToken;
const instance = axios.create({
  baseURL: "http://localhost:3030/"
});

// GET
export const getCities = async (limit?: number, filter?: string) => {
  try {
    if (cancel !== undefined) cancel();
    const response = await instance.get("cities", {
      params: { limit: limit, filter },
      cancelToken: new CancelToken(c => (cancel = c))
    });
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPreferences = async () => {
  try {
    const response = await instance.get("preferences/cities");
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCityById = async (id: number) => {
  try {
    const response = await instance.get(`cities/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// PATCH
export const savePreferences = async (preferred: IPreferredCity) => {
  try {
    await instance.patch("preferences/cities", { ...preferred });
  } catch (error) {
    return Promise.reject(error);
  }
};
