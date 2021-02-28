# melody mapper :musical_note: :memo:
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
4. To run the ml model server, issue the following installations and commands:
```
cd ..
cd mlmodel
pip install flask
pip install -U flask-cors		
pip install sklearn
FLASK_APP=mlmodel.py flask run
```
5. Run the backend server by opening another CLI app and running:
```
cd melody-mapper
cd backend
nodemon server
```
6. Run the site on your browser by opening another CLI app and running:
```
cd melody-mapper
npm start
```
If a warning indicates you cannot resolve react-router-dom, you need to then install `npm install react-router-dom --save`.
