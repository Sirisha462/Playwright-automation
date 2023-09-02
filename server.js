const express = require("express");
const { exec } = require('child_process');
const app = express();
exports.textexecutor = app;

app.post('/', async function (req, res) {
   process.env.ENVIRONMENT = req.body.env;
   process.env.BASEURL = req.body.url;
   const browser = req.body.browser;
   const script_name = req.body.script_name;
   for (var i = 0; i < script_name.length; i++) {
      for (var j = 0; j < browser.length; j++) {
         process.env.BROWSER = browser[j];
         exec(`npx playwright test ${script_name[i]} --project ${browser[j]}`, (error, stdout, stderr) => {
            if (error) {
               console.error(`exec error: ${error}`);
               return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
         });
      }

   }
    res.sendStatus(200);
   
});

