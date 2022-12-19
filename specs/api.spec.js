import axios from  "axios";
import {jest} from "@jest/globals"; jest;
import expect from "expect"; jest;

test('GET request', async () => {
    const config = {
        method: 'get',
        url: 'https://dummyjson.com/products/1',
    }
const resp = await axios(config);   
console.log(resp.data);
expect(resp.data.title).toEqual('iPhone 9');
});
test('POST request', async () => {
        const config = {
            method: 'post',
            url: 'https://dummyjson.com/products/add',
            data:{
                "title": "Test new PC"
            },
            headers: {},
        }    
const resp = await axios(config);
console.log(resp.data);
expect(resp.data.title).toEqual('Test new PC');
})