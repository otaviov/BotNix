const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const axios = require('axios')
const bot = new Telegraf(env.token)





/*
EXEMPLO DE TECLADO INLINE


const inlineMessageRatingKeyboard = Markup.inlineKeyboard([
    Markup.callbackButton('👍', 'like'),
    Markup.callbackButton('👎', 'dislike')
]).extra()
bot.on('message', (ctx) => ctx.telegram.sendMessage(
    ctx.from.id,
    'Like?',
    inlineMessageRatingKeyboard)
)
bot.action('like', (ctx) => ctx.editMessageText('🎉 Awesome! 🎉'))
bot.action('dislike', (ctx) => ctx.editMessageText('okey'))

bot.startPolling()
*/





/*
EXEMPLO DE EXCLUIR TECLADO

await ctx.reply(":)", Markup.removeKeyboard());
*/





/*
EXEMPLO DE CALENDARIIO

/  instancia o calendário
const calendar = new Calendar(bot);
/  escuta o evento de data selecionado
calendar.setDateListener((context, date) => context.reply(date));
/  recuperar o HTML do calendário
bot.command("calendar", context => context.reply("Here you are", calendar.getCalendar()));
*/






/*
EXEMPLO DE TECLADO INLINE

const ajuda = bot.command("Ajuda", (ctx) => {
    ctx.reply("oi", {
        reply_markup: {
            inline_keyboard: [
                
                [ { text: "Button 1", callback_data: "btn-1" }, { text: "Button 2", callback_data: "btn-2" } ],

                
                [ { text: "Next", callback_data: "next" } ],
                
                
                [ { text: "Open in browser", url: "telegraf.js.org" } ]
            ]
        }
    });
});

bot.action('btn-1', ctx =>{
    ctx.reply('Oi')
})
*/



