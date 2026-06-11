const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { value, currency, content_name, event_source_url } = await req.json()
    const accessToken = Deno.env.get('META_CAPI_TOKEN')
    const PIXEL_ID = '1406182547457498'

    const eventData = {
      data: [
        {
          event_name: 'Purchase',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url,
          custom_data: {
            value,
            currency,
            content_name,
            content_type: 'product',
          },
        },
      ],
    }

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      }
    )

    const result = await response.json()

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
