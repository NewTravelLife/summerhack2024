import acceptIcon from '../../assets/accept.png'

const Place = ({ places_data }) => {
	if (!Array.isArray(places_data)) {
		return <h1>Загрузка мест...</h1>
	}

	return (
		<div>
			<div className='attractions-container'>
				<h2>TODO</h2>

				{places_data.map((place_data, index) => (
					<div key={index} className='place_data-item'>
						<div className='attractions-content'>
							<h3>{place_data.name}</h3>
							<p>{place_data.rating} ★</p>
							<p>
								<strong>Адрес:</strong> {place_data.address}
							</p>
						</div>
						<div className='button-container'>
							<a href='#' className='action-button'>
								<img src={acceptIcon} alt='Accept' className='button-icon' />
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Place
