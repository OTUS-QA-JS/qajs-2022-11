import axios from "axios";
import UserAccount from "../config/config";


const {urlUser} = UserAccount;
const {urlAuth} = UserAccount;

const account = {
    createUser: (regData) => {
        return axios.post(urlUser, regData);
    },
    authorization(authData) {
        return axios.post(urlAuth, authData);
    },
    deleteUser: (authToken, UserId) => {
        return axios.delete(`${urlUser}/${UserId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
    },
    getUserInfo: (authToken, UserId) => {
        return axios.get(`${urlUser}/${UserId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
    },
    // async createUserWithData() {
    //     const regData = getNewUser();
    //     const resp = await this.createUser(regData);
    //     const respToken = await this.authorization(regData);
    //     let userWithData = {
    //         userName: regData.userName,
    //         password: regData.password,
    //         userId: resp.data.userID,
    //         authToken: respToken.data.token
    //     }
    //     return userWithData;
    // },

    async getUserData(createUserResponse) {
        let userData = {
            userID: createUserResponse.data.userID,
            authData: {
                userName: `${JSON.parse(createUserResponse.config.data).userName}`,
                password: `${JSON.parse(createUserResponse.config.data).password}`
            },
            authToken: ''
        }
        userData.authToken = (await account.authorization(userData.authData)).data.token;

        return userData;
    },

    async cleanUser(createUserResponse) {
        const authToken = this.getUserData(createUserResponse).authToken;
        const userId = this.getUserData(createUserResponse).userId;
        await this.deleteUser(authToken, userId);
    }

//    async getAuthToken(createUserResponse) {
//         const authData = this.getUserData(createUserResponse).userData.authData;
//         const respToken = await account.authorization(authData);
//         const authToken = respToken.data.token;
//         return authToken;
//     },

}

export default account;
