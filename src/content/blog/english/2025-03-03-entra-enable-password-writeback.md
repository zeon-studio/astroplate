---
title: "Activer le password writeback dans Entra ID"
meta_title: ""
description: ""
date: 2025-03-03T10:00:00-05:00
image: "/images/blog/entra/tuto/entra_enable_password_writeback_thumbnail.png"
categories: ["Entra ID"]
author: "Maxime Hiez"
tags: ["Password", "Writeback", "Entra Connect", "GPO"]
draft: false
---
---

##### Introduction
In an organization configured as hybrid with Microsoft cloud, user accounts are created in the on-premises *Active Directory* and are synchronized with *Microsoft Entra ID*. In order for users to change their password in cloud applications, it must be synchronized with their on-premises account so that they can use a single password.

---

##### Prerequisites
**<u>Active Directory</u>**
- An *Active Directory* server configured and accounts created.

**<u>Entra Connect</u>**
- An *Entra Connect* instance connected with Entra ID.

**<u>Administrator Role</u>**
- An account with the *Global Administrator* or *Hybrid Identity Administrator* role to access the Microsoft Entra Admin Center.
- An account with the *Enterprise Administrator* role to access the Active Directory server.

---

##### Step 1 : Enable Password Writeback in Microsoft Entra Connect Options
Start the *<u>Microsoft Entra Connect Sync</u>* application from the local Entra Connect server.

On the setup wizard welcome screen, click *<u>Configure</u>*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_001.png)

Click *<u>Customize synchronization options</u>*, then *<u>Next</u>*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_002.png)

Enter your Microsoft 365 administrator account, then click *<u>Next</u>*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_003.png)

Check the *<u>Password writeback</u>* box, then click *<u>Next</u>*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_004.png)

On the last menu, click *<u>Exit</u>*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_005.png)

The feature is now enabled on the local Entra Connect server.

---

##### Step 2 : Sign in to the Microsoft Entra Admin Center
Sign in to the Microsoft Entra Admin Center by opening your web browser to https://entra.microsoft.com.

---

##### Step 3 : Enable Password Writeback in Microsoft Entra ID
In the left menu, click *<u>Identity</u>*, then *<u>Protection</u>*, and then *<u>Password reset</u>*.

Click *<u>On-premises integration</u>* and enable all options.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_006.png)

The feature is now enabled on Entra ID.

---

##### Step 4 : Set a Minimum Password Age Policy
Start the GPO Management Console (gpmc.msc) from the local Active Directory server.

Click *<u>Computer Configuration</u>*, then *<u>Policies</u>*, then *<u>Windows Settings</u>*, then *<u>Security Settings</u>*, then *<u>Account Policy</u>*, and then *<u>Password Policy</u>*.

Edit the *Minimum password age* policy and set it to *0 days*.

![image](/images/blog/entra/tuto/entra_enable_password_writeback_007.png)

Password policies in the AD DS environment can prevent password resets. Minimum password age must be set to *0* for password rewrite to work.

---

##### Conclusion
You now know how to enable password writeback in Entra ID.

---

##### Sources
[Microsoft Learn - Hybrid identity](https://learn.microsoft.com/en-us/entra/identity/hybrid/prerequisites)

[Microsoft Learn - Entra Connect](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-azure-ad-connect)

[Microsoft Learn - Password reset writeback](https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.