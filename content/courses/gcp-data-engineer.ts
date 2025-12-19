import { Course } from '../../types';

export const courseData: Course = {
  id: "c1",
  slug: "google-cloud-platform-data-engineer",
  title: "Google Cloud Platform pour Data Engineers : Projet pratique",
  subtitle: "ELT avec BigQuery, GCS, Airflow, Python et SQL – Projet réel sur GCP, de l'ingestion des données au Machine Learning.",
  author: "Alexandre Data",
  rating: 4.8,
  numRatings: 124,
  studentsCount: 3500,
  duration: "6.5 heures",
  level: "Intermediate",
  thumbnail: "https://picsum.photos/id/4/800/450", // Placeholder tech image
  price: 0,
  currency: "EUR",
  updatedAt: "2024-05-01",
  topics: ["Google Cloud Platform", "BigQuery", "Data Engineering", "Python", "SQL", "Airflow"],
  requirements: [
    "Connaissances de base en SQL",
    "Notions de Python (fonctions, variables)",
    "Un compte Google Cloud (Essai gratuit possible)"
  ],
  whatYouWillLearn: [
    "Construire un pipeline ELT complet sur GCP",
    "Maîtriser BigQuery pour l'analyse de données massive",
    "Orchestrer des tâches avec Cloud Composer (Airflow)",
    "Optimiser les coûts de stockage et de calcul",
    "Visualiser les données avec Looker Studio"
  ],
  description: `
# Description du cours

Ce cours est conçu pour les **Data Analysts** et **Data Scientists** qui souhaitent passer à l'étape supérieure et maîtriser l'ingénierie des données sur le cloud.

Contrairement aux cours théoriques, nous allons construire un **projet de bout en bout**.

## Ce que nous allons bâtir

Nous allons créer un pipeline qui récupère des données brutes d'une API publique, les stocke dans **Google Cloud Storage**, les charge dans **BigQuery**, et les transforme pour créer des tableaux de bord analytiques.

## À qui s'adresse ce cours ?

* Développeurs Python curieux du Cloud
* Data Analysts voulant devenir Data Engineers
* Étudiants cherchant un projet concret pour leur portfolio
  `,
  sections: [
    {
      id: "s1",
      title: "Introduction – Lancement du Cours",
      sessions: [
        {
          id: "l1",
          title: "Présentation du cours et des objectifs",
          type: "video",
          duration: "04:30",
          videoUrl: "https://www.youtube.com/embed/l9IggsQEVtQ", // Embed format
          isFreePreview: true
        },
        {
          id: "l2",
          title: "Scénario d’un Consultant : Le besoin client",
          type: "video",
          duration: "08:15",
          videoUrl: "https://www.youtube.com/embed/yYHo7mCGF7U",
          isFreePreview: true
        },
        {
          id: "l3",
          title: "Présentation de BigQuery : Architecture",
          type: "video",
          duration: "12:00",
          videoUrl: "https://www.youtube.com/embed/7BztFeTHUAk",
          isFreePreview: false
        }
      ]
    },
    {
      id: "s2",
      title: "Configuration de l'environnement GCP",
      sessions: [
        {
          id: "l4",
          title: "Création du compte et Billing Alert",
          type: "video",
          duration: "05:00",
          isFreePreview: false
        },
        {
          id: "l5",
          title: "IAM & Sécurité : Les bases",
          type: "text",
          duration: "10 min",
          content: "Dans cette session texte, nous allons voir comment configurer les rôles IAM minimums pour notre projet...",
          isFreePreview: false
        }
      ]
    }
  ]
};