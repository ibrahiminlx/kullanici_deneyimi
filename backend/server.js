const express = require('express')
const cors = require('cors')
const { default: helmet } = require('helmet')
const app = express()

const queueName='test'

let http=require('http').Server(app)
let io=require('socket.io')(http)
//'amqp://guest:guest@172.22.0.2';

const amqp = require("amqplib");
const message = {
    description: 'Bu bir test mesajidir 3.'
}





connect_rabbitmq();
async function connect_rabbitmq() {
    try {
        const connection = await amqp.connect('amqp://guest:guest@172.25.0.2:5672')
        const channel = await connection.createChannel()
        // const assertion =channel.assertQueue('jobsQueue')
        const assertion =channel.assertQueue('test')
        // setInterval(()=>{
        //     message.description=new Date().getTime()
        //     channel.sendToQueue('test',Buffer.from(JSON.stringify(message)))
        //     console.log('gonderilen mesaj :',message)
        // },1000)
        io.on('connection', function (socket) {
            console.log('Bir kullanıcı bağlandı');
            message.description='Bir Kullanici Baglandi'
            channel.sendToQueue('test',Buffer.from(JSON.stringify(message)))
            socket.on('targetObje',data=>{
                message.description=data
                channel.sendToQueue('test',Buffer.from(JSON.stringify(message)))
                console.log(data)
            })

        });

    }catch (e) {
        console.log('hata',e)
    }
}

app.get('/',(req, res) => {
    res.send('test')
})








app.use(express.json())
app.use(helmet())
app.use(cors())


http.listen(3001,()=>{
    console.log('3001 Online')
})