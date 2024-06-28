import { useState, useEffect, useCallback } from 'react'

import '../../Attractions.css' // Импортируйте файл стилей, если он у вас есть
import Place from './Place'

const PlacesModule = ({ travel_id }) => {
	const [travelPlaces, setTravelPlaces] = useState({
		places: {
			attraction: [],
		},
	})

	const fetchTravelPlaces = useCallback(() => {
		fetch('/api/travel/route/' + travel_id)
			.then(response => response.json())
			.then(data => {
				setTravelPlaces(data['places'])
			})
	}, [travel_id])

	useEffect(() => {
		fetchTravelPlaces()
	}, [fetchTravelPlaces])

	return (
		<div>
			{Object.entries(travelPlaces).map(([key, value]) => (
				<Place
					travel_id={travel_id}
					key={key}
					category={key}
					places_data={travelPlaces[key]}
				/>
			))}
			<button onClick={fetchTravelPlaces}>Обновить места</button>
		</div>
	)
}

export default PlacesModule
