---
title: "La fin des modules PowerShell AzureAD et MSOnline"
meta_title: ""
description: ""
date: 2025-01-30T10:00:00-05:00
image: "/images/blog/entra/entra_new_powershell_module_ga_thumbnail.png"
categories: ["Entra"]
author: "Maxime Hiez"
tags: ["AzureAD", "MSOnline", "Microsoft Graph", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft a récemment annoncé la disponibilité générale du module PowerShell de Microsoft Entra. Ce module offre aux administrateurs et aux professionnels de l'informatique une nouvelle façon de gérer et d'automatiser les tâches liées à Microsoft Entra ID (anciennement Azure Active Directory). Cette mise à jour marque une étape importante dans la simplification de la gestion des identités et des accès dans les environnements cloud.

---

###### Chronologie
En 2021, Microsoft a annoncé que les prochains développements sur PowerShell porteraient sur le *Microsoft Graph PowerShell SDK*.

|   Module   | Fin du support |        Suppression         |
| :--------: | :------------: | :------------------------: |
| AzureAD    | 30 Mars 2025   | Après le 1er Juillet 2025  |
| MSOnline   | 30 Mars 2025   | Début Avril à fin Mai 2025 |

---

##### Avantages de la migration vers Microsoft Graph 
Microsoft Graph représente la meilleure surface API de sa catégorie. Ceci offre un point de terminaison unifié unique pour accéder aux services Microsoft Entra et aux services Microsoft 365 tels que Microsoft Teams et Microsoft Intune. Toutes les nouvelles fonctionnalités seront disponibles uniquement via Microsoft Graph. Microsoft Graph est également plus sécurisé et résilient qu'Azure AD Graph.

Microsoft Graph possède toutes les fonctionnalités disponibles dans Azure AD Graph et de nouvelles API telles que la protection de l'identité et les méthodes d'authentification. Ses bibliothèques clientes offrent une prise en charge intégrée de fonctionnalités telles que la gestion des nouvelles tentatives, les redirections sécurisées, l'authentification transparente et la compression de la charge utile.

---

##### Comment savoir si ces modules sont toujours utilisés ?
Les journaux de connexion Microsoft Entra peuvent être utilisés pour identifier les connexions à partir de MSOnline et AzureAD PowerShell. Ils fournissent des informations sur le client et l'utilisateur de la session PowerShell.

1. Connectez vous au Microsoft Entra Admin Center en ouvrant votre navigateur web sur https://entra.microsoft.com.
2. Dans le menu de gauche, cliquez sur *<u>Identity</u>*, puis sur *<u>Monitoring & health</u>* et sur *<u>Sign-in logs</u>*.
3. Sélectionnez l’onglet *<u>User sign-ins (Interactive)</u>*, puis cliquez sur *<u>Add filters</u>* et choisir l'attribut *Application*.
4. Saisissez *Azure Active Directory PowerShell* pour appliquer le filtre.

![image](/images/blog/entra/entra_new_powershell_module_ga_001.png)

Les événements de connexion *MSOnline PowerShell* et *AzureAD PowerShell* apparaissent avec le nom de l'application *Azure Active Directory PowerShell*.

---

##### Comment passer à la nouvelle version ?
Vous pouvez installer le nouveau module Entra (version */ v1.0* de l'API) via la commande PowerShell suivante :
```powershell
Install-Module -Name Microsoft.Entra -Repository PSGallery -Scope CurrentUser -Force -AllowClobber 
```

Ou installer la version bêta du module via la commande PowerShell suivante :
```powershell
Install-Module -Name Microsoft.Entra.Beta -Repository PSGallery -Scope CurrentUser -Force -AllowClobber 
```

Une fois installé, vous pouvez vous connecter via la commande PowerShell suivante :
```powershell
Connect-Entra -Scopes 'User.Read.All'
```

Si vous avez des scripts existants qui se lancent avec le module AzureAD, vous pouvez continuez à les utiliser avec une modification minime en ajoutant la commande *Enable-EntraAzureADAlias*.
```powershell
Import-Module -Name Microsoft.Entra.Users
Connect-Entra #Replaces Connect-AzureAD for auth
Enable-EntraAzureADAlias #Enable aliasing
Get-AzureADUser -Top 1
```

---

##### Conclusion
La disponibilité générale du module PowerShell de Microsoft Entra offre aux administrateurs une nouvelle façon puissante et flexible de gérer les identités et les accès dans les environnements cloud. En automatisant les tâches courantes et en centralisant la gestion, ce module permet de gagner en efficacité et en sécurité.

---

##### Sources
[Microsoft - Techcommunity](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/microsoft-entra-powershell-module-now-generally-available/4365718)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.