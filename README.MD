
# Jobhub

#### Track Your Job Search

Project in Action - [Jobhub](https://jobhub-rituraj.onrender.com/)


#### Run The App Locally

```sh
npm run install-dependencies
```

- setup values for - MONGO_URL, JWT_SECRET, JWT_LIFETIME, PORT
-if using cloudinary to upload images, then for these as well :-
 CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET

- navigate to client/src/context/appContext.js and edit the base url in the axios configuration, change the port according to your configuration

```
const authFetch = axios.create({
        baseURL: 'http://localhost:5000/api/v1',
    });
```

- in the root directory

```sh
npm start
```

- visit url http://localhost:{env-port-value}/