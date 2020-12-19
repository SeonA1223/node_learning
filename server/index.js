const express = require('express');
let app = express(); //필요한 서버의 라우팅, 미들웨어, 에러 처리 로직 설정
let router = express.Router();
const http = require('http');
const bodyParser = require('body-parser'); //body를 사용하기 위해, post로 요청할 때

app.use(bodyParser())

const users = require('./users.js')
const boards = require('./board.js')

app.use('/users', users)
app.use('/boards', boards)

app.use((req,res,next) => {
    console.log('첫 번째 미들웨어')
    next()
})
/**
 * express는 라우팅 설정에 따라 등록된 콜백함수를 실행
 * app.[method]('[URL]', 처리 로직)
 */
app.get('/', (req, res, next) => {
    res.send('hello world!');
});

app.post('/', (req, res, next) => {
    let body = req.body
    console.log(body)
    res.send('/post 요청')
});

app.get('/user/:id', (req, res, next) => {
    let params = req.params.id;
    let query = req.query;

    if(params == 1){
        next ('err') //next가 실행되면 app.use()를 실행한다. 
    }
    else{
        console.log(params, query)
        res.send('hello')
    }
});

app.use((req, res, next) => {
    console.log('404')
    res.status(404).send('<h1>Not Found Page</h1>')
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err)
})



http.createServer(app).listen(3000, ()=>{
    console.log('server on: 3000 PORT')
})