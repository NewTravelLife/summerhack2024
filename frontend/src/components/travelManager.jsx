let coords = {};
let current_travel_id;

const getCords = (lat, lng, cookie, setCookie) => {

    const sendCoordsToBackend = async () => {
        try {
            const response = await fetch('http://localhost/api/travel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coords),
            });

            // Проверка на наличие данных в ответе
            const text = await response.text();
            if (text) {
                const data = JSON.parse(text);
                current_travel_id = data.travel_id;
                if (current_travel_id) {
                    window.location.href = `/travel/${current_travel_id}`;
                    let travelIds = cookie.travel_id ? cookie.travel_id.toString().split(',') : [];
                    travelIds.push(current_travel_id.toString());
                    setCookie('travel_id', travelIds.join(','), {path: '/'});
                }
            } else {
                console.error('Empty response');
            }
        } catch (error) {
            console.error('Error sending coordinates:', error);
        }
    };

    if (!coords.start_lat && !coords.start_lon) {
        coords.start_lat = lat;
        coords.start_lon = lng;
    } else {
        coords.end_lat = lat;
        coords.end_lon = lng;

        sendCoordsToBackend();

        coords = {};
    }
};


export default getCords;