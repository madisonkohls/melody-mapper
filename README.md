# melody mapper :musical_note: :green_book:
Contributers: Madison Kohls, Nisha McNealis, Ellie Krugler, Karina Santoso, Mihir Hasan

Final Project for UCLA CS 97: Software Construction Projects.

Web App that track mood, music preference, and journal entries. Built using the MERN stack(MongoBD, Express.js, React.js, and Node.js) + Flask.

## Running the web app locally
1. On the command line, clone this repository by running:
```
git clone https://github.com/madisonkohls/melody-mapper.git
```
2. Next, move into the repository:
```
cd melody-mapper
```
3. Once in the repository, run the follow commands to install the necessary dependencies:
```
npm install
cd backend
npm install
sudo npm install -g nodemon
```
Note that `sudo` is only needed if you are not the root user (`sudo` installs to folders which your default user may not have access to by default)
4. To run the ml model server, issue the following installations and commands:
```
cd ..
cd mlmodel
pip install flask
pip install -U flask-cors		
pip install sklearn
FLASK_APP=mlmodel.py flask run
```
5. Run the backend server by opening another CLI app in the directory melody-mapper and running:
```
cd melody-mapper
cd backend
nodemon server
```
6. Run the site on your browser by opening another CLI app in. the directory melody-mapper and running:
```
cd melody-mapper
npm start
```

## Troubleshooting :woman_technologist:
* If a warning indicates you cannot resolve react-router-dom, you need to then issue: `npm install react-router-dom --save`.
* If you see the error 'Error: listen EADDRINUSE,' a process on your computer is running on a port our app uses (3000, 5000, and 8000). To end this process, find the PID via the command `lsof -i tcp:PA` where PA is the port address. Then terminate the process via the command `kill -9 PID` where PID is the port ID
