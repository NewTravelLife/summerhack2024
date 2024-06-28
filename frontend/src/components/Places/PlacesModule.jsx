import { useState, useEffect } from 'react'

import '../../Attractions.css' // Импортируйте файл стилей, если он у вас есть
import Place from './Place'

const PlacesModule = ({ travel_id }) => {
	const [travelPlaces, setTravelPlaces] = useState({
		places: {
			attraction: [],
		},
	})
	useEffect(() => {
		fetch('http://localhost/api/travel/route/' + travel_id)
			.then(response => response.json())
			.then(data => {
				setTravelPlaces(data['places'])
			})
	})
	return (
		<div>
			{Object.entries(travelPlaces).map(([key, value]) => (
				<Place key={key} places_data={travelPlaces[key]}></Place>
			))}
		</div>
	)
}

export default PlacesModule
