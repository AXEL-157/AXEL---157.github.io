ETODO - APP:

For this project, we used:

- Express
- Vite
- React (JSX)
- MySQL
- Javascript
- Bcrypt
- Docker Desktop

In order to run this project, you need to follow the following steps:

- git clone <B-WEB-101-RUN-1-1-etodo-1>
This creates a folder containing:
    - The project source code
    - The Docker files
    - Everything needed to run the app

- Create a .env with the corresponding information at the root of backend and frontend:
    MYSQL_DATABASE=etodo
    MYSQL_HOST="db"
    MYSQL_USER=todo_user
    MYSQL_ROOT_PASSWORD=pass
    MYSQL_PASSWORD=pass
 
    PORT=3000
    SECRET_KEY=YourJwTSecretKeyHere
 
- docker compose up --build
    This will launch the application and you'll just need to go to : http://localhost:5173/




