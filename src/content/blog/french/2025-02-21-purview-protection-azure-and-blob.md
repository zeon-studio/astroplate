---
title: "Microsoft Purview pour Azure Data Lake et Blob Storage"
meta_title: ""
description: ""
date: 2025-02-21T10:00:00-05:00
image: "/images/blog/purview/purview_protection_azure_and_blob_thumbnail.png"
categories: ["Purview"]
author: "Maxime Hiez"
tags: ["IA", "Protection de données", "Gouvernance", "PII", "MIP"]
draft: false
---
---

##### Introduction
Microsoft a annoncé que les politiques de protection *Microsoft Purview* pour *Azure Data Lake* et *Blob Storage* sont désormais disponibles dans toutes les régions. Cette avancée permet aux organisations de renforcer la gouvernance des données et de protéger les informations sensibles de manière cohérente et automatisée.

---

##### Défis de la gouvernance des données
Les organisations font face à un défi critique : assurer une gouvernance des données cohérente et automatisée à travers des ensembles de données en expansion rapide. Avec la croissance de l'IA et la dépendance accrue aux volumes de données pour l'entraînement des modèles, les responsables des données et de la sécurité doivent prévenir l'exposition involontaire des données sensibles, telles que les informations personnelles identifiables (PII) et les informations de carte de crédit.

---

##### Solutions de stockage sécurisées
Azure Blob Storage et Azure Data Lake Storage (ADLS) offrent des solutions de stockage cloud évolutives, sécurisées et hautement disponibles. Bien que des solutions comme le contrôle d'accès basé sur les rôles (RBAC), le contrôle d'accès basé sur les attributs (ABAC) et les listes de contrôle d'accès (ACL) permettent de gérer l'accès aux données de manière sécurisée, elles opèrent souvent sur des métadonnées telles que les chemins de fichiers, les balises ou les noms de conteneurs. Cependant, il existe des scénarios où il est nécessaire de mettre en œuvre des contrôles d'accès automatiques basés sur la sensibilité du contenu lui-même.

---

##### Microsoft Information Protection (MIP)
C'est ici qu'interviennent les solutions intégrées comme *Microsoft Information Protection* (MIP). Les politiques de protection MIP permettent aux organisations de scanner et d'étiqueter les données en fonction du contenu stocké dans les blobs. Cela permet d'appliquer des contrôles d'accès directement liés au contenu des actifs de données à travers les comptes de stockage. En éliminant le besoin de scanner et d'étiqueter en interne, MIP simplifie la conformité et aide à appliquer une gouvernance des données cohérente en utilisant une solution centralisée.

![image](/images/blog/purview/purview_protection_azure_and_blob_001.png)

---

##### Avantages des politiques de protection Microsoft Purview
Les politiques de protection Microsoft Purview offrent plusieurs avantages clés :
- Automatisation : Les politiques de protection automatisent la classification et la protection des données sensibles, réduisant ainsi le risque d'erreur humaine.
- Cohérence : Elles assurent une application cohérente des politiques de sécurité à travers toutes les régions et tous les comptes de stockage.
- Efficacité : En centralisant la gestion des politiques de protection, les organisations peuvent réduire les coûts et améliorer l'efficacité opérationnelle.
- Conformité : Les politiques aident à respecter les réglementations en matière de protection des données, telles que le RGPD et le CCPA.

![image](/images/blog/purview/purview_protection_azure_and_blob_002.png)

---

##### Conclusion
La disponibilité des politiques de protection Microsoft Purview pour Azure Data Lake et Blob Storage dans toutes les régions représente une avancée significative pour la gouvernance des données et la protection des informations sensibles. Cette solution permet aux organisations de gérer leurs données de manière efficace, en réduisant le risque d'accès non autorisé et en maintenant la sécurité et la confiance des clients.

---

##### Sources
[Microsoft - Techcommunity](https://techcommunity.microsoft.com/blog/azurestorageblog/microsoft-purview-protection-policies-for-azure-data-lake--blob-storage-availabl/4382887)

[Microsoft Learn - Information Protection](https://learn.microsoft.com/fr-ca/purview/information-protection)

[Microsoft Learn - Protection Policy](https://learn.microsoft.com/fr-ca/purview/how-to-create-protection-policy)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.