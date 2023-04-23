import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

test('imports without error', () => {
    expect(nameIsValid).toBeDefined();
})
test('is function', () => {
    expect(typeof nameIsValid).toBe('function')
})
test('nameIsValid :пустое значение == false', () => {
    expect(nameIsValid(null)).toBe(false)
})

test('nameIsValid : больше двух символов = true', () => {
    expect(nameIsValid('nikita')).toBe(true)
})




test('number', () => {
    expect(fullTrim).toBeDefined()
})
test('проверка ошибки при написании без пробела', () => {
    expect(fullTrim('писькасасать')).toBeDefined()
})

test('проверка удаление пробела из строки', () => {
    expect(fullTrim('писька сасать')).toBe('писькасасать')
})


test('discount !== string', () => {
    expect(getTotal).toBeDefined()
})
test('discount < 0 ', () => {
    expect(getTotal).toBeDefined()
})
test.each
([{ items :[ 10 , 'zaeb' , 10] , discount : 0 , expected : 100 },
{ items :[ 10 , 'zaeb1' , 10] , discount : 10 , expected : 90 },
{ items :[ 1 , 'zaeb1' , 10] , discount : 0 , expected : 10 },
{ items :[ 10 , 'zaeb1' , 10] , discount : 100 , expected : 0 }, 
{ items :[ 1 , 'zaeb1' , 10] , items : [9 , 'zaeb' , 10], discount : 0 , expected : 100 },
{ items :[ 0 , 'zaeb1' , 10] , items : [9 , 'zaeb' , 10], discount : 0 , expected : 90 }])    
('getTotal  со скидкой $discount' , ({items, discount, expected}) => {
    (`returns ${expected}` , () => {
    expect(getTotal(items, discount)) .toBe(expected);
})
})