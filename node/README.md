# cyxth node sdk

## :biohazard: <span style="color:#eb0a33">  heads up</span>

<div style="color:#eb0a33">
cyxth is still in development and the api is subject to change. please don't use it in production yet.
</div>

create and revoke authentication token and manage your cyxth resources on your node backend  

## installation

```bash
# with npm
npm install @cyxth/node

# or with yarn
yarn add @cyxth/node
```

## create an authorization token

```js
import Cyxth from '@cyxth/node';

const APP_ID = 'your app id'
const APP_SECRET = 'your app secret'

const cyxth = new Cyxth(APP_ID, APP_SECRET);

let user = {
    user_id:"user id",
    name:"name",
    avatar:"optional_avatar_url"
}

let token = cyxth.createToken(user);

// use token to authorize user in your frontend `cyxth.authorize(token)`
```

*wip - still in development*
