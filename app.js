const express = require('express')
var request = require('request');
const app = express()
app.use(express.static('public'))


//Application Constant
var client_id = '<client_id>';
var client_secret = '<client_secret>';

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/callback', function(req, res) {
    var code = req.param('code');
    var state = req.param('state');
    doPost(code, state);
    res.send("Code:"+ code + ' State:' + state);
});

//do post call to get token
function doPost(code, state){
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }
    var options = {
        url: 'https://accounts.google.com/o/oauth2/token',
        method: 'POST',
        headers: headers,
        form: {'grant_type': 'authorization_code', 'code': code, 
            'client_id' : client_id ,
            'client_secret': client_secret,
            'redirect_uri': 'http://localhost:3000/callback' }
    }
    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var tokenDetails = JSON.parse(response.body);
            console.log("***access_token***" + tokenDetails.access_token);
            console.log("***expires_in***" + tokenDetails.expires_in);
            console.log("***refresh_token***" + tokenDetails.refresh_token);
            console.log("***token_type***" + tokenDetails.token_type);
        }
    })
}


app.listen(3000, () => console.log('Example app listening on port 3000!'))