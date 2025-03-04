---
title: "How to enable LAPS on the MTR Admin account via Intune"
meta_title: ""
description: ""
date: 2025-02-17T10:00:00-05:00
image: "/images/blog/intune/tuto/intune_enable_laps_thumbnail.png"
categories: ["Intune", "Tutorial"]
author: "Maxime Hiez"
tags: ["Teams Rooms", "MTRoW", "LAPS", "Password", "Security"]
draft: false
---
---

##### Definition
Microsoft's *LAPS* (*Local Administrator Password Solution*) is a free tool designed to improve password security for local administrator accounts on workstations, servers and also Microsoft Teams conference rooms.

---

##### How does LAPS work ?
LAPS automatically generates unique and complex passwords for the local administrator accounts of each managed machine. These passwords are then securely stored in Intune. Here are the key steps in its operation :
- Password generation : LAPS creates random passwords for local administrator accounts according to complexity criteria defined by the administrator.
- Secure storage : Generated passwords are stored in Intune.
- Controlled access : Only users with appropriate permissions can access passwords. This ensures that they are only accessible to authorized administrators.
- Automatic rotation : LAPS allows you to set password rotation policies, ensuring that passwords are regularly updated to strengthen security.

---

##### Why implement LAPS?
- Reinforced security : Using the same local administrator password on several machines is a risky practice. If an attacker manages to obtain this password, they can move laterally within the network. LAPS eliminates this risk by generating unique passwords for each machine.
- Simplified management : LAPS automates the management of local administrator passwords, reducing the workload of system administrators. No more manually managing passwords or storing them in insecure files.
- Compliance : Many security regulations require secure password management. LAPS helps organizations comply with these requirements by providing centralized and secure password management.

---

##### Prerequisites
**<u>Licenses required</u>**
- *Teams Rooms Pro* (or *Basic*).

**<u>A Teams room</u>**
- A Windows MTR deployed.

**<u>Administrator role</u>**
- An account with the *Global Administrator* or *User Administrator* role to access the Microsoft Entra Admin Center.
- An account with the *Global Administrator* or *Intune Administrator* role to access the Microsoft Intune Admin Center.

---

##### Step 1 : Sign in to the Microsoft Entra Admin Center
Sign in to the Microsoft Entra Admin Center by opening your web browser to https://entra.microsoft.com.

---

##### Step 2 : Enable LAPS
In the left menu, click *<u>Identity</u>*, then *<u>Devices</u>* and *<u>All devices</u>*.

Click *<u>Device settings</u>*, then click the *Enable Entra Local Administrator Password Solution (LAPS)* switch to enable the service.

![image](/images/blog/intune/tuto/intune_enable_laps_001.png)

---

##### Step 3 : Create a security group
In the left menu, click *<u>Identity</u>*, then *<u>Groups</u>* and *<u>All groups</u>*.

Click *<u>New group</u>* to create a new security group of type *Dynamic device*.

![image](/images/blog/intune/tuto/intune_enable_laps_002.png)

Click *<u>Add dynamic query</u>*, then add *(device.displayName -startsWith "MTR-")* to the rule. This will make it possible to bring together all the MTRs in the same group.

![image](/images/blog/intune/tuto/intune_enable_laps_003.png)

---

##### Step 4 : Sign in to the Microsoft Intune Admin Center
Sign in to the Microsoft Intune Admin Center by opening your web browser to https://intune.microsoft.com.

---

##### Step 5 : Create a LAPS rule
In the left menu, click *<u>Endpoint security</u>*, then *<u>Account protection</u>*.

Create a rule for the *Windows 10 and later* platform with the *Local admin password solution (Windows LAPS)* profile.

![image](/images/blog/intune/tuto/intune_enable_laps_004.png)

Enable the options with the values ​​of your choice.<br />
We want to target the *Admin* account (whose default password is *sfb*) of the MTR.

![image](/images/blog/intune/tuto/intune_enable_laps_005.png)

Assign the security group created in step 3.

![image](/images/blog/intune/tuto/intune_enable_laps_006.png)

---

##### Step 6 : Access the password
In the left menu, click *<u>Devices</u>*, then find the MTR you want to check.

![image](/images/blog/intune/tuto/intune_enable_laps_007.png)

Click *<u>Show local administrator password</u>* to reveal its temporary password.

![image](/images/blog/intune/tuto/intune_enable_laps_008.png)

Below, you can see when the password was automatically changed for the last time, and when it will be replaced again.

---

##### Step 7 : Validate the logs
From the Windows interface (with the new password), go to the *Event Viewer* and open the *Applications and Services Logs / Microsoft / Windows / LAPS* directory. The logs will be visible.

![image](/images/blog/intune/tuto/intune_enable_laps_009.png)

---

##### Let's go further
The procedure here is presented for a Teams MTR conference room whose default account is *Admin* and comes with the password *sfb*, but it also works for the local administrator accounts of your users' workstations.

---

##### Conclusion
Implementing LAPS is a crucial step in strengthening the security of local administrator accounts in an organization. By automating password generation and management, LAPS reduces security risks and simplifies the work of system administrators. By following the steps outlined, you can implement LAPS effectively and improve the security of your infrastructure.<br/><br/>
You now know how to activate LAPS on the MTR Admin account.

---

##### Sources
[Microsoft Learn - Windows LAPS](https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.