# MyBook - simple app built with MERN (Mongo, Express, React, Node)

## Prerequisites

Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

## Usage

### Install dependencies

Open root project directory using terminal/cmd:

`npm install` to install server  

`cd client` 

`npm install` to install client  

Back to root

### `Run`

`npm run dev`

Client app (:3000)

Server (:3001 & proxy 3000)


To register user make post request to 

`http://localhost:3000/api/users/register`

using Postman or any other API tool. Request body:

```
{
    "email": "mail@example.com",
    "password" : "yourpassword",
    "name":"name",
    "lastname":"lastname"
}
```
### Used libraries

* JWT 
* redux
* mongoose
* axios
...


### Live demo
https://my-react-books.herokuapp.com/


