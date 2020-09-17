const http = require('http')
const fs = require('fs')
const path = require('path')

let app = http.createServer((request, response) => {
    console.log('Request starting...', request.url)

    let filePath = '.' + request.url
    if (filePath === './')
        filePath = './public/views/index.html'

    if (! fs.existsSync(filePath)){
        response.writeHead(404)
        response.end()
    }

    fs.readFile(filePath, function (error, content){
        if (error) {
            response.writeHead(500)
            response.end()
        }

        if(path.extname(filePath) === '.jpg'){
                response.setHeader('Content-Type', 'image/jpeg')
                response.end(content)
            }

        if(path.extname(filePath) === '.css'){
                response.setHeader('Content-Type', 'text/css')
                response.end(content)
             }

        if(path.extname(filePath) === '.html'){
             response.setHeader('Content-Type', 'text/html')
             response.end(content, 'utf-8')
        }

        if(path.extname(filePath) === '.js'){
            response.setHeader('Content-Type', 'text/javascript')
            response.end(content)
        }
    })
})
app.listen(3000)
console.log('Server is running at 127.0.0.1:3000/ or http://localhost:3000')
