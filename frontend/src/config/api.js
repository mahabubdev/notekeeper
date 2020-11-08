const currentENV = process.env.NODE_ENV


if ( currentENV === 'development' ) {
    var baseURL = 'http://localhost:3083/api'
} else {
    var baseURL = window.location.protocol+ '//' + window.location.host + '/api'
}

export {
    baseURL
}