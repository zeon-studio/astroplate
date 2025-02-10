---
title: "How to handle duplicates in Teams directory search"
meta_title: ""
description: ""
date: 2025-01-25T10:00:00-05:00
image: "/images/blog/teams/tuto/teams_duplicate_name_directory_thumbnail.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["Telephony", "Direct Routing", "Calling Plan", "Operator Connect", "Directory", "Dial by name", "Dial by extension", "Auto attendant", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft recently announced a significant optimization for the search by name and extension functionality in its Teams auto attendants. You have probably already had this case where 2 employees share the same first and last name, making the search in the directory a little complex. This new update allows a new search attribute to be added, thus giving more details to the caller.

---

##### Optimization details
The new *UserNameExtension* attribute is added to attendants ; this is a string that specifies how to expand usernames in search by adding additional information after the name. When multiple search results are found, this attribute activates and returns the value of another attribute chosen by the administrator.

- None : default value, the username is pronounced as is.
- Office : adds the information of the office configured in Entra ID.
- Department : adds the information of the department configured in Entra ID.

---

##### Configuration in PowerShell
You can configure the new *UserNameExtension* attribute via the following PowerShell commands :
```powershell
Connect-MicrosoftTeams

$AAToModify = Get-CsAutoAttendant -Identity 45693a48-7f85-aaaa-bbbb-cccccccccccc
$AAToModify.UserNameExtension = "Department"
Set-CsAutoAttendant -Instance $$AAToModify = Get-CsAutoAttendant -Identity 45693a48-7f85-aaaa-bbbb-cccccccccccc
```

The configuration may take several minutes to be effective. Your menu should then look like this:

![image](/images/blog/teams/tuto/teams_duplicate_name_directory_001.png)

Note that the change is only possible in PowerShell at the moment and any update via the Teams Admin Center would cancel this configuration ; but as usual, a future update will allow it to be done in web mode, be patient.

---

##### Caller experience
Using this attribute, searching the directory for a duplicate name will return office or department information.

- *For Maxime Hiez – HR, press 1.*<br/>
- *For Maxime Hiez – IT, press 2.*

---

##### Conclusion
Now you know how to fix duplicates when searching by name or extension in the directory.

---

##### Sources
[Microsoft Learn - New-CsAutoAttendant](https://learn.microsoft.com/en-us/powershell/module/teams/new-csautoattendant?view=teams-ps#-UserNameExtension)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.