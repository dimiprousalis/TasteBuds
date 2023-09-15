# TasteBuds
Taste Buds is a fullstack web application used to search for recipes, save existing recipes or create your own recipes, and share with friends!

**Live Website: https://taste-budz.netlify.app/**

## 🛠️ Built With

- MongoDB, Mongoose.js
- Node.js, Express.js
- JSON Web Tokens
- React.js, Material UI
- Formik/Yup
- HTML5/CSS3, Javascript
- VSCode
- Backend hosted on Railway
- Frontend hosted on Netlify

<!-- GET YOUR OWN COPY -->

## 🚀 Get your own copy running!
Clone the repository to your local machine: git clone https://github.com/dimiprousalis/TasteBuds.git
### Backend
In one terminal:
1. Change the directory to the config folder and create a new file 
    ```sh 
    cd server/config
    touch .env
    ```
2. Create .env variables PORT and DB_STRING
    ```sh
    PORT = 3001 
    MONGO_URI = "<Replace everything in quotes with MongoDB Connection String>"
    ```
3. Navigate back to the server
    ```sh
    cd ..
    ```
4. Install packages and dependencies
    ```sh
    npm i
    ```

### Frontend
In a second terminal:
1. Navigate to the client folder and create a new file
    ```sh
    cd client
    touch .env
    ```
2. Create .env variables REACT_APP_API_KEY and REACT_APP_NODE_ENVIRONMENT
    ```sh
    REACT_APP_API_KEY = <Enter spoonacular API key>
    REACT_APP_NODE_ENVIRONMENT = development
    ```
3. Navigate back to the client
    ```sh
    cd ..
    ```
4. Install packages and dependencies
    ```sh
    npm i
    ```
 
### Start the app
Concurrently is a package that allows you run multiple commands in a single terminal <br />
To run the application in a development server,
1. Navicate to the client folder and run the application using:
    ```sh
    "npm start",
    ```
*The client side application will render on localhost:3000* <br />
