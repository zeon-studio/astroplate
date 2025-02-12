---
title: "How to inventory Direct Routing numbers in Teams"
meta_title: ""
description: ""
date: 2025-01-26T10:00:00-05:00
image: "/images/blog/teams/tuto/teams_direct_routing_inventory_thumbnail.png"
categories: ["Teams", "Tutorial"]
author: "Maxime Hiez"
tags: ["Telephony", "Direct Routing", "Inventory", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft Teams continues to evolve to offer ever more effective communication and collaboration solutions. To make life easier for administrators, Microsoft has announced the possibility of maintaining an inventory of *Direct Routing* type numbers directly from the Microsoft Teams Admin Center. This feature was already perfectly functional for numbers. This new update allows admins to keep an inventory in Teams rather than in an external file or SharePoint list.

---

##### Phone number inventory
The functionality is <u>currently</u> only available in a pre-public version in PowerShell.

You can import a unique number via the following PowerShell command :
```powershell
New-CsOnlineDirectRoutingTelephoneNumberUploadOrder -TelephoneNumber "+15144567890"
```

You can import multiple phone numbers (consecutive or not) via the following PowerShell command :
```powershell
New-CsOnlineDirectRoutingTelephoneNumberUploadOrder -TelephoneNumber "+15144567890,+15144567892,+15144567894"
```

You can import a range of phone numbers via the following PowerShell command :
```powershell
New-CsOnlineDirectRoutingTelephoneNumberUploadOrder -StartingNumber "+15144567890" -EndingNumber "+15144567899"
```

You can also import a csv file containing your phone numbers via the following PowerShell commands :
```powershell
$ListDID = [System.IO.File]::ReadAllBytes("C:\Users\maxime\AllMyPhoneNumbers.csv")
New-CsOnlineDirectRoutingTelephoneNumberUploadOrder -FileContent $ListDID
```

<br/>

You can release a phone number via the following PowerShell command :
```powershell
New-CsOnlineTelephoneNumberReleaseOrder -TelephoneNumber "+15144567890"
```

The principle is the same for several phone numbers or a range of phone numbers.

---

##### Result
The phone number is visible with other *Calling Plan* and *Operator Connect* type phone numbers.

![image](/images/blog/teams/tuto/teams_direct_routing_inventory_001.png)

---

##### Conclusion
*Direct Routing* phone number management in the Microsoft Teams Admin Center provides businesses with a flexible, integrated solution for their inventory needs. Administrators can easily configure and manage these numbers, improving the efficiency and productivity of their organization.

---

##### Sources
[Microsoft Learn - New-CsOnlineDirectRoutingTelephoneNumberUploadOrder](https://learn.microsoft.com/en-us/powershell/module/teams/new-csonlinedirectroutingtelephonenumberuploadorder?view=teams-ps)

[Microsoft Learn - New-CsOnlineTelephoneNumberReleaseOrder](https://learn.microsoft.com/en-us/powershell/module/teams/new-csonlinetelephonenumberreleaseorder?view=teams-ps)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.