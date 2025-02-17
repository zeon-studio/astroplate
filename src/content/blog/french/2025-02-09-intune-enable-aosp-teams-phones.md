---
title: "Comment migrer vos appareils Android Teams vers AOSP"
meta_title: ""
description: ""
date: 2025-02-09T10:00:00-05:00
image: "/images/blog/intune/tuto/intune_enable_aosp_teams_phones_thumbnail.png"
categories: ["Intune", "Tutoriel"]
author: "Maxime Hiez"
tags: ["Téléphones Teams", "Teams Rooms", "MTRoA", "Panneaux Teams", "AOSP", "Android"]
draft: false
---
---

##### Introduction
Je vous parlais en Novembre dernier de l'approche de la migration vers *AOSP* (*Android Open Source Project*) pour les appareils Microsoft Teams basés sur Android, tels que les téléphones, les salles de conférence et les panneaux. Je vous avais promis un tuto, alors le voici.

Voir l'article de Novembre 2024 [ICI](https://maxime.hiez.ca/blog/2024-11-23-intune-aosp-teams-phones).

---

##### Prérequis
**<u>Appareils Teams</u>**
- Au moins un appareil Android certifié Teams.

**<u>Rôle d’administrateur</u>**
- Un compte avec le rôle *Administrateur Global* ou *Administrateur Intune* pour accéder au Microsoft Intune Admin Center.

---

##### Étape 1 : Se connecter au Microsoft Intune Admin Center
Connectez vous au Microsoft Intune Admin Center en ouvrant votre navigateur web sur https://intune.microsoft.com.

---

##### Étape 2 : Créer un profil d'inscription AOSP
Dans le menu de gauche, cliquez sur *<u>Devices</u>*, puis sur *<u>Enrollment</u>* et *<u>Corporate-owned, user-associated devices</u>*.

Créez un profil en activant seulement l'option *For Microsoft Teams devices (preview)* et en gardant le token par défaut.

![image](/images/blog/intune/tuto/intune_enable_aosp_teams_phones_001.png)

---

##### Étape 3 : Créer une politique de restriction
Dans le menu de gauche, cliquez sur *<u>Devices</u>*, puis sur *<u>Configuration</u>*.

Créez une politique de restriction d'appareil en activant seulement l'option *Block screen capture*.

![image](/images/blog/intune/tuto/intune_enable_aosp_teams_phones_002.png)

<u>Note :</u> Seule cette option est disponible pour le moment, mais peut être que d'autres arriveront plus tard.

---

##### Étape 4 : Créer une politique de conformité
Dans le menu de gauche, cliquez sur *<u>Devices</u>*, puis sur *<u>Compliance</u>*.

Créez une politique de conformité en activant seulement les options *Rooted devices* et *Require encryption of data storage on device*. Optionnellement, vous pourriez définir *Minimum OS version*.

![image](/images/blog/intune/tuto/intune_enable_aosp_teams_phones_003.png)

<u>Note :</u> Seules ces options sont disponibles pour le moment, mais peut être que d'autres arriveront plus tard.

---

##### Étape 5 : Créer les règles d'accès conditionnelles
Je ne couvrirai pas ces configurations dans cet article, mais vous devriez mettre en place des règles d'accès conditionnelles pour n'autoriser des connexions que depuis des appareils taggués conformes.

---

##### Conclusion
Vous savez maintenant comment préparer la migration de appareils Microsoft Teams basés sur Android vers AOSP.

---

##### Sources
[Microsoft Learn - Guide de migration AOSP](https://learn.microsoft.com/fr-ca/microsoftteams/rooms/android-migration-guide)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.