# Loquela Language Learning

## Setup
- Clone the repo onto your machine:
    ```
    git clone https://github.com/laurenmackey/loquela.git
    ```
- [Install node](https://nodejs.org/en/) if needed
- Install dependencies:
    ```
    npm install
    ```
- Set up your local database:
    - Install and start up postgres. This will vary by operating system. I followed the instructions under "Installation" [here](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/)
    - Create a default user:
    ```
    psql postgres
    CREATE ROLE me WITH LOGIN PASSWORD 'password';
    ALTER ROLE me CREATEDB;
    \q
    ```
    - Login as default user and create loquela db:
    ```
    psql -d postgres -U me
    CREATE DATABASE loquela;
    \q
    ```
    - Create and populate tables from migration files:
    ```
    db-migrate up
    ```
    - If you need to modify the tables, either change the migration file or create a new one (`db-migrate create my-migration-title`).
    Then drop and re-create the tables:
    ```
    db-migrate reset
    db-migrate up
    ```
    - You can also use `db-migrate down` instead of `db-migrate reset` if you just want to undo the most recent migration.
    - It will probably help to download a database GUI of some sort. I downloaded Postico and set it up with the following credentials:
    ```
    Nickname: localhost
    Host: localhost
    Port: 5432
    User: me
    Database: postgres
    ```
- Set up python dependencies:
    - These instructions assume you're using python 3.3+ so you may need to install that.
    - Install SpeechRecognition and check that it worked by printing it's version number:
        ```
        pip install SpeechRecognition
        python
        import speech_recognition as sr
        sr.__version__
        exit()
        ```
    - Install and test out PyAudio:
        ```
        pip install pyaudio
        python -m speech_recognition
        ```


## Local Development
- Pull in changes from master:
    ```
    git checkout master
    git pull origin master
    ```
- Create a new branch:
    ```
    git checkout -b your-name/your-feature
    ```
- Start up the server:
    ```
    cd server/server
    nodemon app.js
    ```
- If you get some errors related to nodemon, just run the command below and try starting up the server again:
    ```
    npm install -g nodemon
    ```
- Visit http://localhost:8080/ to see the site
- Make changes as needed
- Add, commit, push your changes
    ```
    cd ../..
    git add .
    git status
    git commit -m "Your commit message"
    git push origin your-name/your-feature
    ```
- Submit a pull request: 
    - Go to your branch on github and click "Compare and pull request"
    - Look over the files changed and add any necessary comments
    - Submit the request
- Either ask someone to review it or just approve the pull request from the master branch
