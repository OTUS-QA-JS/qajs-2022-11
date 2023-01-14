
import axios from 'axios';


axios.defaults.baseURL = 'https://bookstore.demoqa.com'
axios.defaults.headers.post['Content-Type'] = 'application/json';

const UserAccount = {
    urlUser: '/Account/v1/User',
    urlAuth: '/Account/v1/GenerateToken',
}



export default UserAccount;