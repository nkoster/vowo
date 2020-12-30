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


// Return a list of persons, aged 35.
// The function takes a persons list, and an abritrary age.
const age = 35
const aged = (persons, age) => persons.filter(person => person.age >= age)
    .map(p => {
        const firstName = p.name.split(' ')[0]
        const lastName = p.name.split(' ')[1]
        return `${lastName}, ${firstName}`
    })
console.log(`Persons age >= ${age}:`, aged(persons, age))


// A function to find a person in the persons list.
const findPerson = person =>
    persons.find(p => p.name.includes(person))
console.log('Find a person with the string "Black":', findPerson('Black'))


/*
a function called "api" which receives the person object
as the only argument and returns a Promise that
resolves with a value after a random time between 500ms and 1000ms.
The "api" function should reject with an error if one occurs.
*/
const api = person => {
    return new Promise((resolve, reject) => {
        if (person.age) {
            setTimeout(_ => {
                resolve({
                    name: person.name,
                    age: person.age
                })
            }, Math.floor(Math.random() * 500) + 500)
        } else {
            reject(`Error: person "${person.name}" not found.`)
        }    
    })
}

// Test the api function by looping async over all persons.
// Responses are with a random delay and out of order.
persons.forEach(person => {
    api(person)
        .then(p => console.log(p))
        .catch(err => console.log(err))
})

// Test api with an unknown object.
api({name: 'Pamela Black', age: 46 })
    .then(p => console.log('====>', p))
    .catch(err => console.log(err))


// The average age for all persons in the list.
const averageAge = persons.map(p => p.age)
    .reduce((sum, age) => sum + age) / persons.length

console.log('Average age:', averageAge)
