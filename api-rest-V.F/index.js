require('dotenv').config(); 
const app = require('./app');
const port = process.env.PORT;

app.listen(port, function(){
    console.log(`L'application fonctionne sur le port ${port}`);
});
