const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const BASE = 'https://pos.pages.fm/api/v1'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const API_KEY = Deno.env.get('PANCAKE_API_KEY')
    const SHOP_ID = Deno.env.get('PANCAKE_SHOP_ID')
    if (!API_KEY || !SHOP_ID) throw new Error('Missing Pancake credentials')

    const body = await req.json()
    const { action, payload } = body || {}

    const j = (data: unknown, status = 200) =>
      new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status,
      })

    const get = async (url: string) => {
      const r = await fetch(url)
      const data = await r.json().catch(() => ({}))
      return { ok: r.ok, status: r.status, data }
    }

    switch (action) {
      case 'getVariations': {
        const url = `${BASE}/shops/${SHOP_ID}/products/variations?api_key=${API_KEY}&page_size=100`
        const r = await get(url)
        return j(r.data, r.ok ? 200 : r.status)
      }
      case 'getProvinces': {
        const url = `${BASE}/geo/provinces?api_key=${API_KEY}&country_code=63`
        const r = await get(url)
        return j(r.data, r.ok ? 200 : r.status)
      }
      case 'getDistricts': {
        const pid = payload?.provinceId
        if (!pid) return j({ error: 'provinceId required' }, 400)
        const url = `${BASE}/geo/districts?api_key=${API_KEY}&province_id=${encodeURIComponent(pid)}`
        const r = await get(url)
        return j(r.data, r.ok ? 200 : r.status)
      }
      case 'getCommunes': {
        const did = payload?.districtId
        if (!did) return j({ error: 'districtId required' }, 400)
        const url = `${BASE}/geo/communes?api_key=${API_KEY}&district_id=${encodeURIComponent(did)}`
        const r = await get(url)
        return j(r.data, r.ok ? 200 : r.status)
      }
      case 'createOrder': {
        const url = `${BASE}/shops/${SHOP_ID}/orders?api_key=${API_KEY}`
        const orderBody = { ...payload, shop_id: Number(SHOP_ID) }
        const r = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderBody),
        })
        const data = await r.json().catch(() => ({}))
        return j({ success: r.ok, data }, r.ok ? 200 : r.status)
      }
      default:
        return j({ error: 'Unknown action' }, 400)
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})