export const handler = async (event, _context) => {
  const params = {}

  new URLSearchParams(event.body).forEach((value, key) => {
    // Extract the model name from the key
    const model = key.match(/^(.*?)\[/)[1]
    if (!params[model]) {
      params[model] = {}
    }

    // Extract the attribute(s) from the key, arbitrarily deep
    const attribute = key.match(/\[(.*?)\]/)[1]
    console.info(key, attribute)

    params[model][attribute] = value
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ params }),
  }
}
