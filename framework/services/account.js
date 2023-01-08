import {config} from "../config.js";
import axios from "axios";

export const account = {
    async isAuthorized(payload, token) {
        const req = {
            method: "post",
            url: `${config.baseUrl}/Account/v1/Authorized`,
            data: payload,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }
        return axios(req);
    },
    async createUser(payload) {
        const req = {
            method: "post",
            url: `${config.baseUrl}/Account/v1/User`,
            data: payload
        }

        return axios(req);
    },
    async generateToken(payload) {
        const req ={
            method: "post",
            url: `${config.baseUrl}/Account/v1/GenerateToken`,
            data: payload
        }

        return axios(req);
    },
    async getUser(userId, token) {
        const req = {
            method: "get",
            url: `${config.baseUrl}/Account/v1/User/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        return axios(req);
    },
    async deleteUser(userId, token) {
        const req = {
            method: "delete",
            url: `${config.baseUrl}/Account/v1/User/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        return axios(req);
    }
}
