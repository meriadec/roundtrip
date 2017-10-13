const fetch = require('node-fetch')

const STATIONS = [
  { name: 'Gare', id: 42014 },
  { name: 'Rue de la Gare', id: 42002 },
  { name: 'Carrefour', id: 42004 },
  { name: 'Quais', id: 42001 },
]

exports.getStationsInfos = function getStationsInfos() {
  return Promise.all(STATIONS.map(getStationInfo))
}

async function getStationInfo(station) {
  const r = await fetch(
    `https://api.jcdecaux.com/vls/v1/stations/${station.id}?contract=Paris&apiKey=${process.env
      .VELIB_API_KEY}`,
  )
  const json = await r.json()
  return {
    ...station,
    bikes: json.available_bikes,
    stands: json.available_bike_stands,
  }
}
