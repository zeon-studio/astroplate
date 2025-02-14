---
title: "How to shut down an idle virtual machine in Azure"
meta_title: ""
description: ""
date: 2025-02-12T10:00:00-05:00
image: "/images/blog/azure/tuto/azure_stop_vm_with_alert_thumbnail.png"
categories: ["Azure", "Tutorial"]
author: "Maxime Hiez"
tags: ["Azure monitor", "Alert", "Virtual machine"]
draft: false
---
---

##### Definition
Managing cloud costs effectively is crucial for businesses. One of the biggest cost drivers in the cloud is the presence of idle virtual machines (VMs) that continue to run even when they are not needed. Instead of manually shutting down these VMs, you can use Azure Automation and alerts to automatically shut down them when they are idle. Here's how to configure this automation in Azure.

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

##### Step 2 : Create an automation account
In the search bar at the top of the screen, type *<u>Automation account</u>* and click on the proposed menu.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_001.png)

Fill out the basic information (subscription, resource group, name, and region) for your account.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_002.png)

Check the *System assigned* box.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_003.png)

Check the *Public access* box.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_004.png)

Optionally, you can attach tags. Check the January 2025 post [HERE](https://maxime.hiez.ca/blog/2025-01-24-azure-add-tags-vm) in which I talked about tags.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_005.png)

Your account is now created.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_006.png)

---

##### Step 3 : Create an alert to detect inactive VMs
In the search bar at the top of the screen, type *<u>Virtual machines</u>* and click on the proposed menu.<br/>
All your virtual machines will be displayed; in my case there is only one (a Windows 10 PC).

In the left menu, click on *<u>Monitoring</u>*, then on *<u>Alerts</u>* and on *<u>Create custom alert rule</u>*.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_007.png)

Choose *CPU Percentage* as signal, set the threshold (I put 2% for the example) and the check frequency (15 minutes in my case).

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_008.png)

---

##### Step 4 : Create an action to turn the VMs off
Click on the *<u>Actions</u>* tab, then on *<u>Create action group</u>*.<br/>
Fill out the basic information (subscription, resource group, region, and action name) for your action.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_009.png)

Choose the type of notification. I have configured the notification by email, but it is possible to do it via SMS.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_010.png)

Choose the *Stop VM* action and the *automationaccount01* account created in step 2.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_011.png)

---

##### Step 5 : Complete the detection alert
Fill out the basic information (subscription, resource group, severity, alert and description) for your alert.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_012.png)

The configuration is now complete.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_013.png)

---

##### Where to see the result ?
We can see here that my VM is on (*running*) because the signal (CPU less than 2% for 15 minutes) has not yet been reached. Azure monitors the CPU usage of the VM.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_014.png)

As soon as the signal is reached, I receive the notification email (or SMS).

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_015.png)

And I can see that my VM is now turned off (*deallocated*).

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_016.png)

Click on *<u>Alerts</u>* to validate that the programmed action is indeed the cause of the VM shutdown.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_017.png)

---

##### Conclusion
Using *Azure Monitor Alerts & Automation* to automatically shut down inactive VMs provides dynamic savings without manual effort. This method is particularly useful for environments where VM usage is unpredictable. By following these steps, you can optimize your cloud costs and improve the efficiency of your resource management.<br/><br/>
You now know how to schedule an alert to shut down an idle virtual machine.

---

##### Sources
[Microsoft - Techcommunity](https://techcommunity.microsoft.com/blog/startupsatmicrosoftblog/how-to-automatically-shut-down-idle-vms-in-azure/4376055)

[Microsoft Learn - Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview)

[Microsoft - Azure Monitor pricing](https://azure.microsoft.com/en-us/pricing/details/monitor)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.