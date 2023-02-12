import supertest from "supertest";
import config from '../config';
const { baseUrl } = config;

const account = {

    user: (payload) => {
        return supertest(baseUrl)
            .post('/account/v1/user')
            .set('Accept', 'application/json')
            .send(payload)
    },

    userInfo: (uuid, token) => {
        return supertest(baseUrl)
            .get(`/account/v1/user/${uuid}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
    },

    deleteUser: (uuid, token) => {
        return supertest(baseUrl)
            .del(`/account/v1/user/${uuid}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
    },

    authorized: (payload) => {
        return supertest(baseUrl)
            .post('/account/v1/authorized')
            .set('Accept', 'application/json')
            .send(payload)
    },

    generateToken: (payload) => {
        return supertest(baseUrl)
            .post('/account/v1/generatetoken')
            .set('Accept', 'application/json')
            .send(payload)
    },

    async getAuthToken(payload) {
        const res = await this.generateToken(payload);
        return res.body.token;
    }
}

export default account
