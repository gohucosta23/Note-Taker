const express = require("express");


const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static("public"));

require("./public/js/routes/apiRoutes")(app);
require("./public/js/routes/htmlRoutes")(app);


app.listen(PORT, function(){

    console.log("App listening to PORT : " + PORT);
  
});


 