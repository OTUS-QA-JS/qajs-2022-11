import {test} from "@jest/globals";
import config from "../framework/config";
import user from "../framework/user";
import expect from "expect";

let uuid = '';
let token = '';

describe('Авторизация.', () => {
    // Чтобы авторизоваться, сначала надо создать юзера
    test('POST – /Account/v1/User – Создание нового пользователя.', async () => {
        const resAdd = await user.add(config.credentials);
        expect(resAdd.status).toEqual(201);
        // Запоминаем UUID для дальнейшей работы
        uuid = resAdd.body.userID;
        console.log('Создан пользователь с UserID = ' + uuid);
    })

    test('POST – /Account/v1/Authorized – Авторизация с существующими и верными логином и паролем.', async () => {
        const res = await user.login(config.credentials);
        expect(res.status).toEqual(200);
    })

    test('POST – /Account/v1/Authorized – Ошибка авторизация с НЕсуществующими логином и паролем.', async () => {
        const res = await user.login({userName: "84y38ejguylieu", password: "h8797ghiw3elao8gnyhojlire8"});
        expect(res.body).toEqual({"code": "1207", "message": "User not found!"});
    })
});

describe('Получение информации о пользователе.', () => {
    test('POST – /Account/v1/GenerateToken – Генерация токена.', async () => {
        const resGenerateToken = await user.generateToken(config.credentials);
        expect(resGenerateToken.status).toEqual(200);
        // Запоминаем полученный токен
        token = resGenerateToken.body.token;
        console.log('Полученный токен = ' + token);
    })

    test('GET – /Account/v1/User/{UUID} – Получаем данные существующего пользователя.', async () => {
        const resGetInfo = await user.getUserInfo(uuid, token);
        expect(resGetInfo.status).toEqual(200);
        expect(resGetInfo.body.username).toEqual(config.credentials.userName);
        console.log('Получены данные пользователя с именем ' + resGetInfo.body.username + ' и userID = ' + resGetInfo.body.userId);
    })
});

describe('Удаление пользователя.', () => {
    test('DELETE – /Account/v1/User/{UUID} – Удаление существующего пользователя.', async () => {
        const resDelete = await user.delete(uuid, token);
        expect(resDelete.status).toEqual(204);
        console.log('Статус запроса на удаление = ' + resDelete.status);
    })
});