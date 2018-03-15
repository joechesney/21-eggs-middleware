
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const eggRoutes = require("./routes/routes.js");
const path = require("path"); 
console.log('HELLO from express');
// console.log('eggRoutes',eggRoutes);


const logParams = (req, res, next) =>{
  console.log('this is a middleware');
  console.log('req.params.egg',req.params.egg);
  console.log('req.params.originalUrl',req.originalUrl);
  console.log('req.url',req.url);

  next();  
}
app.use( logParams);
//middleware starts here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// eggs
app.use( (req, res, next)=>{
  if(req.url.includes("egg")){
  console.log(`
              ,ggadddd8888888bbbbaaa,_
          ,ad888,      \`Y88,      \`Y888baa,
        ,dP"  "Y8b,      \`"Y8b,      \`"Y8888ba,
      ,88      "Y88b,      \`"Y8ba,       \`"Y88Ya,
    ,P88b,      \`"Y88b,       \`"Y8ba,_       ""8a,
    ,P'"Y88b,        "Y88b,        \`"Y8ba,_      \`Ya,
    8'    "Y88b,        ""Y8ba,         ""Y8ba,_   \`8,
    8b       "Y88b,         ""Y8ba,_         ""Y88baaY
    88b,        "Y88ba,         ""Y88ba,_         \`""P
    8Y88ba,        ""Y88ba,_         ""Y88ba,,_    ,P'
    \`b,"Y88ba,         ""Y88baa,_         """Y888bd"
    \`b, \`"Y88ba,_         ""Y888baa,_         ,8"
      \`8,   \`""Y88ba,_         \`"""Y8888baaaaaP"
        \`Ya,     \`""Y888ba,_           \`"d88P"
          \`"Yb,,_     \`""Y888baa,__,,adP""'
            \`"""YYYY8888888PPPP"""'
      `);
      console.log('eggery');
      res.sendFile(path.join(__dirname, './public', "egg.html"));
  }
  next()
});
app.use( eggRoutes );
app.use( logParams);

// TODO: add error handler
app.use((req,res, next)=>{
  let error = new Error("Not found, as hell");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next)=>{
  console.log(error);
  // one error handler to rule them all
  // any error that happens in any app.use function will automatically
  // be sent to this function and this function will deal with it
  res.send(error);
});


app.use(express.static(__dirname + "/public", {extensions: "html"}));
app.listen(8081, ()=>{
  console.log(`listening on port 8081`);
});
