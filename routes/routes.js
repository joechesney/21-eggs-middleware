const { Router } = require("express");
const router = Router();
const path = require("path");

router.get("/chicken", (req, res)=>{
  console.log('fethc chicken');
  res.sendFile(path.join(__dirname, '../public', "chicken.html"));
});

router.get("/", (req, res)=>{
  console.log('fethc home');
  res.sendFile(path.join(__dirname, '../public', "home.html"));
});
console.log('inside of router: ',router);


module.exports = router;