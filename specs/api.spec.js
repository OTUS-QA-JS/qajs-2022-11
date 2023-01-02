import axios from "axios";

describe ('API сервиса dummyjson.com', () => {

    test ('успешно обрабатывает запрос /products', async () => {
        jest.setTimeout(30000);
        let config = {
            method: 'get',
            url: 'https://dummyjson.com/products',
        };

        let resp = await axios(config);
        expect(resp.status).toBe(200);
    })

    test ('выводит товар с айди = 1', async () => {
        jest.setTimeout(30000);
        let config = {
            method: 'get',
            url: 'https://dummyjson.com/products/1',
        };

        let resp = await axios(config);
        expect(await resp.data.title).toBe('iPhone 9');
    })

    test ('ищет iPhone 9 по тегу iphone', async () => {
        jest.setTimeout(50000);
        let config = {
            method: 'get',
            url: 'https://dummyjson.com/products/search?q=iPhone',
        };


        let resp = await axios(config);

        let titleArray = [];
        let titleArrayLength = await resp.data.products.length;
        for (let i = 0; i <= titleArrayLength; i++) {
            for (let key in await resp.data.products[i]) {
                titleArray[i] = await resp.data.products[i].title;
            }
        }

        expect(titleArray).toEqual(expect.arrayContaining(['iPhone 9']));
    })

    test ('успешно обрабатывает запрос /categories', async () => {
        jest.setTimeout(30000);
        let config = {
            method: 'get',
            url: 'https://dummyjson.com/products/categories',
        };

        let resp = await axios(config);
        expect(resp.status).toBe(200);
    })

    test ('имеет категорию smartphones', async () => {
        jest.setTimeout(30000);
        let config = {
            method: 'get',
            url: 'https://dummyjson.com/products/categories',
        };

        let resp = await axios(config);
        expect(await resp.data).toEqual(expect.arrayContaining(['smartphones']));
    })

})



