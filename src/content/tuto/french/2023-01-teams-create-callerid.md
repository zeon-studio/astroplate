---
title: "Créer une règle de Caller ID dans Teams"
meta_title: ""
description: ""
date: 2023-01-04T10:00:00-05:00
image: "/images/tuto/teams/thumbnails/teams_callerid.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["Microsoft", "Microsoft 365", "Téléphonie", "Caller ID", "Direct Routing", "Calling Plan", "Operator Connect", "PowerShell"]
draft: false
---
---

##### Définition
Une règle de Caller ID Teams permet de déterminer comment le nom et le numéro de téléphone de l’appelant sont affichés lors des appels effectués via Microsoft Teams. Cette stratégie permet aux administrateurs de gérer et de personnaliser les informations d’identification de l’appelant pour les utilisateurs au sein d’une organisation.

<u>Caractéristiques clés de la règle de Caller ID :</u>
- ID de ligne d’appel (CLID) : Le numéro de téléphone qui est présenté comme l’identité de l’appelant.
- Nom de l’appelant (CNAM) : Le nom qui apparaît avec le numéro de téléphone, tel que le nom de l’entreprise, le nom d’un utilisateur, ou "Anonyme".

---

##### Prérequis
**<u>Licences nécessaires</u>**
- *Teams Phone Standard* (inclus dans la licence Microsoft 365 E5).
- *Microsoft Teams Phone Resource Account*.

**<u>Téléphonie Microsoft Teams activée</u>**
- Au moins un utilisateur configuré et activé pour la téléphonie Microsoft Teams (Calling plans / Operator Connect / Direct Routing).
- Un compte de ressource avec une licence et le numéro de téléphone que vous souhaitez afficher lorsque l'utilisateur effectue un appel.

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

##### Étape 2 : Créer une règle de Caller ID
Dans le menu de gauche, cliquez sur *<u>Voice</u>* puis sur *<u>Caller ID policies</u>*.

Pour créer une nouvelle règle, cliquez sur le bouton *<u>+ Add</u>*.

Entrez le nom et la description (optionnel) de la règle.

Entrez le nom que vous souhaitez faire afficher (CNAM) lors des appels.

Choisissez de remplacer le numéro d'affichage par celui du compte de ressource.

![image](/images/teams/teams_callerid-001.png)

Vous pouvez aussi créer la règle via les commandes PowerShell suivantes :
```powershell
$RA_AA = (Get-CsOnlineApplicationInstance -Identity "AA_DEMO@domain.com").ObjectId

New-CsCallingLineIdentity -Identity "DEMO - 514 456-7890" -CallingIDSubstitute Resource -EnableUserOverride $false -ResourceAccount $RA_AA -CompanyName "Contoso"
```

---

##### Étape 3 : Attribuer une stratégie d’identification de l’appelant aux utilisateurs
Une fois que votre règle est créée, il vous reste à l’attribuer aux utilisateurs qui nécessitent d'afficher ce numéro lors de leurs appels.

Dans le menu de gauche, cliquez sur *<u>Users</u>* puis le sous-menu *<u>Manage users</u>*. La liste de tous les utilisateurs de votre organisation va s'afficher. Sélectionnez celui ou ceux à qui vous souhaitez activer la règle.

Cliquez sur l'onglet *<u>Policies</u>* et éditer l'attribut *<u>Caller ID policy</u>* pour appliquer la règle de votre choix.

![image](/images/teams/teams_callerid-002.png)

Vous pouvez aussi assigner la règle via la commande PowerShell suivante :
```powershell
Grant-CsCallingLineIdentity -Identity "Maxime@domain.com" -PolicyName "DEMO - 514 456-7890"
```

---

##### Conclusion
Vous savez maintenant comment configurer une règle de Caller ID pour votre téléphonie Teams.

---

##### Sources
[Microsoft Learn - New-CsCallingLineIdentity](https://learn.microsoft.com/fr-ca/powershell/module/teams/new-cscallinglineidentity?view=teams-ps)

[Microsoft Learn - Grant-CsCallingLineIdentity](https://learn.microsoft.com/fr-ca/powershell/module/teams/grant-cscallinglineidentity?view=teams-ps)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.