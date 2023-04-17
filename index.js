// Importeer express uit de node_modules map
import express from 'express'
import fetch from 'node-fetch'


// Maak een nieuwe express app aan
const app = express()
// zet url in een constante
const url = 'https://whois.fdnd.nl/api/v1/member/nandita-badeloe'

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', (request, response) => {

  //fetch data en stuur het object mee tijdens renderen
  fetchJson(url).then((data) => {
   response.render('index', data)

  })

})

// Stel het poortnummer in waar express op gaat luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// haal data op van de api en stuur message mee
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}

