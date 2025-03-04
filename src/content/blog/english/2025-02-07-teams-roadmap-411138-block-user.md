---
title: "How to block a specific external user in Teams"
meta_title: ""
description: ""
date: 2025-02-07T10:00:00-05:00
image: "/images/blog/teams/tuto/teams_roadmap_411138_block_user_thumbnail.png"
categories: ["Teams", "Tutorial"]
author: "Maxime Hiez"
tags: ["Blocking", "PowerShell", "Roadmap"]
draft: false
---
---

##### Introduction
Microsoft recently introduced a new feature for Teams administrators to block specific external users. This update aims to strengthen security and protect internal members of the organization from unwanted or malicious communications.

---

##### User blocking feature
Traditionally, administrators could use the remove API (*removeallaccessforuser API*) to prevent a malicious user from sending messages back to the same victim. However, this method was not always enough to completely block the user. Now, a new user blocking API allows administrators to block an external user more effectively, preventing any contact resuming.

![image](/images/blog/teams/tuto/teams_roadmap_411138_block_user_001.png)

---

##### Feature implementation
To use this new capability, a Microsoft Teams administrator must sign in to the Microsoft Teams Admin Center by opening their web browser to https://admin.teams.microsoft.com, and in the left menu, click *<u>Users</u>*, then *<u>External access</u>*. By default, the *Block specific users from communicating with people in my organization* feature is disabled.

![image](/images/blog/teams/tuto/teams_roadmap_411138_block_user_002.png)

By activating the switch, the *Block a user* option appears, and it then becomes possible to manually add the Teams addresses to block.

![image](/images/blog/teams/tuto/teams_roadmap_411138_block_user_003.png)

---

##### Configuration in PowerShell
You can also configure the blocking functionality via the following PowerShell commands :
```powershell
Set-CsTeamsExternalAccessConfiguration -Identity Global -BlockExternalAccessUserAccess $true
Set-CsTeamsExternalAccessConfiguration -Identity Global -BlockedUsers @("user1@domain.com", "user2@domain.com")
```

---

##### Conclusion
This new user blocking feature in Microsoft Teams provides an additional layer of security, allowing administrators to better protect their organization from unwanted external communications. By making this measure more accessible and effective, Microsoft continues to improve the security and management of communications within Teams.

---

##### Sources
[Microsoft Learn - Set-CsTeamsExternalAccessConfiguration](https://learn.microsoft.com/en-us/powershell/module/teams/set-csteamsexternalaccessconfiguration?view=teams-ps)

[Microsoft 365 Roadmap - ID 411138](https://www.microsoft.com/en-us/microsoft-365/roadmap?filters=Microsoft%20Teams&searchterms=411138)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.