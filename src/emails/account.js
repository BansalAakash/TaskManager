const api_key = 'bb95fab704144c11045b01cf75c9bf52-8d821f0c-e1dd21ba'
const DOMAIN = 'sandbox32ce438ea0604074b5dfc854732babed.mailgun.org'

const mailgun = require("mailgun-js")

const mg = mailgun({apiKey: api_key, domain: DOMAIN})
const data = {
	from: 'aakash6025@gmail.com',
	to: 'aakash6025@gmail.com',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
	console.log(body)
});