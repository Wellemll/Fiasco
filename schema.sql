DROP TABLE IF EXISTS tirages;
CREATE TABLE tirages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_tirage TEXT NOT NULL,
    n1 INTEGER, n2 INTEGER, n3 INTEGER, n4 INTEGER, n5 INTEGER, n6 INTEGER, n7 INTEGER,
    boni INTEGER
);

-- On insère un tirage de test pour vérifier que ça marche
INSERT INTO tirages (date_tirage, n1, n2, n3, n4, n5, n6, n7, boni) 
VALUES ('2026-03-10', 4, 12, 23, 31, 44, 48, 50, 5);