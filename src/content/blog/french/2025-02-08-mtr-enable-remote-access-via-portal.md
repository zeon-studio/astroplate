---
title: "Comment activer l'accès distant au MTR via Teams Rooms Pro"
meta_title: ""
description: ""
date: 2025-02-08T10:00:00-05:00
image: "/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_thumbnail.png"
categories: ["MTR"]
author: "Maxime Hiez"
tags: ["Teams Rooms", "MTRoW", "Microsoft Teams Rooms Pro Management"]
draft: false
---
---

##### Définition
Le portail *Microsoft Teams Room Pro Management* est une solution puissante conçue pour aider les administrateurs à surveiller et gérer efficacement les salles de réunion équipées de Microsoft Teams. Ce portail offre une vue d'ensemble de la santé des salles de réunion et facilite l'utilisation des outils de surveillance existants. Voici comment configurer l'accès à distance aux MTR Teams sur Windows et un aperçu de ses fonctionnalités.

---

##### Fonctionnalité d'accès distant pour les administrateurs
La fonctionnalité d'accès distant au MTR permet aux administrateurs de :
- Dépanner à distance : Les administrateurs peuvent résoudre les problèmes de configuration matérielle et logicielle des consoles Teams Room sans avoir besoin d'être physiquement présents.
- Sécurité et contrôle : L'accès distant est sécurisé et suit les politiques de confidentialité de Microsoft. Les administrateurs peuvent créer des rôles personnalisés avec des permissions spécifiques pour limiter ce que chaque utilisateur peut voir et modifier.
- Activation de l'accès distant : Par défaut, l'accès distant n'est pas activé. Les administrateurs doivent l'activer en utilisant des permissions basées sur les rôles et en fournissant une adresse e-mail pour l'audit.

---

##### Prérequis
**<u>Licences nécessaires</u>**
- *Teams Rooms Pro*.

**<u>Une salle Teams</u>**
- Un MTR Windows déployé.

**<u>Rôle d’administrateur</u>**
- Un compte avec le rôle *Administrateur Global* pour accéder au Microsoft Teams Rooms Pro Management.
- Un compte avec le rôle *Administrateur Global* ou *Administrateur d'utilisateurs* pour accéder au Microsoft Entra Admin Center.

**<u>Autoriser le trafic</u>**
- agent.rooms.microsoft.com
- mmrstgnoamiot.azure-devices.net
- mmrstgnoamstor.blob.core.windows.net
- mmrprodapaciot.azure-devices.net
- mmrprodapacstor.blob.core.windows.net
- mmrprodemeaiot.azure-devices.net
- mmrprodemeastor.blob.core.windows.net
- mmrprodnoamiot.azure-devices.net
- mmrprodnoamstor.blob.core.windows.net
- mmrprodnoampubsub.webpubsub.azure.com
- mmrprodemeapubsub.webpubsub.azure.com
- mmrprodapacpubsub.webpubsub.azure.com

---

##### Étape 1 : Se connecter au Microsoft Entra Admin Center
Connectez vous au Microsoft Entra Admin Center en ouvrant votre navigateur web sur https://entra.microsoft.com.

---

##### Étape 2 : Créer un groupe de sécurité
Dans le menu de gauche, cliquez sur *<u>Identity</u>*, puis sur *<u>Groups</u>* et sur *<u>All groups</u>*.

Cliquez sur *<u>New group</u>* pour créer un nouveau groupe de sécurité qui va contenir les administrateurs qui auront les accès aux MTR.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_001.png)

---

##### Étape 3 : Se connecter au portail Microsoft Teams Rooms Pro Management
Connectez vous au portail Microsoft Teams Rooms Pro Management en ouvrant votre navigateur web sur https://portal.rooms.microsoft.com.

---

##### Étape 4 : Activer le service d'accès distant
Dans le menu de gauche, cliquez sur *<u>Settings</u>*, puis sur *<u>General</u>*.

Cochez la case *Allow Teams Rooms Pro Management Remote access* et entrez l'adresse de contact.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_002.png)

---

##### Étape 5 : Créer le rôle
Dans le menu de gauche, cliquez sur *<u>Settings</u>*, puis sur *<u>Roles</u>*.

Cliquez sur *<u>Create role</u>* et donnez lui un nom et description.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_003.png)

Cochez la case *Modify* dans *<u>Remote Access</u>*.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_004.png)

Assignez le groupe de sécurité créé en étape 2.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_005.png)

Assignez la ou les salles à la règle.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_006.png)

---

##### Étape 6 : Accéder à la salle
Dans le menu de gauche, cliquez sur *<u>Rooms</u>*, puis sur la salle sur laquelle vous souhaitez prendre l'accès.

Cliquez sur *<u>Start session</u>*.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_007.png)

Après quelques instants de chargement, la salle devrait être visible.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_008.png)

---

##### Conclusion
Le portail Microsoft Teams Rooms Pro Management est un outil essentiel pour les administrateurs, offrant une surveillance détaillée, une gestion des incidents et des capacités d'accès distant. En suivant les étapes pour obtenir et configurer le portail, les administrateurs peuvent assurer une gestion efficace et sécurisée des salles de réunion équipées de Microsoft Teams.<br/><br/>
Vous savez maintenant comment activer l'accès distant au MTR via le portail Microsoft Teams Rooms Pro Management.

---

##### Sources
[Microsoft Learn - Portail Teams Room Pro Management](https://learn.microsoft.com/fr-ca/microsoftteams/rooms/remotely-access-teams-rooms)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.