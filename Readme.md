# Passwords
### Development Build (v.1.0.0)

A full app for storing and retrieving account credentials on your local machine. There is currently no release build yet.

### Setup instructions
#### Development
1. Clone the repo
```
git clone https://github.com/JuanSantosGomez/Passwords.git
```

##### Backend
1. Make sure to install python on your machine with pip and to environment variables.
	> https://www.python.org/downloads/ link to python download.
2. Install virtualenv to your python library.
```
pip install virtualenv
```
3. Change directory into the project 'Backend/' folder and activate virtual environment.
```
source ./venv/scripts/activate
```
4. Install dependencies.
```
pip install > requirements.txt
```

5. Migrate server
```
py manage.py migrate
```

###### Run Server
```
py manage.py runserver 0.0.0.0:8000
```

##### Frontend
1. Install node. node version used for this build is v 16.13.1
	> https://nodejs.org/en/ link to node download.
2. Install node modules and dependencies.
```
npm install
```
3. Run development server
```
npm run start
```