---
title: "How to enable remote access to MTR via Teams Rooms Pro"
meta_title: ""
description: ""
date: 2025-02-08T10:00:00-05:00
image: "/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_thumbnail.png"
categories: ["MTR"]
author: "Maxime Hiez"
tags: ["Teams Rooms", "MTRoW", "Microsoft Teams Rooms Pro Management"]
draft: false
---
---

##### Definition
The *Microsoft Teams Room Pro Management* portal is a powerful solution designed to help administrators effectively monitor and manage meeting rooms equipped with Microsoft Teams. This portal provides an overview of meeting room health and makes it easier to use existing monitoring tools. Here's how to set up remote access to MTR Teams on Windows and an overview of its features.

---

##### Remote access functionality for administrators
The MTR remote access feature allows administrators to :
- Troubleshoot remotely : Administrators can resolve hardware and software configuration issues on Teams Room consoles without needing to be physically present.
- Security and control : Remote access is secure and follows Microsoft privacy policies. Administrators can create custom roles with specific permissions to limit what each user can see and edit.
- Enabling remote access : By default, remote access is not enabled. Administrators must enable it using role-based permissions and providing an email address for auditing.

---

##### Prerequisites
**<u>Licenses required</u>**
- *Teams Rooms Pro*.

**<u>A Teams room</u>**
- A Windows MTR deployed.

**<u>Administrator role</u>**
- An account with the *Global Administrator* role to access Microsoft Teams Rooms Pro Management.
- An account with the *Global Administrator* or *User Administrator* role to access the Microsoft Entra Admin Center.

**<u>Allow traffic</u>**
- agent.rooms.microsoft.com
- mmrstgnoamiot.azure-devices.net
- mmrstgnoamstor.blob.core.windows.net
- mmrprodapaciot.azure-devices.net
- mmrprodapacstor.blob.core.windows.net
- mmrprodemeaiot.azure-devices.net
- mmrprodemeastor.blob.core.windows.net
- mmrprodnoamiot.azure-devices.net
- mmrprodnoamstor.blob.core.windows.net
- mmrprodnoampubsub.webpubsub.azure.com
- mmrprodemeapubsub.webpubsub.azure.com
- mmrprodapacpubsub.webpubsub.azure.com

---

##### Step 1 : Sign in to the Microsoft Entra Admin Center
Sign in to the Microsoft Entra Admin Center by opening your web browser to https://entra.microsoft.com.

---

##### Step 2 : Create a security group
In the left menu, click *<u>Identity</u>*, then *<u>Groups</u>* and *<u>All groups</u>*.

Click *<u>New group</u>* to create a new security group which will contain the administrators who will have access to the MTR.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_001.png)

---

##### Step 3 : Sign in to the Microsoft Teams Rooms Pro Management portal
Sign in to the Microsoft Teams Rooms Pro Management portal by opening your web browser to https://portal.rooms.microsoft.com.

---

##### Step 4 : Enable the remote access service
In the left menu, click *<u>Settings</u>*, then *<u>General</u>*.

Check the *Allow Teams Rooms Pro Management Remote access* box and enter the contact address.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_002.png)

---

##### Step 5 : Create the role
In the left menu, click *<u>Settings</u>*, then *<u>Roles</u>*.

Click *<u>Create role</u>* and give it a name and description.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_003.png)

Check the *Modify* box in *<u>Remote Access</u>*.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_004.png)

Assign the security group created in step 2.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_005.png)

Assign the room(s) to the rule.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_006.png)

---

##### Step 6 : Access the room
In the left menu, click *<u>Rooms</u>*, then on the room to which you wish to gain access.

Click *<u>Start session</u>*.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_007.png)

After a few moments of loading, the room should be visible.

![image](/images/blog/mtr/tuto/mtr_enable_remote_access_via_portal_008.png)

---

##### Conclusion
The Microsoft Teams Rooms Pro Management portal is an essential tool for administrators, providing detailed monitoring, incident management and remote access capabilities. By following the steps to obtain and configure the portal, administrators can ensure efficient and secure management of meeting rooms equipped with Microsoft Teams.<br/><br/>
Now you know how to enable remote access to MTR via the Microsoft Teams Rooms Pro Management portal.

---

##### Sources
[Microsoft Learn - Teams Room Pro Management Portal](https://learn.microsoft.com/en-us/microsoftteams/rooms/remotely-access-teams-rooms)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.