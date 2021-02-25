const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
	to: '@test.com',
	from: '@test.com',
	subject: 'sendgrid test',
	text: 'test text'
};
sgMail.send(msg);