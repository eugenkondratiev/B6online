const checkIP = require('./src/js/check')
const googlePing = require('./src/js/ping')

const broadcastState = require('./src/js/broadcast-power-appear')

const updateUserInDb = require('./src/model/upsert-users-list')
const isAdmin = require('./src/utils/is-admin')


const googleDNS = '8.8.8.8'
const B6ip = '178.158.233.3'
const testIP = '178.158.238.89'
const ANSWERS = require('./src/js/text-constants')
const PING_INTERVAL = 120000;

const dotenv = require('dotenv');
dotenv.config();

const botConfig = require('./config.json')

const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(botConfig.token);



// global.ConnectionState = {
// 	alive: false,
// 	aliveTime: 0,
// 	lostTime: 0,
// 	currentTime: Date.now(),
// }
// global.usersList = []

require('./src/model/init-db-read')(bot).then(
	async () => {
		await checkIP(bot)

	}
)
	.catch(err => console.error)


const handlerMainPing = setInterval(async () => {
	const rlt = await checkIP(bot)
}, PING_INTERVAL);




bot.use(Telegraf.log());

bot.use(ctx => {


	if (isAdmin(ctx)) {
		const _txt = ctx.message.text;
		if (_txt.match(/\/broadcast /g)) {

			console.log("##### ADMIN MESSAGE ", _txt.replace(/\/broadcast /g, ""))
		}
	}
})

const mainMarkupAdminKeyboard = Markup.keyboard([[
	Markup.button.callback("Початок", "start"),
	Markup.button.callback("Перевірка", "check"),
],
[
	Markup.button.callback("Підписатись", "subcribe"),
	Markup.button.callback("Відписатись", "unsubscribe"),
	Markup.button.callback("TEST", "test"),
]]
)
	.oneTime().resize()

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


bot.hears("TEST", async ctx => {
	console.log("botConfig.KES", +ctx.message.chat.id, +ctx.message.chat.id == botConfig.KES, botConfig.KES, botConfig)
	let rlt

	if (isAdmin(ctx)) {
		rlt = await broadcastState(ctx);
	}

	console.log("###  broadcastState- ", rlt);
	return await ctx.reply(
		ANSWERS.TEST_TEXT,
		isAdmin(ctx) ? mainMarkupAdminKeyboard : mainMarkupKeyboard,
	);
});


const unsubscribeReaction = async ctx => {

	const _userId = ctx.message.chat.id

	if (global.users[_userId]) {
		;
		delete global.users[_userId]

		console.log("USER ID ", _userId);

		global.usersList = [...global.usersList.filter(user => {
			console.log("+user._id != +_userId", user._id, +_userId, +user._id != +_userId);
			return +user._id != +_userId
		})]
		console.log(global.usersList, global.users);
		try {

			await updateUserInDb(ctx, _userId, { deleteUser: true })
		} catch (error) {
			console.log("updateUsersListInDb error", error);
		}
	} else {
		console.log("ALREADY UNSUBSRIBED. NO SUCH USER IN THE LIST");
		console.log(global.users)
	}


	console.log("##USERID - ", _userId);
	return await ctx.reply(
		ANSWERS.UNSUBSCRIBE_TEST,
		isAdmin(ctx) ? mainMarkupAdminKeyboard : mainMarkupKeyboard,
	);

}
bot.command("unsubcribe", unsubscribeReaction);
// bot.hears("/unsubcribe", unsubscribeReaction);
bot.hears("Відписатись", unsubscribeReaction);



const subscribeReaction = async ctx => {

	const _user = {
		_id: ctx.message.chat.id,
		name: ctx.message.chat.username
	}
	console.log("before subscribeReaction", global.usersList, global.users);
	console.log("global.users[_user._id]", global.users[_user._id])
	console.log(`global.users[""+_user._id]`, global.users["" + _user._id])
	console.log(_user._id, _user._id)
	if (global.users[_user._id]
	) {
		;
		console.log("ALREADY SUBSRIBED");
	} else {
		global.users[_user._id] = !_user.name || _user.name === undefined ? "noname" : _user.name

		if (!global.usersList.some(u => +u._id == +_user._id)) global.usersList.push(_user)

		console.log("subscribeReaction", global.usersList, global.users);
		try {

			await updateUserInDb(ctx, _user._id, { insertUser: true })
		} catch (error) {
			console.log("updateUsersListInDb error", error);
		}
	}

	console.log("##USER - ", _user);
	return await ctx.reply(
		ANSWERS.SUBSCRIBE_TEST,
		isAdmin(ctx) ? mainMarkupAdminKeyboard : mainMarkupKeyboard,

	);

}
bot.command("subcribe", subscribeReaction);
// bot.hears("/subcribe", subscribeReaction);
bot.hears("Підписатись", subscribeReaction);

const startReaction = async ctx => {
	return await ctx.reply(
		ANSWERS.START_TEXT,
		// Markup.keyboard(["/start", "/check"]).oneTime().resize(),
		isAdmin(ctx) ? mainMarkupAdminKeyboard : mainMarkupKeyboard,

	);
}

bot.command("start", startReaction);
bot.hears("/start", startReaction);
bot.hears("Початок", startReaction);

const checkReaction = async ctx => {

	return await ctx.reply(
		global.ConnectionState.alive ? ANSWERS.OK_TEXT : ANSWERS.FAIL_TEXT,
		isAdmin(ctx) ? mainMarkupAdminKeyboard : mainMarkupKeyboard,

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
		Markup.keyboard([
			Markup.button.callback("Початок", "start"),
			Markup.button.callback("Перевірка", "check"),
		])
			.oneTime().resize(),
	);
});

bot.launch()
	.then(ctx => {


		try {
			console.log(bot.context)
			console.log(bot.telegram.sendMessage)
		} catch (error) {
			console.log(error)
		}
	})
	.catch(err => {
		console.log("launch error ", err)
	});
