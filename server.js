//run the application, all other logic go app
//This app uses MVC structure
import http from 'http';
import app from './app/app.js';

//create server
const PORT = process.env.PORT || 7000
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is running on port ${PORT}`));