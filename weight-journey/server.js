const http = require('http')
const fs = require('fs')
// const path = require('path')
const mime = require('mime-types')
const httpStatus = require('http-status-codes')

const myRoutes = {
    '/': './public/views/index.html',
    '/about': './public/views/about.html'
}
// const routes = {
//     viewPages: ['./public/views/index.html', './public/views/about.html']
// }

let app = http.createServer((request, response) => {
    console.log('Request starting...', request.url)

    let route = myRoutes[request.url]
    if (!route) {
        route = '.' + request.url
    }
    // let filePath = '.' + request.url
    // if (filePath === './')
    //     filePath = routes.indexPage
    //
    // if (request.url === '/about')
    //     filePath = routes.aboutPage

    if (!fs.existsSync(route)) {
        response.writeHead(404)
        response.end()
    } else {

    fs.readFile(route, function (error, content) {
        if (error) {
            response.writeHead(500)
            response.end()
        } else {
            // mime.getType(path.extname(filePath))
            let contentType = mime.lookup(route)
            response.writeHead(httpStatus.OK, {'Content-Type': contentType});
            response.write(content)
            // response.setHeader('Content-Type', contentType)
            response.end()
        }

        //
        // path.extname(filePath){
        //     response.setHeader('Content-Type', 'image/jpeg')
        //     response.end(content)
        // }

        // if(path.extname(filePath) === '.jpg'){
        //         response.setHeader('Content-Type', 'image/jpeg')
        //         response.end(content)
        //     }
        //
        // if(path.extname(filePath) === '.css'){
        //         response.setHeader('Content-Type', 'text/css')
        //         response.end(content)
        //      }
        //
        // if(path.extname(filePath) === '.html'){
        //      response.setHeader('Content-Type', 'text/html')
        //      response.end(content, 'utf-8')
        // }
        //
        // if(path.extname(filePath) === '.js'){
        //     response.setHeader('Content-Type', 'text/javascript')
        //     response.end(content)
        // }
    })
}
})
app.listen(3000)
console.log('Server is running at 127.0.0.1:3000/ or http://localhost:3000')
