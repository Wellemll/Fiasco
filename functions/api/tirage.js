export async function onRequest(context) {
    // On récupère la liaison vers la base de données définie dans wrangler.toml
    const { DB } = context.env.fiasco;

    // Requête pour avoir les 10 derniers tirages
    const { results } = await DB.prepare(
        "SELECT * FROM tirages ORDER BY date_tirage DESC LIMIT 10"
    ).all();

    return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json" }
    });
}
