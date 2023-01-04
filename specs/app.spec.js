import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

describe('Tests for name', () => {
    test('Name - function', () => {
        expect(typeof nameIsValid).toBe('function');
    });
});
    it('correct name', () => {
        expect(nameIsValid('Лия')).toBe(true);
});
    it('Not correct name', () => {
        expect(nameIsValid('Я')).toBe(false);
});
    it('special signs and symbols', () => {
        expect(nameIsValid(',./  ')).toBe(false);
});

describe('Tests for trim', () => {
    test('Trim - function', () => {
        expect(typeof fullTrim).toBe('function');
    });
});
    it('correct work', () => {
        expect(fullTrim('Основа всего')).toBe('Основавсего');
});
    it('correct work with special symbols', () => {
        expect(fullTrim('Какой то очень \"большой\” текст')).toBe('Какойтоочень\"большой”текст');
});

describe('tests for GetTotal', () => {
    test.each`
    items     | discount  | expected
    ${[1,2,3]}|  ${10}    | ${}
    ${[1]}    |${'Десять'}| ${false}
    `('exp'), ({})
});