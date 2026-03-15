export async function onRequest(context) {
    const { DB } = context.env;
    const { searchParams } = new URL(context.request.url);
    const year = searchParams.get('year');

    let query = "SELECT * FROM tirages ";
    let params = [];

    if (year) {
        query += "WHERE date_tirage LIKE ? ";
        params.push(`${year}%`);
    }

    // On met LIMIT 2000 pour couvrir de 2009 à 2026 sans problème
    query += "ORDER BY date_tirage DESC LIMIT 2000"; 

    try {
        const { results } = await DB.prepare(query).bind(...params).all();
        return new Response(JSON.stringify(results), {
            headers: { 
                "Content-Type": "application/json",
                "Cache-Control": "no-cache" // Force le navigateur à ne pas garder de vieux résultats
            }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
