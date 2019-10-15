
const app = require('express')();
const http=require('http').createServer(app);
const io=require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
let x = true;

app.get('/', (req,res)=>{
	res.send('<h1>Ramlal</h1>');
});

http.listen(3000, ()=>{
	console.log("listning on port 3000");
});

io.on('connection',(socket)=>{
	console.log('Client connection');
	sendData(socket);
})

function sendData(socket){
    
    if(x){
        socket.emit('data1', Array.from({length: 8}, () => Math.floor(Math.random() * 590)+ 10));
        x = !x;
    }else{
        socket.emit('data2', Array.from({length: 8}, () => Math.floor(Math.random() * 590)+ 10));
        x = !x;
    }
    console.log(`data is ${x}`);
    setTimeout(() => {
        sendData(socket);
    }, 10000);
}