const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const axios = require('axios')
const bot = new Telegraf(env.token)
const PAYMENT_TOKEN = ''

const botaotabelaVoltar = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Voltar', 'voltarContinuar'),
    Markup.callbackButton('Voltar para o início', 'btn-voltar'),
    Markup.callbackButton('Encerrar Conversa', 'Encerrar')
], { columns: 2 }))

const botaoAjuda = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Guia completo', 'btn-guia'),
    Markup.callbackButton('O que são bots?', 'btn-bots'),
    Markup.callbackButton('Minha compra é confiável', 'btn-compra'),
    Markup.callbackButton('Meus dados estão seguros', 'btn-dados'),
    Markup.callbackButton('Como solicitar um Reembolso?', 'btn-reembolso'),
    Markup.callbackButton('FAQ', 'btn-faq'),
    Markup.callbackButton('Voltar', 'btn-voltar')
], {columns: 2}))

const tecladoinicio = Markup.keyboard([
    ['Continuar'],
    ['Ajuda']

]).resize().oneTime().extra()

const botaoContinuar = Markup.keyboard([
    ['Ver tabela'],
    ['Promoções da semana'],
    ['Novidades'],
    ['Voltar']

]).resize().oneTime().extra()


const botaoSouN = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim', 's'),
    Markup.callbackButton('Não', 'n')
], { columns: 2 }))


const produtos = [
    {
        name: 'Item 1',
        price: 20.00,
        description: 'Este item é um teste',
        photoUrl: 'https://www.extra-imagens.com.br/games/acessorios-geek/bonecos-geek/7989219/826683828/boneco-funko-pop-star-wars-darth-vader-11519551.jpg'
    },
    {
        name: 'Item 2',
        price: 50.40,
        description: 'Este item é um teste haha',
        photoUrl: 'https://sm.ign.com/ign_br/screenshot/default/dbz_cevb.jpg'
  }
]

function createInvoice (produtos) {
    return {
        provider_token: PAYMENT_TOKEN,
        start_parameter: 'foo',
        title: produtos.name,
        description: produtos.description,
        currency: 'BRL',
        photo_url: produtos.photoUrl,
        is_flexible: false,
        need_shipping_address: false,
        prices: [{ label: produtos.name, amount: Math.trunc(produtos.price * 100) }],
        payload: {}
    }
}

//INICIO DO BOT
bot.start(async ctx => {
    const nome = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${nome}! 🥰 Eu me chamo Nix-bot, vou te ajudar nas suas compras ok?!`)
    await ctx.replyWithMarkdown(`A qualquer momento, \nvocê pode digitar ou clicar no botão *Ajuda*. Você vai encontrar um guia de ajuda e como fazer o seu pedido e finaliza-lo`)
    await ctx.reply('Podemos continuar?', tecladoinicio)

})

//BOTÃO AJUDA
bot.hears(/Ajuda/i, async ctx => {
    await ctx.replyWithMarkdown(`Como posso ajudar?`, botaoAjuda)
})

//GUIA COMPLETO SOBRE O BOT
bot.action('btn-guia', ctx => {
    ctx.editMessageText(`*Aqui ficará meu guia completo*`, botaoAjuda)
})

//O QUE SÃO BOTS
bot.action('btn-bots', ctx =>{
    ctx.editMessageText(`Um bot – abreviatura de robô – é um programa de software que executa tarefas automatizadas, repetitivas e pré-definidas. Os bots normalmente imitam ou substituem o comportamento do usuário humano. Por serem automatizados, operam muito mais rápido do que os usuários humanos. Eles realizam funções úteis, tais como serviço ao cliente ou indexação de motores de busca, mas também podem vir sob a forma de malware – usado para obter controle total sobre um computador.`, botaoAjuda)
})

//AJUDA COM A COMPRA
bot.action('btn-compra', ctx => {
    ctx.editMessageText(`Sim, sua compra é confiavel`, botaoAjuda)
})

//AJUDA COM PRIVACIDADE DE DADOS
bot.action('btn-dados', ctx => {
    ctx.editMessageText(`Estão totalmente seguros`, botaoAjuda)
})

//Botão DE AJUDA DE PEDIDO DE REEMBOLSO
bot.action('btn-reembolso', ctx => {
    ctx.editMessageText(`Atravez do link você será direcionado ao atendimento ao cliente, você deve deixar sua solicitação/reclamação de reembolso. Ele será analizado e dentro de algumas horas o adm entrará em contado com você`, botaoAjuda)
})

//Botão FAQ
bot.action('btn-faq', ctx => {
    ctx.editMessageText(`Aqui ficará perguntas e respostas...`, botaoAjuda)
})

//Botão voltar inline (INICIO)
bot.action('btn-voltar', ctx => {
    ctx.replyWithMarkdown(`Voltando para o menu de inicio, clique em continuar 🥰`, tecladoinicio)
})

//Menu continuar
bot.hears(/Continuar/i, async ctx =>{
    await ctx.replyWithMarkdown(`Estou tão feliz com seu interesse 🤭 Então... O que você vai querer hoje?`)
    await ctx.replyWithMarkdown(`Escolha e clique em uma das opções: `,botaoContinuar)
})

//Botão voltar (INICIO)
bot.hears(/Voltar/i, ctx =>{
    ctx.reply(`Voltando... 🤭 `, tecladoinicio)
})

//Tabelas
bot.hears(/Ver tabela/i, async ctx => {
    await ctx.reply('Vou te enviar minha tabela 🔥')
    await ctx.replyWithPhoto({source: `${__dirname}/imagens/imgTest.jpg`})
    await ctx.replyWithMarkdown(`*Proxima tabela*`)
    await ctx.reply(`Deseja iniciar seu pedido?`, botaoSouN)

})

//promoçoes da semana
bot.hears(/Promoções da semana/i, async ctx => {
    await ctx.replyWithMarkdown(`*Aqui ficará as promoções da semana*`, botaoContinuar)
})

//Tabela de novidades
bot.hears(/Novidades/i, async ctx => {
    await ctx.replyWithMarkdown(`*Aqui ficará as Novidades da semana*`, botaoContinuar)
})

//Botão sim para compra
bot.action('s', ({ replyWithMarkdown }) => replyWithMarkdown(`
Escolha seu item 😈
${produtos.reduce((acc, p) => {
    return (acc += `*${p.name}* - ${p.price} R$\n`)
    }, '')}    
Então... o que vai querer hoje?`,
    Markup.keyboard(produtos.map(p => p.name)).oneTime().resize().extra()
))

produtos.forEach(p => {
    bot.hears(p.name, (ctx) => {
        console.log(`${ctx.from.first_name} está prestes a comprar um ${p.name}.`);
        ctx.replyWithInvoice(createInvoice(p))
    })
})

bot.on('pre_checkout_query', ({ answerPreCheckoutQuery }) => answerPreCheckoutQuery(true))

bot.on('Pagamento feito', (ctx) => {
    console.log(`${ctx.from.first_name} (${ctx.from.username}) just payed ${ctx.message.successful_payment.total_amount / 100} R$.`)
})
//finalizando pagamento

//não para compra
bot.action('n', async ctx =>{
    await ctx.replyWithMarkdown('Ok')
    await ctx.replyWithMarkdown(`O que deseja?`, botaotabelaVoltar)
})

//Voltar para o menu continuar
bot.action('voltarContinuar', ctx => {
    ctx.reply(`Voltando para o menu continuar`, botaoContinuar)
})

//Encerrando chat
bot.action('Encerrar', async ctx =>{
    await ctx.reply('Foi um prazer conversar com você :) ')

})




bot.startPolling()
