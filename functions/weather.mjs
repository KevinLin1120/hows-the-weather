// To handle the API request securely

import fetch from 'node-fetch';
exports.handler = async (event, constext) => {
    const location = event.queryStringParameters.location;
    const apiKey = process.env.VISUAL_CROSSING_API_KEY;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: data.error })
            };
        }

        console.log(`Response data: \n${JSON.stringify(data)}`);
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch whether data' })
        }
    }
}