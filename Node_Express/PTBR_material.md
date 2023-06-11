# Documento de Anotações

## Criando uma API simples

Uma API é basicamente um serviço onde podemos solicitar dados do servidor. 
Vamos construir uma API simples com Node e Express.

Veja a pasta data/project01, os exemplos dados aqui estarão melhor detalhados lá.

Para criar uma API simples, precisamos primeiro exportar alguns módulos. 

```javascript 
    const http = require('http')
    const url = require('url')
```

O modulo http permite criar e manipular um servidor, nesse caso vamos criar um servidor local, e o módulo url é necessário para pegar requisições que vem através da URL do navegador.

O Modulo url também é muito necessário para fazer o roteamento da nossa API, o roteamento pode se tornar muito complicado e dificultoso de manipular, por isso usamos ferramentas como o Express.

Nesse caso, irei criar um arquivo chamado teamData.json onde eu vou armazenar pessoas que fazem parte do time fictício responsável pela criação dessa API. 

No código principal, para verificar se estamos conseguindo ter acesso ao dados nesse arquivo podemos: 

```javascript 
    /* ########################## */
    const fileSync = require('fs')
    /* ########################## */
    if(pathName === '/team'){
        fileSync.readFile('./data/teamData.json', 'utf-8', (err, data) => {
            const team = JSON.parse(data);
            response.end(data)
        })
    }
```

E depois ir até o [link](http://127.0.0.1:8000/team) da aplicação após essa etapa. 

## Criando templates
Os templates serão o meio em que o usuário vai poder conversar com o servidor, fazendo requests, recebendo responses, usando o routing e várias outras coisas. 

Os templates podem ser feitos basicamente com HTML, e nos campos onde quisermos colocar algum dado do backend posemos inserir com a seguinte notação {%CONTENT%}

Para preencer esses tamplates vamos usar JS básico junto de um módulo de leitura e escrita de arquivos:
```javascript 
    const fs = require('fs')
```

Imagine que temos um arquivo index.html, e dentro dele queremos mostrar uma mensagem, podemos definir essa mensagem no arquivo .js e chamá-la no .html: 

```html
<!-- html -->
    <p> {%MESSAGE%}  </p>
```

```javascript
    /* javascript */
    const html = fs.readFileSync('...index.html', 'utf-8')
    ...
    let output = html.replace(/{%MESSAGE%}/g, 'Hello, World!')
    response.writeHead(200, { 'Content-type': 'text/html' })
    response.end(output)
    ...
```

Dessa maneira, ao renderizar o HTML vamos mostrar no nosso template todos os dados que quisermos.
