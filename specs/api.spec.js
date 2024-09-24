const buseUrl = 'https://petstore.swagger.io/v2'
const data = {
  "id": 10,
  "category": {
    "id": 10,
    "name": "Gia"
  },
  "name": "doggie",
  "photoUrls": [
    "https://petstore.swagger.io/v2/pet"
  ],
  "tags": [
    {
      "id": 10,
     
      "name": "Tag"
    }
  ],
  "status": "status"
}
describe('Pet', () => {
    test('Создание pet', async() => {
        const response = await fetch(`${buseUrl}/pet`, {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    expect(response.status).toBe(200);
    
  })

  test('Создание pet без body', async() => {
    const response = await fetch(`${buseUrl}/pet`, {
      method: 'POST'
    })
    expect(response.status).toBe(415);
  })

  test('Изменение данных pet', async() => {
    const response = await fetch(`${buseUrl}/pet`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          "id": 1,
          "category": {
            "id": 1011,
            "name": "Coco"
          },
          "name": "cat",
          "photoUrls": [
            "https://petstort"
          ],
          "tags": [
            {
              "id": 101,
             
              "name": "Tag"
            }
          ],
          "status": "sold"
        })
    })
    expect(response.status).toBe(200);
  })

  test('Получение pet по id', async() => {
    const response = await fetch(`${buseUrl}/pet/10`);
    const response_body = await response.json();
    expect(response_body.id).toBe(10);
    expect(response_body.name).toBeTruthy();
    expect(response_body.category).toBeTruthy();
  }) 

  test('Получение pet по id(некорректный id)', async() => {
    const response = await fetch(`${buseUrl}/pet/100000000000`);
    expect(response.status).toBe(404);
  })
  test('Получение pet по фильтру', async() => {
    const response = await fetch(`${buseUrl}/pet/findByStatus?status=sold`);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  })
  test('Удаление pet ', async() => {
    const response = await fetch(`${buseUrl}/pet/1`);
    expect(response.status).toBe(200);
  })
  
})
