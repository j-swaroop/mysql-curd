const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user: 'root',
    password: 'Swaroop@2001',
    database: 'mysqlcurd',
    host: 'localhost'
})


app.get('/', (req, res) => {
    const que = 'SELECT * FROM details'

    db.query(que, (err, result) => {
        if (err){
            return res.status(400).send('Try Again')
        }
        return res.send(result)
    })
})

app.post('/', (req, res) => {
    const {name, age, city } = req.body
    const statement = `INSERT INTO details(name, age, city) VALUES(?, ?, ?)`

    db.query(statement, [name, age, city], (err, result) => {
        if (err) {
            return res.status(400).send('Missed Required Field')
        }
        return res.send('Success')
        
    })
   
})

app.put('/', async (req, res) => {
    const {id, name, age, city} = req.body

    // const findOne = 'SELECT * FROM details WHERE id=?'
    // const row = await new Promise((resolve, reject) => {
    //     db.query(findOne, [id], (err, result) => {
    //         if (err){
    //             reject(err)
    //         }
    //         resolve(result)
    //     })
    // })
    

    const que = 'UPDATE details SET name=?, age=?, city=? WHERE id=?'

    db.query(que, [name, age, city, id], (err, result) => {
        if (err){
            return res.status(400).send('Error')
        }
        console.log(result.affectedRows + " record(s) updated");
        return res.send('Success')
    })

})

app.delete('/:id', (req, res) => {
    const {id} = req.params
    const que = 'DELETE FROM details WHERE id = ?'

    db.query(que, id, (err, result) => {
        if (err) {
            return res.status(400).send('Sorry')
        }
        return res.send('Success')
    })
})


const initializeDBAndServer = () => {
    db.connect((err) => {
        if (!err){
            console.log("DB Connected Successfully")
            app.listen(3001, () => {
                console.log('Server running on port 3001')
            })
        }else{
            console.log(err)
            process.exit(1)
        }
    })
}

initializeDBAndServer()

// db.connect((err) => {
//     if (err) throw err

//     db.query('CREATE TABLE demo (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), role VARCHAR(255))')
// })
