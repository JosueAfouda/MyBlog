export const source = `---
title: Optimiser vos requêtes SQL sur BigQuery
date: 2024-04-22
excerpt: Réduisez vos coûts de 50% grâce à ces techniques simples de partitionnement et de clustering. Retour d'expérience sur un dataset de 10TB.
tags: [SQL, BigQuery, Data Engineering]
coverImage: https://picsum.photos/id/20/800/400
---

# BigQuery : Payez pour ce que vous lisez

L'erreur numéro 1 des juniors sur BigQuery ? Le \`SELECT * \`.

Sur une base de données colonnaire comme BigQuery, c'est un crime financier.

## 1. Partitionnement

Toujours, je dis bien **toujours**, partitionner vos tables par date (ou par une colonne d'ingestion).

\`\`\`sql
CREATE TABLE my_dataset.orders
PARTITION BY DATE(order_date)
AS SELECT * FROM raw.orders;
\`\`\`

## 2. Clustering

Le partitionnement découpe votre table en "dossiers". Le clustering trie les données à l'intérieur de ces dossiers.

Utile si vous filtrez souvent par \`user_id\` ou \`country\`.

## 3. Évitez les SELECT *

\`\`\`sql
-- ❌ MAUVAIS : Scanne toutes les colonnes
SELECT * FROM my_dataset.orders LIMIT 10;

-- ✅ BON : Ne scanne que les colonnes nécessaires
SELECT order_id, amount FROM my_dataset.orders LIMIT 10;
\`\`\`

## Cas concret client

J'ai récemment audité un projet où une simple requête de dashboard coûtait 5$ par exécution. Après optimisation du modèle de données : **0.05$**.
`;