const express = require('express')
const cors = require("cors")
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())

/**
 * resolve_links : Resolves the links and return an object with theyre content
 * @param {links} : array of links
 * @returns : object of the content of the links
 */
async function resolve_links(links) {
    let stylesheets = {};

    for (const link of links) {
        const res = await fetch(link)
        stylesheets[link] = await res.text();
    }
    return stylesheets
}

/**
 * POST /styles : Resolves CSS stylesheets and return theyre content
 */
app.post('/styles', async (req, res) => {
    const style_links = req.body.links;
    
    res.send(await resolve_links(style_links));
})

/**
 * Server listen on port 5000
 */
app.listen(5000, () => {
    console.log('server is listening on port 5000')
})

module.exports = resolve_links;