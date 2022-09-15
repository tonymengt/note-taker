const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes/NotesRoutes')
const htmlRoutes = require('./routes/htmlRoutes/index')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));



app.use('/api', apiRoutes);
app.use('/', htmlRoutes);



app.listen(PORT, () => {
    console.log(`api server now on ${PORT}!`);
})