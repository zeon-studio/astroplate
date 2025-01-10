---
title: "Create a Caller ID policy in Teams"
meta_title: ""
description: ""
date: 2023-01-04T10:00:00-05:00
image: "/images/tuto/teams/thumbnails/teams_callerid.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["Microsoft", "Microsoft 365", "Teams", "Telephony", "Caller ID", "Direct Routing", "Calling Plan", "Operator Connect", "PowerShell"]
draft: false
---
---

##### Definition
A Caller ID Teams policy controls how the caller's name and phone number are displayed during Microsoft Teams calls. This policy allows administrators to manage and customize caller ID information for users within an organization.

<u>Key features of the Caller ID policy :</u>
- Calling Line ID (CLID): The phone number that is presented as the caller's identity.
- Calling Name (CNAM): The name that appears with the phone number, such as the company's name, a user's name, or "Anonymous".

---

##### Prerequisites
**<u>Required licenses</u>**
- *Teams Phone Standard* (included in the Microsoft 365 E5 license).
- *Microsoft Teams Phone Resource Account*.

**<u>Microsoft Teams telephony enabled</u>**
- At least one user configured and activated for Microsoft Teams telephony (Calling plans / Operator Connect / Direct Routing).
- A resource account with a license and the phone number you want to display when the user makes a call.

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

##### Step 2 : Create a Caller ID policy
In the left menu, click on *<u>Voice</u>* then on *<u>Caller ID policies</u>*.

To create a new policy, click on the *<u>+ Add</u>* button.

Enter the name and description (optional) of the policy.

Enter the name you want to display (CNAM) during calls.

Choose to change the display number to that of the resource account.

![image](/images/teams/teams_callerid-001.png)

You can also create the policy via the following PowerShell commands :
```powershell
$RA_AA = (Get-CsOnlineApplicationInstance -Identity "AA_DEMO@domain.com").ObjectId

New-CsCallingLineIdentity -Identity "DEMO - 514 456-7890" -CallingIDSubstitute Resource -EnableUserOverride $false -ResourceAccount $RA_AA -CompanyName "Contoso"
```

---

##### Step 3 : Assign a Caller ID policy to users
Once your policy is created, all you have to do is assign it to the users who need to display this number during their calls.

In the left menu, click on *<u>Users</u>* then the *<u>Manage users</u>* submenu. The list of all the users in your organization will be displayed. Select the one(s) you want to enable the policy for.

Click the *<u>Policies</u>* tab and edit the *<u>Caller ID policy</u>* attribute to apply the policy of your choice.

![image](/images/teams/teams_callerid-002.png)

You can also assign the policy via the following PowerShell command :
```powershell
Grant-CsCallingLineIdentity -Identity "Maxime@domain.com" -PolicyName "DEMO - 514 456-7890"
```

---

##### Conclusion
You now know how to configure a Caller ID policy for your Teams telephony.

---

##### Sources
[Microsoft Learn - New-CsCallingLineIdentity](https://learn.microsoft.com/en-us/powershell/module/teams/new-cscallinglineidentity?view=teams-ps)

[Microsoft Learn - Grant-CsCallingLineIdentity](https://learn.microsoft.com/en-us/powershell/module/teams/grant-cscallinglineidentity?view=teams-ps)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.