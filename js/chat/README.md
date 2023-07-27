# cyxth chat api

cyxth chat api

```js
// a simple example
import Cyxth from '@cyxth/chat';

const APP_URL = 'your_app_url';

const cyxth = new Cyxth(APP_URL);

let user = {
	name: 'alice',
	id: 'alice'
};

const connectCyxth = async () => {
	try {
		/// get token from your backend authorization service
		let token = await getToken(user);
		await cyxth.connect(token);
	} catch (e) {
		console.error('failed to connect', e);
	}
};

/// func to send messages
const sendMessage = (message) => {
	cyxth
		.send('channel_id', { text: message })
		.then((sent) => {
			// update messge sent status
		})
		.catch((err) => {
			// handle error
		});
	// add message to channel messages
};

cyxth.on('message', (data) => {
	// add message to channel messages
});

//cyxth.on ....

connectCyxth();
```

read more  
[cyxth quick start](https://cyxth.com/docs/simple-chat)  
[chat example](https://cyxth.com/docs/advanced-chat)
[cyxth docs](https://cyxth.com/docs)
