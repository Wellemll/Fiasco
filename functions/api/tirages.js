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

    // On ajoute LIMIT 500 pour être sûr de récupérer plusieurs années d'un coup
    query += "ORDER BY date_tirage DESC LIMIT 500"; 

    try {
        const { results } = await DB.prepare(query).bind(...params).all();
        return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
