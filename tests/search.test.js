const wiki = require('wikipedia')

async function search(){
    const page = await wiki.summary('Batman')
    console.log(page)
}
search()