---
title: "Comment inventorier les numéros Direct Routing dans Teams"
meta_title: ""
description: ""
date: 2025-01-26T10:00:00-05:00
image: "/images/blog/teams/tuto/teams_direct_routing_inventory_thumbnail.png"
categories: ["Teams", "Tutoriel"]
author: "Maxime Hiez"
tags: ["Téléphonie", "Direct Routing", "Inventaire", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft Teams continue d'évoluer pour offrir des solutions de communication et de collaboration toujours plus efficaces. Pour simplifier la vie des administrateurs, Microsoft a annoncé la possibilité de maintenir un inventaire des numéros de type *Direct Routing* directement depuis le Microsoft Teams Admin Center. Cette fonctionnalité était déjà parfaitement fonctionnelle pour les numéros. Cette nouvelle mise à jour permet aux administrateur de garder un inventaire dans Teams plutôt que dans un fichier externe ou une liste SharePoint.

---

##### Inventaire des numéros de téléphone
La fonctionnalité n'est, <u>pour le moment</u> disponible qu'en version pré-publique en PowerShell.

Vous pouvez importer un numéro unique via la commande PowerShell suivante :
```powershell
New-CsOnlineDirectRoutingTelephoneNumberUploadOrder -TelephoneNumber "+15144567890"
```

Vous pouvez importer plusieurs numéros (consécutifs ou non) via la commande PowerShell suivante :
```powershell
New-CsOnlineDirectRoutingTelephoneNumberUploadOrder -TelephoneNumber "+15144567890,+15144567892,+15144567894"
```

Vous pouvez importer une plage de numéros via la commande PowerShell suivante :
```powershell
New-CsOnlineDirectRoutingTelephoneNumberUploadOrder -StartingNumber "+15144567890" -EndingNumber "+15144567899"
```

Vous pouvez également importer un fichier csv contenant vos numéros via les commandes PowerShell suivantes :
```powershell
$ListDID = [System.IO.File]::ReadAllBytes("C:\Users\maxime\AllMyPhoneNumbers.csv")
New-CsOnlineDirectRoutingTelephoneNumberUploadOrder -FileContent $ListDID
```

<br/>

Vous pouvez libérer un numéro via la commande PowerShell suivante :
```powershell
New-CsOnlineTelephoneNumberReleaseOrder -TelephoneNumber "+15144567890"
```

Le principe est le même pour plusieurs numéros ou une plage de numéros.

---

##### Résultat
Le numéro est visible avec les autres numéros de type *Calling Plan* et *Operator Connect*.

![image](/images/blog/teams/tuto/teams_direct_routing_inventory_001.png)

---

##### Conclusion
La gestion des numéros de téléphone de type *Direct Routing* dans le Microsoft Teams Admin Center offre aux entreprises une solution flexible et intégrée pour leurs besoins d'inventaire. Les administrateurs peuvent facilement configurer et gérer ces numéros, améliorant ainsi l'efficacité et la productivité de leur organisation.

---

##### Sources
[Microsoft Learn - New-CsOnlineDirectRoutingTelephoneNumberUploadOrder](https://learn.microsoft.com/fr-ca/powershell/module/teams/new-csonlinedirectroutingtelephonenumberuploadorder?view=teams-ps)

[Microsoft Learn - New-CsOnlineTelephoneNumberReleaseOrder](https://learn.microsoft.com/fr-ca/powershell/module/teams/new-csonlinetelephonenumberreleaseorder?view=teams-ps)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.