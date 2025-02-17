---
title: "Comment activer LAPS sur le compte Admin du MTR via Intune"
meta_title: ""
description: ""
date: 2025-02-17T10:00:00-05:00
image: "/images/blog/intune/tuto/intune_enable_laps_thumbnail.png"
categories: ["Intune", "Tutoriel"]
author: "Maxime Hiez"
tags: ["Teams Rooms", "MTRoW", "LAPS", "Mot de passe", "Sécurité"]
draft: false
---
---

##### Définition
La solution *LAPS* (*Local Administrator Password Solution*) de Microsoft est un outil gratuit conçu pour améliorer la sécurité des mots de passe des comptes administrateurs locaux sur les postes de travail, les serveurs mais aussi les salles de conférence Microsoft Teams.

---

##### Comment fonctionne LAPS ?
LAPS génère automatiquement des mots de passe uniques et complexes pour les comptes administrateurs locaux de chaque machine gérée. Ces mots de passe sont ensuite stockés de manière sécurisée dans Intune. Voici les étapes clés de son fonctionnement :
- Génération de mots de passe : LAPS crée des mots de passe aléatoires pour les comptes administrateurs locaux selon des critères de complexité définis par l'administrateur.
- Stockage sécurisé : Les mots de passe générés sont stockés dans Intune.
- Accès contrôlé : Seuls les utilisateurs disposant des autorisations appropriées peuvent accéder aux mots de passe. Cela garantit qu'ils ne sont accessibles qu'aux administrateurs autorisés.
- Rotation automatique : LAPS permet de définir des politiques de rotation des mots de passe, assurant que les mots de passe sont régulièrement mis à jour pour renforcer la sécurité.

---

##### Pourquoi mettre en place LAPS ?
- Sécurité renforcée : Utiliser le même mot de passe administrateur local sur plusieurs machines est une pratique risquée. Si un attaquant parvient à obtenir ce mot de passe, il peut se déplacer latéralement dans le réseau. LAPS élimine ce risque en générant des mots de passe uniques pour chaque machine.
- Gestion simplifiée : LAPS automatise la gestion des mots de passe administrateurs locaux, réduisant ainsi la charge de travail des administrateurs système. Plus besoin de gérer manuellement les mots de passe ou de les stocker dans des fichiers non sécurisés.
- Conformité : De nombreuses réglementations de sécurité exigent la gestion sécurisée des mots de passe. LAPS aide les organisations à se conformer à ces exigences en assurant une gestion centralisée et sécurisée des mots de passe.

---

##### Prérequis
**<u>Licences nécessaires</u>**
- *Teams Rooms Pro* (ou *Basic*).

**<u>Une salle Teams</u>**
- Un MTR Windows déployé.

**<u>Rôle d’administrateur</u>**
- Un compte avec le rôle *Administrateur Global* ou *Administrateur d'utilisateurs* pour accéder au Microsoft Entra Admin Center.
- Un compte avec le rôle *Administrateur Global* ou *Administrateur Intune* pour accéder au Microsoft Intune Admin Center.

---

##### Étape 1 : Se connecter au Microsoft Entra Admin Center
Connectez vous au Microsoft Entra Admin Center en ouvrant votre navigateur web sur https://entra.microsoft.com.

---

##### Étape 2 : Activer LAPS
Dans le menu de gauche, cliquez sur *<u>Identity</u>*, puis sur *<u>Devices</u>* et sur *<u>All devices</u>*.

Cliquez sur *<u>Device settings</u>*, puis sur l'interrupteur *Enable Entra Local Administrator Password Solution (LAPS)* pour activer le service.

![image](/images/blog/intune/tuto/intune_enable_laps_001.png)

---

##### Étape 3 : Créer un groupe de sécurité
Dans le menu de gauche, cliquez sur *<u>Identity</u>*, puis sur *<u>Groups</u>* et sur *<u>All groups</u>*.

Cliquez sur *<u>New group</u>* pour créer un nouveau groupe de sécurité de type *Appareil dynamique*.

![image](/images/blog/intune/tuto/intune_enable_laps_002.png)

Cliquez sur *<u>Add dynamic query</u>*, puis ajouter *(device.displayName -startsWith "MTR-")* dans la règle. Ceci va permettre de rassembler tous les MTR dans le même groupe.

![image](/images/blog/intune/tuto/intune_enable_laps_003.png)

---

##### Étape 4 : Se connecter au Microsoft Intune Admin Center
Connectez vous au Microsoft Intune Admin Center en ouvrant votre navigateur web sur https://intune.microsoft.com.

---

##### Étape 5 : Créer une règle LAPS
Dans le menu de gauche, cliquez sur *<u>Endpoint security</u>*, puis sur *<u>Account protection</u>*.

Créez une règle pour la plateforme *Windows 10 and later* avec le profil *Local admin password solution (Windows LAPS)*.

![image](/images/blog/intune/tuto/intune_enable_laps_004.png)

Activez les options avec les valeurs de votre choix.<br />
On va vouloir cibler le compte *Admin* (dont le mot de passe par défaut est *sfb*) du MTR.

![image](/images/blog/intune/tuto/intune_enable_laps_005.png)

Assignez le groupe de sécurité créé en étape 3.

![image](/images/blog/intune/tuto/intune_enable_laps_006.png)

---

##### Étape 6 : Accéder au mot de passe
Dans le menu de gauche, cliquez sur *<u>Devices</u>*, puis recherchez le MTR que vous souhaitez vérifier.

![image](/images/blog/intune/tuto/intune_enable_laps_007.png)

Cliquez sur *<u>Show local administrator password</u>* pour révéler son mot de passe temporaire.

![image](/images/blog/intune/tuto/intune_enable_laps_008.png)

En dessous, on peut voir quand a été automatiquement changé le mot passe pour la dernière fois, et quand il sera de nouveau remplacé.

---

##### Étape 7 : Valider les logs
Depuis l'interface Windows (avec le nouveau mot de passe), allez dans le *Event Viewer* et ouvrez le répertoire *Applications and Services Logs / Microsoft / Windows / LAPS*. Les logs vont être visibles.

![image](/images/blog/intune/tuto/intune_enable_laps_009.png)

---

##### Allons plus loin
La procédure est ici présentée pour une salle de conférence Teams MTR dont le compte par défaut est *Admin* et vient avec le mot de passe *sfb*, mais elle fonctionne aussi pour les comptes administrateurs locaux des postes de travail de vos utilisateurs.

---

##### Conclusion
La mise en place de LAPS est une étape cruciale pour renforcer la sécurité des comptes administrateurs locaux dans une organisation. En automatisant la génération et la gestion des mots de passe, LAPS réduit les risques de sécurité et simplifie le travail des administrateurs système. En suivant les étapes décrites, vous pouvez implémenter LAPS efficacement et améliorer la sécurité de votre infrastructure.<br/><br/>
Vous savez maintenant comment activer LAPS sur le compte Admin du MTR.

---

##### Sources
[Microsoft Learn - Windows LAPS](https://learn.microsoft.com/fr-ca/windows-server/identity/laps/laps-overview)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.