const checkIP = require('./src/js/check')
const googlePing = require('./src/js/ping')
const googleDNS = '8.8.8.8'
const B6ip = '178.158.233.3'
const testIP = '178.158.238.89'
const ANSWERS = require('./src/js/text-constants')
const PING_INTERVAL = 60000;

// global.ConnectionState = {
// 	alive: false,
// 	aliveTime: 0,
// 	lostTime: 0,
// 	currentTime: Date.now(),
// }
// global.usersList = []
require('./src/model/init-db-read')().then(
	async () => {
		await checkIP()
	}
)
	.catch(err => console.error)


const handlerMainPing = setInterval(async () => {
	const rlt = await checkIP()
	// const checktime = Date.now()
	// console.log(checktime, "   -   ", rlt);
}, PING_INTERVAL);


const dotenv = require('dotenv');
dotenv.config();

const botConfig = require('./config.json')

const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(botConfig.token);

bot.use(Telegraf.log());
const mainMarkupKeyboard = Markup.keyboard([[
	Markup.button.callback("Початок", "start"),
	Markup.button.callback("Перевірка", "check"),
],
[
	Markup.button.callback("Підписатись", "subcribe"),
	Markup.button.callback("Відписатись", "unsubscribe"),
]]
)
	.oneTime().resize()




const startReaction = async ctx => {
	return await ctx.reply(
		ANSWERS.START_TEXT,
		// Markup.keyboard(["/start", "/check"]).oneTime().resize(),
		mainMarkupKeyboard,
	);
}

bot.command("start", startReaction);
bot.hears("/start", startReaction);
bot.hears("Початок", startReaction);

const checkReaction = async ctx => {
	// let checkResult = false;
	// try {
	// 	checkResult = await googlePing(B6ip, pingConfig)

	// } catch (error) {
	// 	console.log("#### PING FUNCTION FAIL", error);
	// }

	return await ctx.reply(
		global.ConnectionState.alive ? ANSWERS.OK_TEXT : ANSWERS.FAIL_TEXT,
		// checkResult ? ANSWERS.OK_TEXT : ANSWERS.FAIL_TEXT,
		// Markup.keyboard(["/start", "/check"]).oneTime().resize(),
		mainMarkupKeyboard,
	);
}

bot.command("check", checkReaction);
bot.hears("check", checkReaction);
bot.hears("Перевірка", checkReaction);

bot.command("forcecheck", async ctx => {
	let checkResult = false;
	try {
		checkResult = await googlePing(B6ip)

	} catch (error) {
		console.log("#### PING FUNCTION FAIL", error);
	}

	return await ctx.reply(
		checkResult ? ANSWERS.OK_TEXT : ANSWERS.FAIL_TEXT,
		// Markup.keyboard(["/start", "/check"]).oneTime().resize(),
		Markup.keyboard([
			Markup.button.callback("Початок", "start"),
			Markup.button.callback("Перевірка", "check"),
			// "Початок", "Перевірка"

		])
			.oneTime().resize(),
	);
});

bot.launch();


