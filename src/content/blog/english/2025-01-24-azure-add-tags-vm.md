---
title: "How to add tags to an Azure virtual machine"
meta_title: ""
description: ""
date: 2025-01-24T10:00:00-05:00
image: "/images/blog/azure/tuto/azure_add_tags_vm_thumbnail.png"
categories: ["Azure"]
author: "Maxime Hiez"
tags: ["Tags", "Virtual machine"]
draft: false
---
---

##### Definition
Tags in Azure are customizable labels (in the form of metadata) that you can apply to your resources to organize and manage your cloud environments more efficiently. They play a crucial role in cost management, governance, and task automation.

---

##### Prerequisites
**<u>Licenses required</u>**
- *An Azure subscription*.

**<u>Azure resources</u>**
- A deployed virtual machine.

**<u>Administrator role</u>**
- An account with the *Contributor* or *Owner* role on the Azure subscription.

---

##### Step 1 : Sign in to the Microsoft Azure portal
Sign in to the Microsoft Azure portal by opening your web browser to https://portal.azure.com.

---

##### Step 2 : Add the tags
In the search bar at the top of the screen, type *<u>Virtual machines</u>* and click on the proposed menu.<br/>
All your virtual machines will be displayed; in my case, there is only one (an SBC for telephony).

![image](/images/blog/azure/tuto/azure_add_tags_vm_001.png)

Click on the virtual machine to which you want to apply your tags.

![image](/images/blog/azure/tuto/azure_add_tags_vm_002.png)

In the left menu, click on *<u>Tags</u>*, manually enter the name and value of each tag in the form and click on *Apply*.

![image](/images/blog/azure/tuto/azure_add_tags_vm_004.png)

Once validated, they will be visible after a few seconds.

![image](/images/blog/azure/tuto/azure_add_tags_vm_005.png)

---

##### Configuration in PowerShell
You can also add tags via the following PowerShell commands :
```powershell
$TagsToApply = @{"Environment" = "Telephony"; "Device" = "SBC"; "OS" = "Linux Rocky 8.8"; "Vendor" = "Audiocodes"}
$VirtualMachineName = "vm-sbcteams01"
$RgSbcName = "rg-sbc01"
$Resource = Get-AzResource -Name $VirtualMachineName -ResourceGroup $RgSbcName
New-AzTag -ResourceId $Resource.id -Tag $TagsToApply

Get-AzVM -Name $VirtualMachineName | Select -ExpandProperty Tags
```

---

##### Where to see the result ?
In the search bar at the top of the screen, type *<u>Subscritption</u>* and click on the proposed menu. If you have several, click on the subscription of your choice.<br/>
It is possible to track the consumption of your resources in Azure using tags. Note that it is possible to put it on almost all Azure resources (public IPs, network interfaces of virtual machines, resource groups, etc.) which allows for more precise results.

![image](/images/blog/azure/tuto/azure_add_tags_vm_006.png)

---

##### Conclusion
You now know how to add tags to a virtual machine in Azure.

---

##### Sources
[Microsoft Learn - Add tags via the web](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources-portal)

[Microsoft Learn - Add tags via the PowerShell](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources-powershell)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.