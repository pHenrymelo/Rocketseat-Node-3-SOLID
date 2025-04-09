import { app } from './app';

app.listen({
    host: "0.0.0.0",
    port: 3333
}).then(() => {
    console.log(' 🚀 server is running at http://localhost:3333')
})