const http = require('http'); //모듈 가져옴 
const fs = require('fs')

http.createServer((req, res) => {

    let {url} = req

    fs.readFile('.' + url, (err, data) => {
        if(!err) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(data)
            return
        }else if(err && err['errno'] === -2){
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.end('Not Found File')
            return
        }
        res.writeHead(500)
        res.end('server error')
        console.log(err)
    })
    
    // let { url, headers, method } = req
    let body = {};

    // console.log(url, method)

    req.on('data', (data) => { //클라이언트가 포함한 body 데이터를 인자로 받음
        
        console.log(data) // 버퍼형태
        console.log(data.toString()) //toString()으로 문자열 변환 필요
        data.toString().split('&').map(item => { //json 형태로 변형
            let s = item.split('=')
            let key = s[0]
            let value = s[1]
            body[key] = value
        })
    }).on('end', () => {
        console.log(body)
    }).on('error', (err) => {
        console.log(err)
    });

    // let resData = '<html><body><h1>!!!hello world!!!</h1></body></html>'

    // res.writeHead(200, {'Content-Type' : 'text/html'}); //응답코드 200 설정
    // res.end(resData) //요청을 끝낸다. 서버가 요청한 클라이언트에게 데이터 주는 부분
}).listen(3000, () => {
    console.log('server on: 3000port')
});

/**
 * 서버는 클 요청에 따라 정확하게 응답해야함
 * 요청객체(request) : 사용자의 요청 파악
 * 응답객체(respond) : 사용자가 원하는 형태로 응답
 * 
 * 응답코드
 * 200 : 성공 요청 처리
 * 201 : 성공 데이터 추가
 * 404 : 요청 리소스 없음
 * 500 : 서버 문제로 에러 발생
 * res.statusCode = 200;
 */