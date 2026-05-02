exports.handler = async (event) => {
  const key = process.env.JSONBIN_KEY
  const bin = process.env.JSONBIN_BIN
  const url = `https://api.jsonbin.io/v3/b/${bin}`

  if (event.httpMethod === 'GET') {
    const res = await fetch(`${url}/latest`, {
      headers: { 'X-Master-Key': key },
    })
    const json = await res.json()
    const record = json.record ?? {}
    return {
      statusCode: 200,
      body: JSON.stringify({ pessoas: record.pessoas ?? [], gastos: record.gastos ?? [] }),
    }
  }

  if (event.httpMethod === 'PUT') {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': key },
      body: event.body,
    })
    return { statusCode: 200, body: await res.text() }
  }

  return { statusCode: 405, body: 'Method not allowed' }
}
