---
title: "Comment bloquer un utilisateur externe spécifique dans Teams"
meta_title: ""
description: ""
date: 2025-02-07T10:00:00-05:00
image: "/images/blog/teams/tuto/teams_roadmap_411138_block_user_thumbnail.png"
categories: ["Teams", "Tutoriel"]
author: "Maxime Hiez"
tags: ["Blocage", "PowerShell", "Roadmap"]
draft: false
---
---

##### Introduction
Microsoft a récemment introduit une nouvelle fonctionnalité pour les administrateurs de Teams, permettant de bloquer des utilisateurs externes spécifiques. Cette mise à jour vise à renforcer la sécurité et à protéger les membres internes de l'organisation contre les communications indésirables ou malveillantes.

---

##### Fonctionnalité de blocage d'utilisateur
Traditionnellement, les administrateurs pouvaient utiliser l'API de suppression (*removeallaccessforuser API*) pour empêcher un utilisateur malveillant de renvoyer des messages à la même victime. Cependant, cette méthode n'était pas toujours suffisante pour bloquer complètement l'utilisateur. Désormais, une nouvelle API de blocage d'utilisateur permet aux administrateurs de bloquer un utilisateur externe de manière plus efficace, empêchant toute reprise de contact.

![image](/images/blog/teams/tuto/teams_roadmap_411138_block_user_001.png)

---

##### Mise en œuvre de la fonctionnalité
Pour utiliser cette nouvelle capacité, un administrateur Microsoft Teams doit se connecter dans le Microsoft Teams Admin Center en ouvrant son navigateur web sur https://admin.teams.microsoft.com, et dans le menu de gauche, cliquer sur *<u>Users</u>*, puis sur *<u>External access</u>*. Par défaut, la fonctionnalité *Block specific users from communicating wih people in my organization* est désactivée.

![image](/images/blog/teams/tuto/teams_roadmap_411138_block_user_002.png)

En activant l'interrupteur, l'option *Block a user* apparait, et il devient alors possible de rajouter manuellement les adresses Teams à bloquer.

![image](/images/blog/teams/tuto/teams_roadmap_411138_block_user_003.png)

---

##### Configuration en mode PowerShell
Vous pouvez aussi vous y configurer la fonctionnalité de blocage via les commandes PowerShell suivantes :
```powershell
Set-CsTeamsExternalAccessConfiguration -Identity Global -BlockExternalAccessUserAccess $true
Set-CsTeamsExternalAccessConfiguration -Identity Global -BlockedUsers @("user1@domain.com", "user2@domain.com")
```

---

##### Conclusion
Cette nouvelle fonctionnalité de blocage d'utilisateur dans Microsoft Teams offre une couche supplémentaire de sécurité, permettant aux administrateurs de mieux protéger leur organisation contre les communications externes indésirables. En rendant cette mesure plus accessible et efficace, Microsoft continue d'améliorer la sécurité et la gestion des communications au sein de Teams.

---

##### Sources
[Microsoft Learn - Set-CsTeamsExternalAccessConfiguration](https://learn.microsoft.com/fr-ca/powershell/module/teams/set-csteamsexternalaccessconfiguration?view=teams-ps)

[Microsoft 365 Roadmap - ID 411138](https://www.microsoft.com/fr-ca/microsoft-365/roadmap?filters=Microsoft%20Teams&searchterms=411138)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.