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


// The "aged" function returns a list of persons, older than a certain age.
// The function takes a persons list, and an arbitrary age.
const aged = (persons, age) => persons.filter(person => person.age >= age)
    .map(p => {
        const firstName = p.name.split(' ')[0]
        const lastName = p.name.split(' ')[1]
        return `${lastName}, ${firstName}`
    })

// Return a list of persons older than 35.
const age = 35
console.log(`Persons age >= ${age}:`, aged(persons, age))


// A function to find a person in the persons list by
// searching for a name or a part of a name.
const findPerson = name =>
    persons.find(p => p.name.includes(name))
console.log('Find a person with the string "Black":', findPerson('Black'))


// This is a function to provide a simple check to
// verify that two objects are "equal".
const isObjectEqual = (o1, o2) => JSON.stringify(o1) === (JSON.stringify(o2))


// This is a function that tests if a person object
// exists in the persons list.
const personExists = person => {
    for (let i = 0; i <= persons.length; i++) {
        if (isObjectEqual(persons[i], person)) {
            return true
        }
    }
    return false
}

/*
a function called "api" which receives the person object
as the only argument and returns a Promise that
resolves with a value after a random time between 500ms and 1000ms.
The "api" function should reject with an error if one occurs.
*/
const api = person => {
    return new Promise((resolve, reject) => {
        const { name, age } = person
        if (personExists(person)) {
            setTimeout(_ => {
                resolve({ name, age })
            }, Math.floor(Math.random() * 500) + 500)
        } else {
            reject(`Error: person object not found: "${Object.values(person)}"`)
        }    
    })
}

// Test the "api" function by looping async over all persons.
// Responses are with a random delay and out of order.
persons.forEach(person => {
    api(person)
        .then(p => console.log(p))
        .catch(err => console.log(err))
})

// Test the "api" function with an unknown object.
api({ name: 'Pamela Black', age: 46 })
    .then(p => console.log('====>', p))
    .catch(err => console.log(err))

// Test the "api" function with a known object.
api({ name: 'Pamela Black', age: 47 })
    .then(p => console.log('====>', p))
    .catch(err => console.log(err))


// The average age for all persons in the list.
const averageAge = persons.map(p => p.age)
    .reduce((sum, age) => sum + age) / persons.length

console.log('Average age:', averageAge)
