---
title: "Create a resource account in Teams"
meta_title: ""
description: ""
date: 2023-01-04T09:00:00-05:00
image: "/images/image-placeholder.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["Telephony", "Resource Account", "Direct Routing", "Calling Plan", "Operator Connect", "Auto attendant", "Call queue", "PowerShell"]
draft: false
---
---

##### Definition
A resource account in Microsoft Teams is used for specific functionalities like call queues or auto attendants.

---

##### Prerequisites
**<u>Required licenses</u>**
- *Microsoft Teams Phone Resource Account*.

**<u>Administrator role</u>**
- An account with the *Global Administrator* or *Teams Administrator* role to access the Microsoft Teams Admin Center.

---

##### Step 1 : Sign in to the Microsoft Teams admin center
Sign in to the Microsoft Teams Admin Center by opening your web browser to https://admin.teams.microsoft.com.

You can also connect to it via the following PowerShell command :
```powershell
Connect-MicrosoftTeams
```

---

##### Step 2 : Create a resource account
In the left menu, click *<u>Voice</u>*, then *<u>Resource accounts</u>*.

To create a new account, click the *<u>+ Add</u>* button.

Enter the display name, username, and domain to use.

Choose the type of resource account (Auto attendant or Call queue).

![image](/images/teams/teams_ressacc-001.png)

You can also create the account via one the following PowerShell commands :
```powershell
New-CsOnlineApplicationInstance -UserPrincipalName "AA_DEMO@domain.com" -ApplicationId "ce933385-9390-45d1-9512-c8d228074e07" -DisplayName "AA_DEMO"

New-CsOnlineApplicationInstance -UserPrincipalName "CQ_DEMO@domain.com" -ApplicationId "11cd3e2e-fccb-42ad-ad00-878b93575e07" -DisplayName "CQ_DEMO"
```

---

##### Conclusion
You now know how to create a resource account for your Teams telephony menus.

---

##### Sources
[Microsoft Learn - New-CsOnlineApplicationInstance](https://learn.microsoft.com/en-us/powershell/module/teams/new-csonlineapplicationinstance?view=teams-ps)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.