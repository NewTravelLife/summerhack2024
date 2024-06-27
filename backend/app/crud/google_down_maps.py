import googlemaps


def find_nearest(api_key, latitude, longitude, my_type, radius=1000):
    gmaps = googlemaps.Client(key=api_key)

    places_result = gmaps.places_nearby(location=(latitude, longitude), radius=radius, type=my_type)
    places = []
    if 'results' in places_result:
        for place in places_result['results']:
            place_info = {
                'name': place.get('name'),
                'address': place.get('vicinity'),
                'rating': place.get('rating'),
                'user_ratings_total': place.get('user_ratings_total'),
                'location': place.get('geometry', {}).get('location')
            }
            places.append(place_info)

    return places


api_key = 'AIzaSyAaxy-BAdWOr9ERDtBsggTgNjFsLvYhlzQ'  # Replace with your actual API key
latitude = 37.7749  # Example latitude
longitude = -122.4194  # Example longitude
my_type = ('restaurant', 'cafe')
# types: ('restaurant', 'cafe'), 'museum', 'tourist_attraction', 'lodging'

nearest = find_nearest(api_key, latitude, longitude, my_type)
for place in nearest:
    print(place)
