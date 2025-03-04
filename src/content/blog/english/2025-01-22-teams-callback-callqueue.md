---
title: "How to configure callback in a Teams queue"
meta_title: ""
description: ""
date: 2025-01-22T10:00:00-05:00
image: "/images/blog/teams/tuto/teams_callback_callqueue_thumbnail.png"
categories: ["Teams", "Tutorial"]
author: "Maxime Hiez"
tags: ["Telephony", "Direct Routing", "Calling Plan", "Operator Connect", "Call Queue", "Callback", "PowerShell"]
draft: false
---
---

##### Definition
Callback in Teams allows callers in a queue to be called back after a certain time rather than waiting until an agent becomes available.

---

##### Prerequisites
**<u>Licenses required</u>**
- *Microsoft Teams Phone Resource Account*.

**<u>Microsoft Teams telephony enabled</u>**
- A configured call queue.

**<u>Administrator role</u>**
- An account with the *Global Administrator* or *Teams Administrator* role to access the Microsoft Teams Admin Center.

---

---

##### Step 1 : Sign in to the Microsoft Teams admin center
Sign in to the Microsoft Teams Admin Center by opening your web browser to https://admin.teams.microsoft.com.

---

##### Step 2 : Enable the callback feature
In the left menu, click *<u>Voice</u>* then *<u>Call queues</u>*, and edit the queue on which you want to add the callback functionality.

![image](/images/blog/teams/tuto/teams_callback_callqueue_001.png)

Click the *Callback* menu and activate the *Callback* switch.

![image](/images/blog/teams/tuto/teams_callback_callqueue_002.png)

---

##### Step 3 : Set conditions
It is possible to configure 3 conditions to trigger the callback.
- Waiting time : The callback becomes eligible when the defined waiting time is reached.
- Number of calls waiting : The callback becomes eligible when the defined number of calls is reached.
- Ratio between the number of agents and the number of waiting calls : The callback becomes eligible when the defined ratio is reached.

In my example, I choose to configure 2 minutes.<br/>
Note that the default music lasts 2 minutes, so even if I had configured 1 minute, the callback would only have been offered after the music ended.

![image](/images/blog/teams/tuto/teams_callback_callqueue_003.png)

---

##### Step 4 : Define the audio greeting
When one of the conditions is met, the greeting you defined will be played. It can be an audio file (mp3, wav or wma) or text-to-speech.

![image](/images/blog/teams/tuto/teams_callback_callqueue_004.png)

---

##### Step 5 : Set the callback key
Choose the key on the telephone keypad that should be entered by the caller.

![image](/images/blog/teams/tuto/teams_callback_callqueue_005.png)

---

##### Step 6 : Set the notification group
It is possible to notify people by email when a reminder expires. Enter the name of the M365 group to notify

![image](/images/blog/teams/tuto/teams_callback_callqueue_006.png)

---

##### Step 7 : Apply a voice policy
Since the queue is placing an outgoing call, it is important not to forget to apply a voice policy on the resource account (like for a user).

In the left menu, click *<u>Voice</u>* then *<u>Resource Accounts</u>*, and edit the resource account of the queue you just add reminder functionality. Add the voice policy that best suits your needs.

![image](/images/blog/teams/tuto/teams_callback_callqueue_007.png)

---

##### Configuration in PowerShell
You can also connect to it via the following PowerShell commands :
```powershell
Connect-MicrosoftTeams

$ITSupport = (Get-Team -DisplayName "Support IT Callback").GroupID

New-CsCallQueue -Name "IT Support" -UseDefaultMusicOnHold $true -LanguageID fr-CA -IsCallbackEnabled $true -CallbackRequestDtmf "Tone1" -WaitTimeBeforeOfferingCallbackInSecond 120 -CallbackOfferTextToSpeechPrompt "All our agents are currently busy. If you want to be called back, press 1." -CallbackEmailNotificationTarget $ITSupport

Grant-CsOnlineVoiceRoutingPolicy -Identity CQ_ITSupport@hiez.ca -PolicyName "Canada and USA" 
```

---

##### Agent experience
As soon as an agent becomes available, a Teams call appears in its client in the same way as a call but an audio message will be played explaining that it is a callback and to ask for the person (which was spoken by the caller is played).<br/>
The call is then transferred to the caller.

---

##### Caller experience
The caller hears music in the queue. If the call is not answered by any agent, the callback functionality will be triggered after the defined delay. The caller must then press the key announced by the message. The system will also ask the caller to say their name so the agent knows who to ask when calling back. He will be automatically called back by the next available agent.

---

##### Conclusion
You now know how to enable callback on a Teams queue.

---

##### Sources
[Microsoft Learn - New-CsCallQueue](https://learn.microsoft.com/en-us/powershell/module/teams/new-cscallqueue?view=teams-ps)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.