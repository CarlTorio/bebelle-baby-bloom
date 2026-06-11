const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PANCAKE_PRODUCT_ID = 'a2f0e12a-d9f9-4d0b-9bd0-c3a29c97472f'
const PANCAKE_VARIATION_ID = '43016adf-acbf-4f3e-b914-157cebd41554'

/** Fuzzy-match a name from a list of Pancake geo entries */
function findMatch(entries: { id: string; name: string; name_en: string }[], target: string) {
  if (!target || !entries.length) return null
  const t = target.trim().toLowerCase()
  // Exact match first
  let match = entries.find(
    (e) => e.name.toLowerCase() === t || e.name_en.toLowerCase() === t
  )
  if (match) return match
  // Contains match
  match = entries.find(
    (e) => e.name.toLowerCase().includes(t) || t.includes(e.name.toLowerCase()) ||
           e.name_en.toLowerCase().includes(t) || t.includes(e.name_en.toLowerCase())
  )
  return match || null
}

async function fetchGeo(endpoint: string, params: Record<string, string>, apiKey: string) {
  const url = new URL(`https://pos.pages.fm/api/v1/geo/${endpoint}`)
  url.searchParams.set('api_key', apiKey)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }
  const res = await fetch(url.toString())
  if (!res.ok) return []
  const json = await res.json()
  return json.data || []
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const PANCAKE_API_KEY = Deno.env.get('PANCAKE_API_KEY')
    const PANCAKE_SHOP_ID = Deno.env.get('PANCAKE_SHOP_ID')

    if (!PANCAKE_API_KEY || !PANCAKE_SHOP_ID) {
      throw new Error('Missing Pancake API credentials')
    }

    const order = await req.json()

    // --- Resolve address IDs from Pancake geo API ---
    let provinceId = ''
    let districtId = ''
    let communeId = ''

    try {
      // 1. Get Philippine provinces
      const provinces = await fetchGeo('provinces', { country_code: '63' }, PANCAKE_API_KEY)
      const provMatch = findMatch(provinces, order.province || '')
      if (provMatch) {
        provinceId = provMatch.id
        console.log(`Matched province: "${order.province}" → ${provMatch.name} (${provMatch.id})`)

        // 2. Get districts for this province
        const districts = await fetchGeo('districts', { province_id: provMatch.id }, PANCAKE_API_KEY)
        const distMatch = findMatch(districts, order.city || '')
        if (distMatch) {
          districtId = distMatch.id
          console.log(`Matched district: "${order.city}" → ${distMatch.name} (${distMatch.id})`)

          // 3. Get communes for this district
          const communes = await fetchGeo('communes', { district_id: distMatch.id }, PANCAKE_API_KEY)
          const commMatch = findMatch(communes, order.barangay || '')
          if (commMatch) {
            communeId = commMatch.id
            console.log(`Matched commune: "${order.barangay}" → ${commMatch.name} (${commMatch.id})`)
          } else {
            console.warn(`No commune match for: "${order.barangay}"`)
          }
        } else {
          console.warn(`No district match for: "${order.city}"`)
        }
      } else {
        console.warn(`No province match for: "${order.province}"`)
      }
    } catch (geoError) {
      console.error('Geo lookup error (continuing with names only):', geoError)
    }

    const pancakeBody = {
      bill_full_name: order.fullName || '',
      bill_phone_number: order.phone || '',
      is_free_shipping: true,
      received_at_shop: false,
      items: [{
        product_id: PANCAKE_PRODUCT_ID,
        variation_id: PANCAKE_VARIATION_ID,
        quantity: order.qty || 1,
        discount_each_product: 0,
        is_bonus_product: false,
        is_discount_percent: false,
        is_wholesale: false,
        one_time_product: false,
      }],
      shipping_address: {
        full_name: order.fullName || '',
        phone_number: order.phone || '',
        address: order.address || '',
        province_id: provinceId,
        district_id: districtId,
        commune_id: communeId,
        province_name: order.province || '',
        district_name: order.city || '',
        commune_name: order.barangay || '',
        country_code: '63',
      },
      note: order.note || `${order.packLabel} - ₱${order.price} | Province: ${order.province || 'N/A'} | City: ${order.city || 'N/A'} | Barangay: ${order.barangay || 'N/A'} | Address: ${order.address || 'N/A'} | Landmark: ${order.landmark || 'N/A'}`,
    }

    const url = `https://pos.pages.fm/api/v1/shops/${PANCAKE_SHOP_ID}/orders?api_key=${PANCAKE_API_KEY}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pancakeBody),
    })

    const result = await response.json()

    return new Response(JSON.stringify({ success: response.ok, data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: response.ok ? 200 : 400,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
