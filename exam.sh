curl  -X POST  http://localhost:8080/ -H "Content-Type:application/json" --data '{
 "env":"staging",
 "url": "https://tesing-answerforcewebsite.appspot.com/uk",
 "script_name":"./tests/buttons.spec.js",
 "browser":"chromium",
 }'