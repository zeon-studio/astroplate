---
title: "Créer un compte de ressource dans Teams"
meta_title: ""
description: ""
date: 2023-01-04T09:00:00-05:00
image: "/images/tuto/image-placeholder.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["Microsoft", "Microsoft 365", "Teams", "Téléphonie", "Compte de ressource", "Direct Routing", "Calling Plan", "Operator Connect", "PowerShell"]
draft: false
---
---

##### Définition
Un compte de ressource dans Microsoft Teams est utilisé pour des fonctionnalités spécifiques comme les files d'attente d'appels ou les répondeurs automatiques.

---

##### Prérequis
**<u>Licences nécessaires</u>**
- *Microsoft Teams Phone Resource Account*.

**<u>Rôle d’administrateur</u>**
- Un compte avec le rôle *Administrateur Global* ou *Administrateur Teams* pour accéder au Microsoft Teams Admin Center.

---

##### Étape 1 : Se connecter au Microsoft Teams Admin Center
Connectez vous au Microsoft Teams Admin Center en ouvrant votre navigateur web sur https://admin.teams.microsoft.com.

Vous pouvez aussi vous y connecter via la commande PowerShell suivante :
```powershell
Connect-MicrosoftTeams
```

---

##### Étape 2 : Créer un compte de ressource
Dans le menu de gauche, cliquez sur *<u>Voice</u>* puis sur *<u>Resource accounts</u>*.

Pour créer un nouveau compte, cliquez sur le bouton *<u>+ Add</u>*.

Entrez le nom d'affichage, le nom d'utilisateur et le domaine à utiliser.

Choisissez le type de compte de ressource (Auto attendant ou Call queue).

![image](/images/teams/teams_ressacc-001.png)

Vous pouvez aussi créer le compte via l'une des commandes PowerShell suivantes :
```powershell
New-CsOnlineApplicationInstance -UserPrincipalName "AA_DEMO@domain.com" -ApplicationId "ce933385-9390-45d1-9512-c8d228074e07" -DisplayName "AA_DEMO"

New-CsOnlineApplicationInstance -UserPrincipalName "CQ_DEMO@domain.com" -ApplicationId "11cd3e2e-fccb-42ad-ad00-878b93575e07" -DisplayName "CQ_DEMO"
```

---

##### Conclusion
Vous savez maintenant comment créer un compte de ressource pour vos menus de téléphonie Teams.

---

##### Sources
[Microsoft Learn - New-CsOnlineApplicationInstance](https://learn.microsoft.com/fr-ca/powershell/module/teams/new-csonlineapplicationinstance?view=teams-ps)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.