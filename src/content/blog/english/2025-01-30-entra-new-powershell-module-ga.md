---
title: "The end of AzureAD and MSOnline PowerShell modules"
meta_title: ""
description: ""
date: 2025-01-30T10:00:00-05:00
image: "/images/blog/entra/entra_new_powershell_module_ga_thumbnail.png"
categories: ["Entra ID"]
author: "Maxime Hiez"
tags: ["AzureAD", "MSOnline", "Microsoft Graph", "Module", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft recently announced the general availability of the Microsoft Entra PowerShell module. This module offers administrators and IT professionals a new way to manage and automate tasks related to Microsoft Entra ID (formerly Azure Active Directory). This update marks an important step in simplifying identity and access management in cloud environments.

---

###### Timeline
In 2021, Microsoft announced that the next developments on PowerShell would focus on the *Microsoft Graph PowerShell SDK*.

|   Module   | End of support |           Retirement            |
| :--------: | :------------: | :-----------------------------: |
| AzureAD    | March, 30 2025 | After July 1, 2025              |
| MSOnline   | March, 30 2025 | Early Apr 2025 to late May 2025 |

---

##### Benefits of migrating to Microsoft Graph 
Microsoft Graph represents the best-in-breed API surface. It offers a single unified endpoint to access Microsoft Entra services and Microsoft 365 services such as Microsoft Teams and Microsoft Intune. All new functionalities will only be available through Microsoft Graph. Microsoft Graph is also more secure and resilient than Azure AD Graph.

Microsoft Graph has all the capabilities that have been available in Azure AD Graph and new APIs like identity protection and authentication methods. Its client libraries offer built-in support for features like retry handling, secure redirects, transparent authentication, and payload compression.

---

##### How to know if these modules are still used
Microsoft Entra sign-in logs can be used to identify connections from MSOnline and AzureAD PowerShell. They provide information about the client and user of the PowerShell session.

1. Sign in to the Microsoft Entra Admin Center by opening your web browser to https://entra.microsoft.com.
2. In the left menu, click on *<u>Identity</u>*, then on *<u>Monitoring & health</u>* and on *<u>Sign-in logs</u>*.
3. Select the *<u>User sign-ins (Interactive)</u>* tab, then click on *<u>Add filters</u>* and choose the *Application* attribute.
4. Enter *Azure Active Directory PowerShell* to apply the filter.

![image](/images/blog/entra/entra_new_powershell_module_ga_001.png)

The *MSOnline PowerShell* and *AzureAD PowerShell* sign-in events appear with the application name *Azure Active Directory PowerShell*.

---

##### How to upgrade to the new version ?
You can install the new Entra module (API version */v1.0*) via the following PowerShell command :
```powershell
Install-Module -Name Microsoft.Entra -Repository PSGallery -Scope CurrentUser -Force -AllowClobber 
```

Or install the beta version of the module via the following PowerShell command :
```powershell
Install-Module -Name Microsoft.Entra.Beta -Repository PSGallery -Scope CurrentUser -Force -AllowClobber 
```

Once installed, you can connect via the following PowerShell command :
```powershell
Connect-Entra -Scopes 'User.Read.All'
```

If you have existing scripts that run with the AzureAD module, you can continue to use them with minimal modification by adding the *Enable-EntraAzureADAlias* command.
```powershell
Import-Module -Name Microsoft.Entra.Users
Connect-Entra #Replaces Connect-AzureAD for auth
Enable-EntraAzureADAlias #Enable aliasing
Get-AzureADUser -Top 1
```

---

##### Conclusion
The general availability of the Microsoft Entra PowerShell module provides administrators with a powerful and flexible new way to manage identity and access in cloud environments. By automating common tasks and centralizing management, this module increases efficiency and security.

---

##### Sources
[Microsoft - Techcommunity](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/microsoft-entra-powershell-module-now-generally-available/4365718)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.