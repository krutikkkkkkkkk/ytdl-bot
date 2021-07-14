const { Telegraf } = require('telegraf')
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);
const youtubedl = require('youtube-dl-exec');

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
    let args =  ctx.update.message.text.split(' ');
    let url = args[1];
    let mention = `@${ctx.message.from.username}`;
    var dq = "2160";
    let allowed_qualities = ['144','240','360','480','720','1080','1440','2160'];
    if(!url.match(/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*(?:[&\/\#].*)?$/)) return ctx.reply("Enter a valid youtube url",{ reply_to_message_id: message_id , parse_mode: 'Markdown'})
    if(args[2] && allowed_qualities.includes(args[2])){
      var dq = `${args[2]}`
      ctx.reply("Processing your video with the chosen quality",{ reply_to_message_id: message_id , parse_mode: 'Markdown'})
    }else if(!args[2]){
      ctx.reply("Processing your video with max quality",{ reply_to_message_id: message_id , parse_mode: 'Markdown'})
    }else if(args[2] && !allowed_qualities.includes(args[2])){
      ctx.reply("Invalid quality settings chosen , video will be downloaded with highest possible quality",{ reply_to_message_id: message_id , parse_mode: 'Markdown'})
    }
    if(ctx.message.from.username == undefined){
       mention = ctx.message.from.first_name
    }
    try{
      youtubedl(url, {
        format: `bestvideo[height<=${dq}]+bestaudio/best[height<=${dq}]`,
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
      }).then(output => ctx.reply(`***Title: ${output.title} ***\n[Download Link](${output.requested_formats[0].url})\n***Video Requested By: [${mention}]***`,{ reply_to_message_id: message_id , parse_mode: 'Markdown'}))
      }catch (error) {
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
