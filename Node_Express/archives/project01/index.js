const http = require('http')
const url = require('url')
const fileSync = require('fs')

/* Ler o arquivo somente uma vez */
const teamData = fileSync.readFileSync('./data/teamData.json', 'utf-8')
const teamDataObj = JSON.parse(teamData)

const index = fileSync.readFileSync('./templates/index.html', 'utf-8')
const team = fileSync.readFileSync('./templates/team.html', 'utf-8')
const teamCard = fileSync.readFileSync('./templates/teamCards.html', 'utf-8')
const persona = fileSync.readFileSync('./templates/persona.html', 'utf-8')

const replaceTemplate = (temp, persona) => {
    let output = temp.replace(/{%NAME%}/g, persona.name)
    output = output.replace(/{%EMAIL%}/g, persona.email)
    return output
}

const server = http.createServer((request, response) => {
    const pathName = request.url

    if (pathName === '/' || pathName === '/home') {
        response.writeHead(200, { 'Content-type': 'text/html' })
        response.end(index)
    }
    else if (pathName === '/about') {
        response.end('About page')
    }
    else if (pathName === '/team') {
        const cards = teamDataObj.map(e => 
            replaceTemplate(teamCard, e)
        ).join('')

        const output = team.replace('{%TEAM%}', cards)

        response.writeHead(200, { 'Content-type': 'text/html' })
        response.end(output)
    }
    else {
        response.writeHead(404);
        response.end('<h1>Page not found</h1>')
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('listen requests on port 8000')
})