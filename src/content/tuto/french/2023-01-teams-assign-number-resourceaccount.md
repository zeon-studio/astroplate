---
title: "Assigner un numéro à un compte de ressource dans Teams"
meta_title: ""
description: ""
date: 2023-01-04T09:30:00-05:00
image: "/images/tuto/image-placeholder.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["Microsoft", "Microsoft 365", "Téléphonie", "Compte de ressource", "Numéro", "SDA", "Direct Routing", "Calling Plan", "Operator Connect", "PowerShell"]
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

##### Étape 2 : Assigner un numéro au compte de ressource
Dans le menu de gauche, cliquez sur *<u>Voice</u>*, puis sur *<u>Resource accounts</u>*.

Pour assigner un numéro de téléphone au compte de ressource, sélectionnez le et cliquez sur le bouton *<u>Assign/unassign</u>*.

Choisissez le type de numéro (Calling plans / Operator Connect / Direct Routing).

![image](/images/teams/teams_ressacc-002.png)

Vous pouvez aussi l'assigner via la commande PowerShell suivante :
```powershell
Set-CsPhoneNumberAssignment -Identity "AA_DEMO@domain.com" -PhoneNumber +15144567890 -PhoneNumberType DirectRouting
```

---

##### Conclusion
Vous savez maintenant comment assigner un numéo à un compte de ressource pour vos menus de téléphonie Teams.

---

##### Sources
[Microsoft Learn - Set-CsPhoneNumberAssignment](https://learn.microsoft.com/fr-ca/powershell/module/teams/set-csphonenumberassignment?view=teams-ps)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.