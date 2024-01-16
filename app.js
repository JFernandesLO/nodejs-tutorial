
/*
const tutorial = require('./tutorial');
console.log(tutorial.sum(1,1));
console.log(tutorial.PI);
console.log(new tutorial.SomeMathObject());
*/

/*
const EventEmitter = require('events');
const eventEmiiter = new EventEmitter();

eventEmiiter.on('tutorial', (num1, num2)=>{
    console.log(num1  + num2);
});

eventEmiiter.emit('tutorial',1,2);

class Person extends EventEmitter {
    constructor(name){
        super();
        this._name = name;
    }
    get name(){
        return this._name;
    }
}

let pedro = new Person('Pedro');
let christina = new Person('Christina');

pedro.on('name', ()=>{
    console.log('my name is ' + pedro.name);
});
christina.on('name', ()=>{
    console.log('my name is ' + christina.name);
});

pedro.emit('name');
christina.emit('name');
*/

/*
const readline = require('readline');
const rl = readline.createInterface({input : process.stdin,
                            output: process.stdout});
let num1 = Math.floor((Math.random() * 10) + 1);
let num2 = Math.floor((Math.random() * 10) + 1);
let answer = num1 + num2;

rl.question(`What is ${ num1 } + ${ num2 }?\n`, 
(userInput)=>{
    if(userInput.trim() == answer){
        rl.close();
    }
    else{
        rl.setPrompt('Incorrect response, please try again\n');
        rl.prompt();
        rl.on('line',(userInput)=>{
            if(userInput.trim() == answer){
                rl.close();
            }
            else{
                rl.setPrompt(`Your answer of ${ userInput } is incorrect try again\n`);
                rl.prompt();
            }
        });
    }
});

rl.on('close',()=>{
    console.log('Correct!');
});
*/
/*
const fs = require('fs');
// create a file
fs.writeFile('example.txt', "this is an example", (err) =>{
    if(err){
    console.log(err);
    }
    else{
    console.log('File succesfully created');
    fs.readFile('example.txt', 'utf8', (err,file)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(file);
        }
    });
    }
});
fs.rename('example.txt', 'example2.txt', (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('succesfully rename the file');
    }
});
fs.appendFile('example2.txt', "Some data being appended", (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('succesfully appended data to the file');
    }
});

fs.unlink('example2.txt', (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('succesfully deleted the file');
    }
});
*/
/*
const fs = require('fs');
fs.mkdir('tutorial', (err)=>{
    if(err){
        console.log(err);
    }
    else{
        fs.writeFile('./tutorial/example.txt', "123", (err)=>{
            if(err){
                console.log(err);
            }   
            else{
                console.log('File succesfully created');
            }
        })
        console.log('succesfully created the folder');
    }
});


fs.unlink('./tutorial/example.txt', (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('File succesfully deleted');
        fs.rmdir('tutorial', (err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('succesfully deleted the folder');
            }
        });
    }
});

fs.readdir('example', (err, files)=>{
    if(err){
        console.log(err);
    }
    else{
        for(let file of files){
            fs.unlink('./example/' + file, (err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log('succesfully deleted the file');
                }
            })
        }
    }
})
*/

//const fs = require('fs');
//const zlib = require('zlib');
//const gzip = zlib.createGzip();
//const gunzip = zlib.createGunzip();
//const readStream = fs.createReadStream('./example2.txt.gz');
//const writeStream = fs.createWriteStream('uncompressed.txt');
/*const readStream = fs.createReadStream('./example.txt', 'utf8');
const writeStream = fs.createWriteStream('example2.txt.gz');
readStream.on('data', (chunk)=>{
    writeStream.write(chunk);
}); // useful for copying incredibly large text files, because it copies chunks of the file
*/
//readStream.pipe(writeStream); //short hand version for the one above
//readStream.pipe(gunzip).pipe(writeStream);
/*
const http = require('http');
const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.write('hello world its julia');
        res.end();
    }
    else{
        res.write('using some other domain');
        res.end();
    }
});

server.listen('3000');
*/
/*
const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
    const readStream = fs.createReadStream('./static/index.htmla');
    res.writeHead(200, {'Content-type' : 'text/html'});
    readStream.pipe(res);
}).listen(3000);


const _ = require('lodash');
let example = _.fill([1,2,3,4,5], "banana", 1, 4);
console.log(example);
*/

const express = require('express');
const path = require('path');
const bpdyParser = require('body-parser');
const bodyParser = require('body-parser');
const Joi = require('joi');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'static','index.html'));
});

app.post('/', (req,res)=> {
    console.log(req.body);
    const schema = Joi.object().keys({
        email : Joi.string().trim().email().required(),
        password : Joi.string().min(5).max(10).required()
    });
    Joi.validate(req.body,shchema,(err,result)=>{
        if(err){
            console.log(err);
            res.send('an error has occured');
        }
        console.log(result);
        res.send('succesfully posted data');
    })
    // database work here
    res.send('succesfully posted data');
    res.json({success : true});
});

//app.get('/example', (req,res)=>{
  //  res.send('hitting example route');
//});

//app.get('/example/:name/:age', (req,res)=>{
    //console.log(req.params);
    //console.log(req.query);
    //res.send(req.params.name + " : " + req.params.age);
//});


app.listen(3000);


