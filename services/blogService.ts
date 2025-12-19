import { BlogPost, ConsultantProfile } from '../types';

export const PROFILE: ConsultantProfile = {
  name: "Alexandre Data",
  role: "Consultant Data & AI | Freelance",
  bio: "J'aide les entreprises à transformer leurs données en levier de croissance. Expert Python, Modern Data Stack & IA. Pédagogue dans l'âme, je partage ici mes retours d'expérience terrain.",
  avatarUrl: "https://picsum.photos/id/64/200/200",
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    youtube: "https://youtube.com"
  }
};

const POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "python-vs-r-2024",
    title: "Python vs R en 2024 : Le choix pragmatique",
    excerpt: "Le débat éternel continue. Mais en tant que consultant, la réponse dépend surtout de votre infrastructure et de vos objectifs de production.",
    date: "2024-05-15",
    readTime: "6 min read",
    tags: ["Python", "R", "Career"],
    coverImage: "https://picsum.photos/id/180/800/400",
    content: `
# Python vs R : La fin du débat ?

Cela fait maintenant plus de 10 ans que je navigue entre ces deux écosystèmes. Si j'ai commencé avec R pour sa puissance statistique inégalée, Python est aujourd'hui le roi incontesté de la **mise en production**.

## Pourquoi Python a gagné (en entreprise)

La raison est simple : **l'intégration**.

Un Data Scientist ne travaille plus seul dans son coin. Il doit s'intégrer aux équipes Backend, DevOps et Cloud.

\`\`\`python
# Exemple d'API simple avec FastAPI (Python)
from fastapi import FastAPI

app = FastAPI()

@app.get("/predict")
def predict(value: float):
    return {"prediction": value * 1.2}
\`\`\`

Ce genre de code est immédiatement compréhensible par un développeur Backend.

## Quand utiliser R ?

R reste supérieur pour :
1. L'analyse exploratoire rapide (EDA)
2. La visualisation complexe (ggplot2 reste imbattable)
3. Les statistiques académiques pointues

> "L'outil ne fait pas l'artisan, mais un bon artisan choisit le bon outil pour la bonne tâche."

## Conclusion

Si vous visez un poste de **Machine Learning Engineer**, foncez sur Python. Si vous êtes **Statisticien** ou chercheur, R est votre allié.
    `
  },
  {
    id: "2",
    slug: "optimiser-sql-bigquery",
    title: "Optimiser vos requêtes SQL sur BigQuery : Guide de survie",
    excerpt: "Réduisez vos coûts de 50% grâce à ces techniques simples de partitionnement et de clustering. Retour d'expérience sur un dataset de 10TB.",
    date: "2024-04-22",
    readTime: "8 min read",
    tags: ["SQL", "BigQuery", "Data Engineering"],
    coverImage: "https://picsum.photos/id/20/800/400",
    content: `
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
    `
  },
  {
    id: "3",
    slug: "devenir-freelance-data",
    title: "De Salarié à Consultant Data Indépendant",
    excerpt: "Mon parcours, mes erreurs et mes conseils pour se lancer en freelance dans la Data. Ce n'est pas qu'une question de technique.",
    date: "2024-03-10",
    readTime: "12 min read",
    tags: ["Freelance", "Business", "Career"],
    coverImage: "https://picsum.photos/id/3/800/400",
    content: `
# Le saut dans le vide

Quitter un CDI confortable pour devenir freelance fait peur. Surtout quand on gère des infrastructures critiques.

## La technique ne suffit pas

Être un expert Spark ou TensorFlow est une chose. Savoir vendre cette expertise en est une autre.

Vos clients n'achètent pas du "Code Python". Ils achètent :
* Une réduction de risques
* Un gain de temps
* Une automatisation de revenus

## Créer son offre

Ne dites pas "Je suis Data Scientist".
Dites "J'aide les E-commerçants à prédire leurs stocks pour éviter la rupture".

> Positionnez-vous sur la valeur business, pas sur la stack technique.

## Taux Journalier Moyen (TJM)

Ne vous bradez pas. Un senior Data Engineer à Paris oscille entre 600€ et 900€ / jour.
    `
  }
];

export const getPosts = async (): Promise<BlogPost[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(POSTS), 300);
  });
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(POSTS.find(p => p.slug === slug)), 300);
  });
};

export const getRelatedPosts = async (currentId: string): Promise<BlogPost[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(POSTS.filter(p => p.id !== currentId).slice(0, 2)), 300);
    });
}