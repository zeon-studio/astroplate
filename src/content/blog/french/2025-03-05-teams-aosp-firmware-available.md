---
title: "Comment mettre à jour vos appareils Android Teams en AOSP"
meta_title: ""
description: ""
date: 2025-03-05T10:00:00-05:00
image: "/images/blog/teams/tuto/teams_aosp_firmware_available_thumbnail.png"
categories: ["Teams", "Tutoriel"]
author: "Maxime Hiez"
tags: ["Téléphones Teams", "Teams Rooms", "MTRoA", "Panneaux Teams", "AOSP", "Android"]
draft: false
---
---

##### Introduction
J'avais publié, en Février dernier, un article sur comment préparer la migration de vos appareils Microsoft Teams basés sur Android vers *AOSP* (*Android Open Source Project*). Le firmware vient de sortir pour les appareils Poly, alors voici comment faire votre mise à jour.

Voir l'article de Février 2025 [ICI](https://maxime.hiez.ca/blog/2025-02-09-intune-enable-aosp-teams-phones).

---

##### Prérequis
**<u>Appareils Teams</u>**
- Au moins un appareil Android certifié Teams.

**<u>Rôle d’administrateur</u>**
- Un compte avec le rôle *Administrateur Global* ou *Administrateur Teams* pour accéder au Microsoft Teams Admin Center.
- Un compte avec le rôle *Administrateur Global* ou *Administrateur Intune* pour accéder au Microsoft Intune Admin Center.

**<u>AOSP activé</u>**
- Avoir fait vos configurations AOSP dans Intune

---

##### Étape 1 : Se connecter au Microsoft Teams Admin Center
Connectez vous au Microsoft Teams Admin Center en ouvrant votre navigateur web sur https://admin.teams.microsoft.com.

---

##### Étape 2 : Mettre à jour le téléphone
Dans le menu de gauche, cliquez sur *<u>Teams devices</u>*, puis sur *<u>Phones</u>*.

Sélectionnez le ou les appareils que vous souhaitez mettre à jour et cliquez sur *<u>Update</u>*.

Un nouveau firmware est disponible et taggué *AOSP*. Sélectionnez le et cliquez sur *<u>Update</u>*.

![image](/images/blog/teams/tuto/teams_aosp_firmware_available_001.png)

Cette étape va prendre de longues minutes. Le téléphone va redémarrer, sortir d'Intune et s'y réinscrire.

---

##### Étape 3 : Validation de la bonne installation
On peut voir dans le téléphone que le *Company Portal* a disparu et a été remplacé par *Authenticator* et *Microsoft Intune* dans les applications du téléphone.

![image](/images/blog/teams/tuto/teams_aosp_firmware_available_002.png)

---

##### Étape 4 : Se connecter au Microsoft Intune Admin Center
Connectez vous au Microsoft Intune Admin Center en ouvrant votre navigateur web sur https://intune.microsoft.com.

---

##### Étape 5 : Validation de la bonne réinscription dans Intune
Dans le menu de gauche, cliquez sur *<u>Devices</u>*, puis sur *<u>All devices</u>*. Le téléphone mis à jour doit avoir un OS *Android AOSP*.

![image](/images/blog/teams/tuto/teams_aosp_firmware_available_003.png)

<u>Note :</u> Si vous y allez très rapidement après la mise à jour, vous allez voir votre téléphone en double puisque son entrée *Device Administrator* sera encore là, mais elle est supprimée automatiquement après quelques minutes.
<br/><br/>

Dans le menu de gauche, cliquez sur *<u>Devices</u>*, puis sur *<u>Enrollment</u>* et *<u>Corporate-owned, user-associated devices</u>*. Le nombre d'appareils doit correspondre à votre mise à jour.

![image](/images/blog/teams/tuto/teams_aosp_firmware_available_004.png)

---

##### Conclusion
Vous savez maintenant comment mettre à jour vos appareils Microsoft Teams basés sur Android vers AOSP.

---

##### Sources
[Microsoft Learn - Guide de migration AOSP](https://learn.microsoft.com/fr-ca/microsoftteams/rooms/android-migration-guide)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.