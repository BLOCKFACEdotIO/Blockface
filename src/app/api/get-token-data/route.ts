export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chainId = searchParams.get("chainId");
  const tokenAddress = searchParams.get("tokenAddress");

  if (!chainId || !tokenAddress) {
    return new Response(
      JSON.stringify({ error: "Missing chainId or tokenAddress" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const apiUrl = `https://api.dexscreener.com/token-pairs/v1/${chainId}/${tokenAddress}`;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch data from Dexscreener" }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
