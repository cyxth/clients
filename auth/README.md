# cyxth auth

authorize users to use your cyxth instance

## installation

```bash
# install
npm install @cyxth/auth
```

## create an authorization token

```js
import Auth from '@cyxth/auth'

const APP_ID = 'YOUR_APP_ID';
const PRIVATE_KEY = env(PRIVATE_KEY);
const auth = new AUTH(APP_ID,PRIVATE_KEY);


const user = {
     id: "alice"
}
const token = auth.createToken(user,{duration: '4h' })
// send token to frontend
console.log(token)
// and we get something like
// {token: "eyJhbGciOi.............-b0FjCQqTUEb_lHo2eUAUMdXgvRAA",}

```

read more
[authorization examples](https://cyxth.com/docs/authorization)
