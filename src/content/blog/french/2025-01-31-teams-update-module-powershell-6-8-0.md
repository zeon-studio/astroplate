---
title: "Mise à jour en version 6.8.0 du module PowerShell Teams"
meta_title: ""
description: ""
date: 2025-01-31T10:00:00-05:00
image: "/images/blog/teams/teams_update_module_powershell_6_8_0_thumbnail.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["Module", "Mise à jour", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft a récemment publié la nouvelle version 6.8.0 du module PowerShell pour Microsoft Teams.

---

##### Installation
Vous pouvez vérifier la version du module installé via la commande PowerShell suivante :
```powershell
Get-InstalledModule -Name "MicrosoftTeams"
```

Vous pouvez installer le module MicrosoftTeams via la commande PowerShell suivante :
```powershell
Install-Module -Name MicrosoftTeams
```

Vous pouvez mettre à jour le module MicrosoftTeams via la commande PowerShell suivante :
```powershell
Update-Module MicrosoftTeams
```

---

##### Quoi de neuf ?
La version 6.8.0 contient les mises à jour suivantes :

- Ajoute un paramètre facultatif *TargetType* à l’applet de commande *Get-CsOnlineTelephoneNumberOrder*.
- [CHANGEMENT MAJEUR] Modifie l'attribut de sortie de *TelephoneNumber* en *TelephoneNumbers* dans l'applet de commande *Get-CsOnlineTelephoneNumberOrder*.
- Publie l’applet de commande *New-CsOnlineDirectRoutingTelephoneNumberUploadOrder*.
- Publie l’applet de commande *New-CsOnlineTelephoneNumberReleaseOrder*.
- [CHANGEMENT MAJEUR] Remplace *EnablePayAsYouGoSendingLimits* par *EnableSpendLimits* dans *[New|Set]-CsTeamsCallingPolicy*.
- [CHANGEMENT MAJEUR] Remplace *PayAsYouGoSendingUserLimit* par *CallingSpendUserLimit* dans *[New|Set]-CsTeamsCallingPolicy*.
- Ajoute *ShowTeamsCallsInCallLog* à *[New|Set]-CsTeamsCallingPolicy*.
- Publie les applets de commande *[Get|Set]-CsTeamsMultiTenantOrganizationConfiguration*.
- Ajoute de nouvelles stratégies, à savoir *TeamsBYODAndDesksPolicy*, *TeamsAIPolicy*, *TeamsWorkLocationDetectionPolicy*, *TeamsMediaConnectivityPolicy*, *TeamsMeetingTemplatePermissionPolicy*, *TeamsVirtualAppointmentsPolicy*, *TeamsWorkLoadPolicy* à - la sortie de l'applet de commande *Get-CsOnlineUser*.
- Publie des mises à jour majeures de l'applet de commande *Get-CsOnlineUser* pour les équipes Microsoft exploitées par 21Vianet avec des améliorations significatives des performances et de nouvelles capacités de filtrage des scénarios sans le paramètre *-Identity*.
- Publie la cmdlet *Get-M365UnifiedCustomPendingApps* pour obtenir toutes les applications en attente personnalisées unifiées M365.
- Publie la cmdlet *Update-M365UnifiedCustomPendingApp* pour publier ou rejeter une application en attente personnalisée unifiée M365.
- Ajoute le paramètre *Filter* à l’applet de commande *Get-CsPhoneNumberAssignment*.
- Ajoute les paramètres *AIInterpreter*, *VoiceSimulationInInterpreter* à *[New|Set]-CsTeamsMeetingPolicy*.
- Ajoute le paramètre *ImmersiveEvents* à *[New|Set]-CsTeamsEventsPolicy*.
- Ajoute le paramètre *AnonymousUserAuthenticationMethod* à *[New|Set]-CsTeamsMeetingPolicy*.
- Ajoute le paramètre *ExtendedWorkInfoInPeopleSearch* à *Set-CsTeamsClientConfiguration*.
- [CHANGEMENT MAJEUR] Remplace *VoiceSimulationInInterpretation* par *VoiceSimulationInInterpreter* dans *[New|Set]-CsTeamsCallingPolicy*.

---

##### Conclusion
Allez faire la mise à jour de votre module PowerShell pour Teams pour pouvoir bénéficier des dernières mises à jour et configurations possibles.

---

##### Sources
[Microsoft Learn - Notes de publication](https://learn.microsoft.com/fr-ca/MicrosoftTeams/teams-powershell-release-notes)

[PowerShell Gallery](https://www.powershellgallery.com/packages/MicrosoftTeams/6.8.0)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.