const express = require('express');
const app = express();

app.get('/api', function(request, response) {
    response.send('<h1>Hello World</h1>')
})

app.listen(3333, function(){
    console.log('Server is running')
})