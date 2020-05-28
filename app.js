require('dotenv').config()

const Snoowrap = require('snoowrap');
const { CommentStream } = require('snoostorm');
const news=require('./utils/news.js')

const client=new Snoowrap({
    userAgent:'reddit-news-bot',
    clientId:process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username:process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
})

// const client=new Snoowrap({
//     userAgent:'reddit-news-bot',
//     clientId:'P-gWcnAWzyR5hg',
//     clientSecret: 'HTKj-n6cB0AedD5LjHmbT5OShmc',
//     username:'reddit-news-bot',
//     password: 'Sparsh844'
// })

const summon=(msg)=>{
    return msg && msg.toLowerCase().includes('/u/reddit-news-bot')
}

const comments=new CommentStream(client,{
    subreddit:'testingground4bots',
    limit:100,
    pollTime:2000
})

comments.on('item',(comment)=>{
    if(!summon(comment.body))return

    const str=comment.body.replace('/u/reddit-news-bot','').trim()
    if(str===''){
        comment.reply('Write keywords or phrases, followed by my by username, to search for news articles')
    }else{
        news(str).then((data)=>{
            if(data.articles.length===0){
                comment.reply('No artcile found.')
            }else{
                comment.reply(`Title: ${data.articles[0].title}`)
            }  
        })
        console.log(str)
    }
   
})

news('dehradun').then((data)=>{

    console.log(data.articles[0].title)
})