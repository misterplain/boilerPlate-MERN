# MERN E-Commerce Boilerplate

A MERN stack e-commerce template designed for scalability. Ideal as a starting off point with Admin functionality, OAuth login, and custom Material UI theming, this clone-ready base ensures rapid deployment with optimized features. Customize to fit your needs.

The deployed site can be found [HERE](https://e-commerce-mern-eryu.onrender.com/)

#### Guest functionality

- Add and remove cart items
- Place order, receive orderId

#### User functionality

- Add and remove cart items
- Add and remove favorites
- Rate and review products
- Place order, view and edit order
- Edit profile username and avatar

#### Admin functionality

- Create/Edit/Delete collections of products
- Create/Edit/Delete products
- Moderate reviews
- Manage orders (quick search and advanced search)

#### Installation

**--Frontend--**

```sh
cd client
npm install
npm start
```

**.env file - client**
NODE_ENV=**
REACT_APP_SERVER_API_URL=**
REACT_APP_CLIENT_URL=**
PEXELS_API_KEY=**

**-Backend-**

```sh
cd server
npm install
npm run server
```

**.env file - server**
NODE_ENV=__
MONGO_URI=__
ACCESS_TOKEN_SECRET=__
REFRESH_TOKEN_SECRET=**
GOOGLE_CLIENT_ID=**
GOOGLE_CLIENT_SECRET=**
GITHUB_CLIENT_ID=**
GITHUB_CLIENT_SECRET=**
FACEBOOK_CLIENT_ID=**
FACEBOOK_CLIENT_SECRET=**
CLOUD_NAME=**
CLOUD_KEY=**
CLOUD_KEY_SECRET=**
PEXELS_API_KEY=**

#### To-do list for this project

1. [ ] Refresh tokens
2. [ ] Password reset functionality
3. [ ] User can report a review, send to moderation
4. [ ] Confirmation emails at order status change
5. [ ] Global variable - reviews require moderation or not
6. [ ] Global variable - admin level style object

Any and all feedback on this project is welcome, you may contact me [HERE](https://www.linkedin.com/in/patrick-o-brien-6743b044/)!
