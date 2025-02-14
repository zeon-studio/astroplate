---
title: "Nouvelles optimisations de Teams pour VDI dans Citrix"
meta_title: ""
description: ""
date: 2025-02-11T10:00:00-05:00
image: "/images/blog/teams/teams_optimization_vdi_citrix_ga_thumbnail.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["Citrix", "VDI"]
draft: false
---
---

##### Introduction
Microsoft a récemment annoncé une avancée majeure dans l'optimisation de Microsoft Teams pour les environnements de bureau virtuel (VDI) dans Citrix. Cette nouvelle architecture, basée sur le moteur multimédia *SlimCore*, est désormais disponible à 100% et marque une étape importante pour les deux entreprises. Voici un aperçu des principales nouveautés et de ce que cela signifie pour les utilisateurs et les administrateurs.

---

##### Composants clés de la nouvelle optimisation
La nouvelle optimisation repose sur quatre composants principaux qui fonctionnent ensemble pour offrir une expérience utilisateur améliorée :
- Canal virtuel : La solution utilise trois canaux virtuels personnalisés, qu'il est crucial d'autoriser dans Citrix Studio. Cette configuration est unique mais essentielle pour le bon fonctionnement.
- Plugin : Ce petit fichier DLL (220 KB) est installé dans le même dossier que Citrix Workspace App (CWA) et est responsable de l'établissement du canal virtuel côté client et du téléchargement du nouveau moteur multimédia, SlimCore. Le plugin peut être déployé de plusieurs façons, y compris via l'installateur CWA, le Global App Config Service, le Plugin Download Manager (idéal pour les appareils personnels) et même via Intune/SCCM.
- Nouvelle version de Teams : Assurez-vous d'utiliser la dernière version de Teams (24295.605.3225.8804) et la version client (24110115722). Ceci est crucial non seulement pour le bon fonctionnement de la fonctionnalité, mais aussi pour les futures mises à jour du moteur multimédia SlimCore.
- SlimCore : Le cœur de la solution, SlimCore, est essentiellement le même moteur multimédia utilisé par le client Teams natif pour Windows, extrait sous forme de package MSIX (~50 MB) et maintenu à jour par le plugin, sans intervention de l'utilisateur ou de l'administrateur.

![image](/images/blog/teams/teams_optimization_vdi_citrix_ga_001.png)

---

##### Avantages de la nouvelle optimisation
- Performance améliorée : La nouvelle architecture offre des performances accrues, avec une consommation de ressources réduite sur le point de terminaison, des temps de configuration des appels plus rapides, des résolutions plus élevées et de nouveaux codecs.
- Mises à jour automatiques : Grâce à une architecture découplée de l'environnement VDI, les mises à jour de SlimCore sont automatiques et alignées avec les versions de Teams, sans nécessiter de mises à jour de l'infrastructure VDI.
- Fiabilité accrue : La solution est conçue pour être stable et fiable, avec des composants rétrocompatibles et compatibles avec les versions futures de Teams et SlimCore.

---

##### Comment déployer la nouvelle optimisation
- **Configurer les canaux virtuels dans Citrix Studio**
<br/>
Accédez à Citrix Studio et ajoutez les trois canaux virtuels personnalisés à la liste des canaux autorisés.
<br/><br/>

- **Déployer le plugin**
<br/>
Utilisez l'une des méthodes de déploiement disponibles pour installer le plugin sur les points de terminaison. Cela peut être fait via l'installateur CWA, le Global App Config Service, le Plugin Download Manager ou Intune/SCCM.
<br/><br/>

- **Mettre à jour Teams**
<br/>
Assurez-vous que la version de Teams utilisée est la plus récente (24295.605.3225.8804) et que la version client est à jour (24110115722).
<br/><br/>

- **Vérifier l'installation de SlimCore**
<br/>
Le plugin téléchargera et installera automatiquement SlimCore, garantissant que la version correcte est utilisée en fonction des besoins de Teams.

---

##### Conclusion
La nouvelle optimisation de Microsoft Teams pour les environnements VDI dans Citrix représente une avancée significative en termes de performance, de fiabilité et de facilité de gestion. En suivant les étapes de déploiement, les administrateurs peuvent garantir une expérience utilisateur améliorée et préparer leurs infrastructures pour les futures innovations.

---

##### Sources
[Microsoft - Techcommunity](https://techcommunity.microsoft.com/blog/microsoftteamsblog/new-teams-optimization-for-vdi-now-generally-available-in-citrix-environment/4357078)

[Microsoft Learn - VDI pour Teams](https://learn.microsoft.com/fr-ca/microsoftteams/vdi-2)

[Citrix - Optimisation SlimCore](https://docs.citrix.com/fr-fr/citrix-virtual-apps-desktops/multimedia/opt-ms-teams-new/ms-slimcore-optimization.html)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.