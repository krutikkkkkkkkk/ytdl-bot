const { Telegraf } = require('telegraf')
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN)
const youtubedl = require('youtube-dl')


///Start Message
bot.start((ctx) => {
  let source = `[View on Github](https://github.com/reboot13-git/ytdl)`
    ctx.reply(`***Hello ${ctx.message.from.first_name}
    \nUse /ytdl {url} To Download video
    \nUse /syt {query} Search on Youtube
    \nSource Code:*** ${source}`,{parse_mode: 'Markdown'})
    })

///Youtube Downloader
bot.command('ytdl', (ctx) => {
    let message_id = ctx.message.message_id;
    let args =  ctx.update.message.text.split(' ')
    let url = args[1]
    let mention = `@${ctx.message.from.username}`
    if(!url.match(/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*(?:[&\/\#].*)?$/)) return ctx.reply("Enter a valid youtube url",{ reply_to_message_id: message_id , parse_mode: 'Markdown'})
    if(ctx.message.from.username == undefined){
       mention = ctx.message.from.first_name
    }
    ctx.reply("***Processing your request...***",{ reply_to_message_id: message_id , parse_mode: 'Markdown'})
  
    try{
    youtubedl.getInfo(url, function(err, info) {
      if(err){
        console.error(err)
        ctx.reply("Error occurred, Make sure your sent a correct URL",{ reply_to_message_id: message_id , parse_mode: 'Markdown'})
        return;
      }
      let title = info.title;
      let file_url = `[Download Link](${info.url})`
      let description = `***Title: ${title} ***\n${file_url}\n***Video Requested By: [${mention}]***`
      ctx.reply(description,{ reply_to_message_id: message_id , parse_mode: 'Markdown'})
    })
  }
  catch (error) {
    console.error(error);
    ctx.reply("***Error occurred, Make sure your sent a correct URL***",{ reply_to_message_id: message_id , parse_mode: 'Markdown'})
  }
  })


//Search on Youtube
bot.command('syt', (ctx) => {
    let message_id = ctx.message.message_id;
    let args =  ctx.update.message.text.split(' ')
    syt = args.slice(1).join(' ');
    let ytSearch = `[Search Results for ${syt}](https://www.youtube.com/results?search_query=${syt})`
      ctx.reply(ytSearch,{ reply_to_message_id: message_id , parse_mode: 'Markdown'})
  })

//Bot start
bot.launch()
