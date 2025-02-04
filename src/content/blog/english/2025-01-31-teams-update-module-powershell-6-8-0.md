---
title: "Update to version 6.8.0 of the PowerShell Teams module"
meta_title: ""
description: ""
date: 2025-01-31T10:00:00-05:00
image: "/images/blog/teams/teams_update_module_powershell_6_8_0_thumbnail.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["MicrosoftTeams", "Module", "Update", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft recently released the new version 6.8.0 of the PowerShell module for Microsoft Teams.

---

##### Installation
You can check the version of the installed module via the following PowerShell command :
```powershell
Get-InstalledModule -Name "MicrosoftTeams"
```

You can install the MicrosoftTeams module via the following PowerShell command :
```powershell
Install-Module -Name MicrosoftTeams
```

You can update the MicrosoftTeams module via the following PowerShell command :
```powershell
Update-Module MicrosoftTeams
```

---

##### What's new ?
Version 6.8.0 contains the following updates :

- Adds an optional parameter *TargetType* to *Get-CsOnlineTelephoneNumberOrder* cmdlet.
- [BREAKING CHANGE] Changes output attribute from *TelephoneNumber* to *TelephoneNumbers* in *Get-CsOnlineTelephoneNumberOrder* cmdlet.
- Releases *New-CsOnlineDirectRoutingTelephoneNumberUploadOrder* cmdlet.
- Releases *New-CsOnlineTelephoneNumberReleaseOrder* cmdlet.
- [BREAKING CHANGE] Replaces *EnablePayAsYouGoSpendingLimits* for *EnableSpendLimits* in *[New|Set]-CsTeamsCallingPolicy*.
- [BREAKING CHANGE] Replaces *PayAsYouGoSpendingUserLimit* for *CallingSpendUserLimit* in *[New|Set]-CsTeamsCallingPolicy*.
- Adds *ShowTeamsCallsInCallLog* to *[New|Set]-CsTeamsCallingPolicy*.
- Releases *[Get|Set]-CsTeamsMultiTenantOrganizationConfiguration* cmdlets.
- Adds new policies namely *TeamsBYODAndDesksPolicy*, *TeamsAIPolicy*, *TeamsWorkLocationDetectionPolicy*, *TeamsMediaConnectivityPolicy*, *TeamsMeetingTemplatePermissionPolicy*, *TeamsVirtualAppointmentsPolicy*, *TeamsWorkLoadPolicy* to *Get-CsOnlineUser* cmdlet output.
- Releases major updates to *Get-CsOnlineUser* cmdlet for Microsoft Teams operated by 21Vianet with significant performance improvements and new filtering capabilities to scenarios without the *-Identity* parameter.
- Releases *Get-M365UnifiedCustomPendingApps* cmdlet to get all M365 unified custom pending apps.
- Releases *Update-M365UnifiedCustomPendingApp* cmdlet to publish or reject an M365 unified custom pending app.
- Adds *Filter* parameter to *Get-CsPhoneNumberAssignment* cmdlet.
- Adds *AIInterpreter*, *VoiceSimulationInInterpreter* parameters to *[New|Set]-CsTeamsMeetingPolicy*.
- Adds *ImmersiveEvents* parameter to *[New|Set]-CsTeamsEventsPolicy*.
- Adds *AnonymousUserAuthenticationMethod* parameter to *[New|Set]-CsTeamsMeetingPolicy*.
- Adds *ExtendedWorkInfoInPeopleSearch* parameter to *Set-CsTeamsClientConfiguration*.
- [BREAKING CHANGE] Replaces *VoiceSimulationInInterpretation* for *VoiceSimulationInInterpreter* in *[New|Set]-CsTeamsCallingPolicy*.

---

##### Conclusion
Go and update your PowerShell for Teams module to benefit from the latest updates and possible configurations.

---

##### Sources
[Microsoft Learn - Release notes](https://learn.microsoft.com/en-us/MicrosoftTeams/teams-powershell-release-notes)

[PowerShell Gallery](https://www.powershellgallery.com/packages/MicrosoftTeams/6.8.0)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.