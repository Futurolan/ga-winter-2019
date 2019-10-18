const express = require('express')
const next = require('next')
const path = require('path')
const sm = require('sitemap')
const request = require('request')

const config = require('./config/config')
const menu = require('./config/menu')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const flatMenu = []
for (const index in menu) {
  const item = menu[index]
  flatMenu.push(item)
  if (item.children !== undefined) {
    for (const childIndex in item.children) {
      const child = item.children[childIndex]
      flatMenu.push(child)
    }
  }
}

const sitemap = sm.createSitemap({
  hostname: process.env.BASE_URL,
  cacheTime: 600000,
  urls: [
    { url: '/', changefreq: 'weekly', priority: 1 }
  ]
})

for (const index in flatMenu) {
  const item = flatMenu[index]
  if (item.type === 'page' && item.link !== undefined && item.id !== undefined && item.title !== undefined) {
    sitemap.add({ url: item.link, changefreq: 'monthly', priority: 0.9 })
  }
  if (item.type === 'config' && config[item.id] !== undefined && config[item.id].link !== undefined) {
    sitemap.add({ url: `/${config[item.id].link}`, changefreq: 'monthly', priority: 0.9 })
  }
}

if (config.contact.active) sitemap.add({ url: '/contacts', changefreq: 'yearly', priority: 0.5 })
if (config.press.active) sitemap.add({ url: '/espace-presse', changefreq: 'yearly', priority: 0.5 })
if (config.legals.active) sitemap.add({ url: '/mentions-legales', changefreq: 'yearly', priority: 0.5 })
if (config.recruit.active) sitemap.add({ url: '/recrutement', changefreq: 'yearly', priority: 0.5 })

const newsQuery = `
news:nodeQuery(filter:{
  groups: [{
    conjunction: OR,
    conditions: [
      {field: "field_news_editions", operator: IS_NULL},
      {field: "field_news_editions", value: ["${process.env.EDITION_ID}"]}
    ]
  }],
  conditions:[
    {field:"type",value:["news"],operator:EQUAL},
    {field:"status",value:["1"]}
  ]}, limit: 9999) {
  entities {
    id: entityId
    url: entityUrl {
      path
    }
  }
}
`

const tournamentsQuery = `
tournaments:nodeQuery(filter:{
  conditions:[
    {field: "field_tournament_edition", value: ["${process.env.EDITION_ID}"]}
    {field:"type",value:["tournament"],operator:EQUAL},
    {field:"status",value:["1"]}
  ]}, limit: 9999) {
  entities {
    id: entityId
    url: entityUrl {
      path
    }
  }
}
`

app.prepare()
  .then(() => {
    const server = express()

    server.get('/robots.txt', (req, res) => {
      res.type('text/plain')
      res.send(`User-agent: *\nDisallow:\nSitemap: ${process.env.BASE_URL}/sitemap.xml`)
    })

    server.get('/sitemap.xml', function (req, res) {
      request(`${process.env.BACKEND_LOCAL_API_URL}/graphql?query=${encodeURI(`{${newsQuery}${tournamentsQuery}}`)}`, function (error, response, body) {
        const result = JSON.parse(body)
        if (error) {
          console.error(error)
          next()
        } else {
          for (const index in result.data.news.entities) {
            const entity = result.data.news.entities[index]
            if (entity.url && entity.url.path) {
              sitemap.add({
                url: `${entity.url.path}`,
                changefreq: 'weekly',
                priority: 0.7
              })
            }
          }
          for (const index in result.data.tournaments.entities) {
            const entity = result.data.tournaments.entities[index]
            if (entity.url && entity.url.path) {
              sitemap.add({
                url: `${entity.url.path}`,
                changefreq: 'weekly',
                priority: 0.8
              })
            }
          }
          sitemap.toXML(function (err, xml) {
            if (err) {
              return res.status(500).end()
            }
            res.header('Content-Type', 'application/xml')
            res.send(xml)
          })
        }
      })
    })

    // Legacy to remove after a moment
    server.get('/tournament/:nid', (req, res) => {
      return app.render(req, res, '/tournois-single', { nid: req.params.nid })
    })

    server.get('/tournois/:nid', (req, res) => {
      if (!isNaN(req.params.nid)) {
        return app.render(req, res, '/tournois-single', { nid: req.params.nid })
      } else {
        request(`${process.env.BACKEND_LOCAL_API_URL}/graphql?query=${encodeURI(`{${tournamentsQuery}}`)}`, function (error, response, body) {
          if (error) {
            console.error(error)
            next()
          } else {
            const result = JSON.parse(body)
            for (const index in result.data.tournaments.entities) {
              const entity = result.data.tournaments.entities[index]
              if (req.url.indexOf(entity.url.path) === 0) {
                return app.render(req, res, `/tournois-single`, { nid: entity.id })
              }
            }
            return handle(req, res)
          }
        })
      }
    })

    server.get('/news/:nid', (req, res) => {
      if (!isNaN(req.params.nid)) {
        return app.render(req, res, '/news-single', { nid: req.params.nid })
      } else {
        request(`${process.env.BACKEND_LOCAL_API_URL}/graphql?query=${encodeURI(`{${newsQuery}}`)}`, function (error, response, body) {
          if (error) {
            console.error(error)
            next()
          } else {
            const result = JSON.parse(body)
            for (const index in result.data.news.entities) {
              const entity = result.data.news.entities[index]
              if (req.url.indexOf(entity.url.path) === 0) {
                return app.render(req, res, `/news-single`, { nid: entity.id })
              }
            }
            return handle(req, res)
          }
        })
      }
    })

    server.get('*', (req, res) => {
      for (const index in flatMenu) {
        const item = flatMenu[index]
        if (item.type === 'page' && item.id !== undefined && item.link !== undefined && req.url.indexOf(item.link) === 0) {
          return app.render(req, res, `/page`, { nid: item.id })
        }
        if (item.type === 'config' && item.id !== undefined && config[item.id] !== undefined && config[item.id].link !== undefined && req.url.indexOf(config[item.id].link) === 0) {
          return app.render(req, res, `/${item.id}`)
        }
      }

      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
