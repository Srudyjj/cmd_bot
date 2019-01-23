const { exec } = require('child_process');
const TelegramBot = require('node-telegram-bot-api');

const token = '640984668:AAHDIMBU8r3IGZwjMrcUpSoVDHrWOuwFlgA';
const bot = new TelegramBot(token, {polling: true});

var switcher = false;

bot.onText(/\/start/, (msg) => {
	switcher = true;
	console.log(msg);
	bot.sendMessage(msg.chat.id, ` Welcome!!!

for finishing send /finish`);
});

bot.onText(/\/finish/, (msg) => {
	switcher = false;
	console.log(msg);
	bot.sendMessage(msg.chat.id, "Bye");
});

bot.on('message', (msg) => {
	
	if (switcher && msg.text !== "/finish") {
		
		console.dir(msg.text);

		exec(msg.text, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error.toString()}`);
				bot.sendMessage(msg.chat.id,`exec error: ${error.toString()}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		
			bot.sendMessage(msg.chat.id,`stdout: ${stdout}`);
			bot.sendMessage(msg.chat.id,`stderr: ${stderr}`);
		})

	} else {
		bot.sendMessage(msg.chat.id, "Please send /start");
	}

});





/*
exec('shutdown -s -t 3600 & dir', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

exec('shutdown /a', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
*/