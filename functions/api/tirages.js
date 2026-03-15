export async function onRequest(context) {
    const { DB } = context.env;

    // Vérification de sécurité
    if (!DB) {
        return new Response(JSON.stringify({ error: "La liaison DB est manquante dans les réglages Cloudflare." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        const { results } = await DB.prepare("SELECT * FROM tirages ORDER BY date_tirage DESC LIMIT 10").all();
        return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
