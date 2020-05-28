const request=require('request')
require('any-promise/register/q')
const rp = require('request-promise-any')

const news=async (search)=>{
    const url="https://newsapi.org/v2/everything?q=\""+search+"\"&apiKey=0b7e1f4b3a464101931a302f395fb230"
    const newsData= await rp({url, json:true})
    return newsData
}

module.exports=news