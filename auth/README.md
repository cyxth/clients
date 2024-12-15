# cyxth auth

authorize users to use your cyxth instance

## installation

```bash
npm install @cyxth/auth
```

## create an authorization token

```js
import Auth from '@cyxth/auth'

const APP_ID = 'YOUR_APP_ID';
const PRIVATE_KEY = env(PRIVATE_KEY);
const auth = new AUTH(APP_ID,PRIVATE_KEY);


const user = {id: "alice"}

const token = auth.createToken(user,{duration: '1h' })

// send token to your frontend to use in connect() function
console.log(token)

// something {token: "eyJhbGciOi.............-b0FjCQqTUEb_lHo2eUAUMdXgvRAA",}

```

read more on the [authorization guide](https://cyxth.com/docs/guides/authorization).
