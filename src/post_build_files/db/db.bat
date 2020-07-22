CD ./backup
CALL backup
CD ..
json-server --watch db.json --port 9022 --routes routes.json
