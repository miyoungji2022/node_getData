const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extends:true}));

app.get('/',(req,res) => {
    res.json({message:"Hello World!"});
});

require('./routes/hospital.route.js')(app);
require('./routes/pharmacy.route.js')(app);

app.listen(port,()=>{
    console.log(`서버 포트 : ${port} 동작중`);
});