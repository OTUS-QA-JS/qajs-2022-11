function getInfo (name,surname,age) {
    return `Имя: ${name},Фамилия: ${surname},возраст: ${age}`
}

const myName = getInfo (Alina,Les,11);
console.log(myName);

const оbject = {
    name:'Alina',
    surname:'Malina',
    age:1,
}

function returnObject (оbject) {
return [returnObject.name, returnObject.surname, returnObject.age]
}


const myObject = returnObject (Alina,Les,11);
console.log(myObject);