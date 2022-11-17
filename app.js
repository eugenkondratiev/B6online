const checkIP = require('./src/js/check')
const googlePing = require('./src/js/ping')
const googleDNS = '8.8.8.8'
const B6ip = '178.158.233.3'
const testIP = '178.158.238.89'
const ANSWERS = require('./src/js/text-constants')
const PING_INTERVAL = 60000;

global.ConnectionState = {
	alive: false,
	aliveTime: Date.now(),
	lostTime: Date.now(),
}


const handlerMainPing = setInterval(async () => {
	const rlt = await checkIP()
	const checktime = Date.now()
	console.log(checktime, "   -   ", rlt);
}, PING_INTERVAL);


const dotenv = require('dotenv');
dotenv.config();

const botConfig = require('./config.json')

// googlePing(googleDNS, pingConfig)
//     .then(alive => {
//         console.log(`${googleDNS} - ${alive ? 'online' : 'NOT online'}`);
//     }).catch()



// import { Telegraf, Markup } from "telegraf";
const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(botConfig.token);

bot.use(Telegraf.log());

const startReaction = async ctx => {
	return await ctx.reply(
		ANSWERS.START_TEXT,
		// Markup.keyboard(["/start", "/check"]).oneTime().resize(),
		Markup.keyboard([
			Markup.button.callback("Початок", "start"),
			Markup.button.callback("Перевірка", "check"),
		])
			.oneTime().resize(),
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
		Markup.keyboard([
			Markup.button.callback("Початок", "start"),
			Markup.button.callback("Перевірка", "check"),
			// "Початок", "Перевірка"

		])
			.oneTime().resize(),
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


