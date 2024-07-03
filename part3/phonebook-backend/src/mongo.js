const mongoose = require('mongoose');

(function () {
  if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
  }

  const [, , password, name, number] = process.argv

  const url = `mongodb+srv://fullstack:${password}@cluster0.js4lpyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.set('strictQuery', false)
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  if (name && number) {
    const person = new Person({ name, number })
    person.save().then((result) => {
      console.log(`added ${result.name} ${result.number} to phonebook`)
      mongoose.connection.close()
    })
  } else {
    console.log('phonebook:')
    Person.find({})
      .then((persons) =>
        persons.forEach((p) => console.log(`${p.name} ${p.number}`))
      )
      .then(() => mongoose.connection.close())
  }
})()
