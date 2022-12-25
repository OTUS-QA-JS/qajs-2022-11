import { nameIsValid, fullTrim, getTotal } from '../src/app.js'


describe ('check nameIsValid',()=>{
	test('name SomeName is valid', function(){
		expect(nameIsValid('SomeName')).toBeTruthy()
	})
	test('name S is not valid', function(){
		expect(nameIsValid('s')).toBeFalsy()
	})
	test('name Marfa S is not valid', function(){
		expect(nameIsValid('Marfa S')).toBeFalsy()
	})
})

describe ('check fullTrim',()=>{
	test('string Marfa Sokolova will be MarfaSokolova', function(){
		expect(fullTrim('Marfa Sokolova')).toBe('MarfaSokolova')
	})
	test('empty string not fail', function(){
		expect(fullTrim('')).toBe('')
	})
	test('string \' Sasha\' will be \'Sasha\'', function(){
		expect(fullTrim(' Sasha')).toBe('Sasha')
	})
	test('string \'Masha \' will be \'Masha\'', function(){
		expect(fullTrim('Masha ')).toBe('Masha')
	})
	test('string no text will be fail', function(){
		expect(function(){
					fullTrim(3)
				}).toThrow();
	})
})


describe ('check getTotal', () => {
	test.each`
		prices | quantitys | discounts | results
		${10} | ${10} | ${10} | ${90}		
		${1} | ${1} | ${100} | ${0}
		${5} | ${10} | ${0} | ${50}
		${5} | ${10} | ${110} | ${-5}
		${10} | ${10} | ${-10} | ${'error'}
		${10} | ${10} | ${'five'} | ${'error'}
		`('$quantitys items(s) by $prices and discount $discounts% total is $results', function({prices,quantitys,discounts,results}){		
			if (results==='error'){
				expect(function(){
					getTotal([{ price: prices, quantity: quantitys }], discounts)
				}).toThrow();
			} else {			
			expect(getTotal([{ price: prices, quantity: quantitys }], discounts)).toBe(results)
			}
		})
	
})
