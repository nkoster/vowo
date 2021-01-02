// The mock data.
const persons = [
    {
        name: 'Sarah Smith',
        age: 37
    },
    {
        name: 'Jack Jones',
        age: 33
    },
    {
        name: 'Michael Cook',
        age: 18
    },
    {
        name: 'Lisa Crow',
        age: 35
    },
    {
        name: 'Samuel Jackson',
        age: 53
    },
    {
        name: 'Pamela Black',
        age: 47
    },
    {
        name: 'Carlton Moore',
        age: 21
    },
    {
        name: 'Peter White',
        age: 36
    }
]

/*
The "aged" function returns a list of persons, older than a certain age.
The function takes a persons list, and an arbitrary age. The function
returns an array with strings in the format: "lastName, firstName"
*/
const aged = (persons, age) => persons.filter(person => person.age >= age)
    .map(p => {
        const firstName = p.name.split(' ')[0]
        const lastName = p.name.split(' ')[1]
        return `${lastName}, ${firstName}`
    })

// Test the "aged" function: return a list of persons older than 35.
const age = 35
console.log(`Persons aged ${age} plus:`, aged(persons, age))

/*
A function to find a person in the persons list by
searching for a name, or a part of a name.
*/
const findPerson = (persons, name) =>
    persons.find(p => p.name.includes(name))

// Test the "findPerson" function and find Pamela...
console.log('Find a person with the string "Black":',
    findPerson(persons, 'Black'))

/*
This is a function to provide a simple check to
verify that two objects are "equal".
*/
const isObjectEqual = (o1, o2) => JSON.stringify(o1) === (JSON.stringify(o2))

/*
This is a function that tests if a certain person object
exists in a persons list.
*/
const personExists = (persons, person) => {
    for (let i = 0; i <= persons.length; i++) {
        if (isObjectEqual(persons[i], person)) {
            return true
        }
    }
    return false
}

/*
A function called "api", which receives a person object
as the only argument, and returns a Promise that resolves with
a value after a random time between 500ms and 1000ms.
The "api" function rejects with an error if one occurs.
*/
const api = person => {
    return new Promise((resolve, reject) => {
        if (personExists(persons, person)) {
            const { name, age } = person
            const delay = Math.floor(Math.random() * 500) + 500
            setTimeout(_ => {
                resolve({ name, age, income: delay })
            }, delay)
        } else {
            reject(`Error: person object not found: "${Object.values(person)}"`)
        }    
    })
}

// Test the "api" function with an unknown object.
api({ name: 'Pamela Black', age: 46 })
    .then(p => console.log('====>', p))
    .catch(err => console.log('====>', err))

// Get an average income for all persons.
const income = []
const promises =
    persons.map(p => api(p).then(p => {
        console.log(`${p.name}, income`, p.income)
        income.push(p.income)
    }))
Promise.all(promises).then(_ => {
    const averageIncome =
        income.reduce((sum, income) => sum + income) / income.length
    console.log('Average income for all persons:', averageIncome)
})
