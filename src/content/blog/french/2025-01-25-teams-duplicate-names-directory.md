---
title: "Comment gérer les doublons dans la recherche annuaire Teams"
meta_title: ""
description: ""
date: 2025-01-25T10:00:00-05:00
image: "/images/blog/teams/tuto/teams_duplicate_name_directory_thumbnail.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["Téléphonie", "Direct Routing", "Calling Plan", "Operator Connect", "Annuaire", "Dial by name", "Dial by extension", "Répondeur automatique", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft a récemment annoncé une optimisation importante pour la fonctionnalité de recherche par nom et extension dans ses répondeurs automatiques Teams. Vous avez sûrement déjà eu ce cas où 2 employés partagent le même nom et prénom, rendant la recherche dans l'annaire un peu complexe. Cette nouvelle mise à jour permet d'ajouter un nouvel attribut de recherche, donnant ainsi plus de détails à l'appelant.

---

##### Détails sur l'optimisation
Le nouvel attribut *UserNameExtension* est ajouté aux répondeurs automatiques ; il s'agit d'une chaîne qui spécifie comment étendre les noms d'utilisateur dans la recherche en ajoutant des informations supplémentaires après le nom. Lorsque plusieurs résultats de recherche sont trouvés, cet attribut s'active et retourne la valeur d'un autre attribut choisi par l'administrateur.

- None : valeur par défaut, le nom d'utilisateur est prononcé tel quel.
- Office : ajoute l'information du bureau configuré dans Entra ID.
- Department : ajoute l'information du service configuré dans Entra ID.

---

##### Configuration en mode PowerShell
Vous pouvez configurer le nouvel attribut *UserNameExtension* via les commandes PowerShell suivantes :
```powershell
Connect-MicrosoftTeams

$AAToModify = Get-CsAutoAttendant -Identity 45693a48-7f85-aaaa-bbbb-cccccccccccc
$AAToModify.UserNameExtension = "Department"
Set-CsAutoAttendant -Instance $$AAToModify = Get-CsAutoAttendant -Identity 45693a48-7f85-aaaa-bbbb-cccccccccccc
```

La configuration peut prendre plusieurs minutes avant d'être effective. Votre menu devrait ensuite ressembler à ceci :

![image](/images/blog/teams/tuto/teams_duplicate_name_directory_001.png)

À noter que le changement n'est possible qu'en PowerShell pour le moment et toute mise à jour via le Teams Admin Center annulerait cette configuration ; mais comme d'habitude, une prochaine mise à jour permettra de la faire en mode web, soyez patients.

---

##### Expérience pour l'appelant
Grâce à cet attribut, la recherche dans l'annuaire d'un doublon de nom retournera l'information du bureau ou du service.

- *Pour Maxime Hiez – RH, appuyez sur 1.*<br/>
- *Pour Maxime Hiez – Informatique, appuyez sur 2.*

---

##### Conclusion
Vous savez maintenant comment résoudre le problème des doublons dans la recherche par nom ou extension dans l'annuaire.

---

##### Sources
[Microsoft Learn - New-CsAutoAttendant](https://learn.microsoft.com/fr-ca/powershell/module/teams/new-csautoattendant?view=teams-ps#-UserNameExtension)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.