export default async function queryIpFunction(){

    const fetchIp = await fetch('https://api.ipify.org/?format=json')
    const data = await fetchIp.json()
    return data
}