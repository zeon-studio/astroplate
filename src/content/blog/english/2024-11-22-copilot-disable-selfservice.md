---
title: "How to disable self-service on Copilot licenses"
meta_title: ""
description: ""
date: 2024-11-22T10:00:00-05:00
image: "/images/blog/copilot/tuto/copilot_disable_selfservice_thumbnail.png"
categories: ["Copilot"]
author: "Maxime Hiez"
tags: ["Licenses", "AI", "Self-service", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft has activated a setting in the tenants (by default) to allow any user to purchase a *Microsoft Copilot* license through the *Microsoft 365 Copilot self-service purshases* portal. Copilot is very cool, but your environment must be properly secured before using it.

---

##### Step 1 : Sign in to the Microsoft 365 Admin Center
Sign in to the Microsoft 365 Admin Center by opening your web browser to https://admin.microsoft.com/Adminportal.

---

##### Step 2 : Disable self-service
In the left menu, click on *<u>Copilot</u>*, then on *<u>Settings</u>*, and deactivate the *self-service purshases* of the Copilot license.

![image](/images/blog/copilot/tuto/copilot_disable_selfservice_001.png)

---

##### Let's go further in PowerShell
Copilot isn't the only license you should disable with self-service. The following PowerShell commands will allow you to list which licenses are affected :
```powershell
Install-Module -Name MSCommerce -Scope CurrentUser
Import-Module-Name MSCommerce
Connect-MSCommerce
Get-MSCommerceProductPolicies -PolicyId AllowSelfServicePurchase
```

The following PowerShell command will allow you to deactivate them all :
```powershell
Get-MSCommerceProductPolicies -PolicyId AllowSelfServicePurchase | Where { $_.PolicyValue -eq “Enabled”} | forEach { Update-MSCommerceProductPolicy -PolicyId AllowSelfServicePurchase -ProductId $_.ProductID -Enabled $false }
```

---

##### Result
The result is visible by going to the left menu of the Microsoft 365 Admin Center and clicking on *<u>Settings</u>*, then on *<u>Org settings</u>* and *<u>Self-service trials and purchases</u>*.

![image](/images/blog/copilot/tuto/copilot_disable_selfservice_002.png)


---

##### Conclusion
You now know how to deactivate self-service on Copilot (and other) licenses.

---

##### Sources
[Microsoft Learn - Self-service purchase](https://learn.microsoft.com/en-us/microsoft-365/commerce/subscriptions/allowselfservicepurchase-powershell?view=o365-worldwide)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.