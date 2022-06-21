
async function fetchData () {
  const response = await fetch('data/photographers.json')
  return await response.json()
}
