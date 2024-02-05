async function queryIpFunction(){

    const fetchIp = await fetch('http://ip-api.com/json/')
    const data = await fetchIp.json()
    return data
}

module.exports = queryIpFunction