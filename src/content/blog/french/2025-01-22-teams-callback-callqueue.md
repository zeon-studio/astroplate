---
title: "Comment configurer le rappel dans une file d'attente Teams"
meta_title: ""
description: ""
date: 2025-01-22T10:00:00-05:00
image: "/images/blog/teams/tuto/teams_callback_callqueue_thumbnail.png"
categories: ["Teams"]
author: "Maxime Hiez"
tags: ["Téléphonie", "Direct Routing", "Calling Plan", "Operator Connect", "File d'attente", "Callback", "PowerShell"]
draft: false
---
---

##### Définition
Le rappel (callback) dans Teams permet aux appelants dans une file d'attente de se faire rappeler après un certain délai plutôt que de patienter jusqu'à ce qu'un agent se libère.

---

##### Prérequis
**<u>Licences nécessaires</u>**
- *Microsoft Teams Phone Resource Account*.

**<u>Téléphonie Microsoft Teams activée</u>**
- Une file d'attente configurée.

**<u>Rôle d’administrateur</u>**
- Un compte avec le rôle *Administrateur Global* ou *Administrateur Teams* pour accéder au Microsoft Teams Admin Center.

---

##### Étape 1 : Se connecter au Microsoft Teams Admin Center
Connectez vous au Microsoft Teams Admin Center en ouvrant votre navigateur web sur https://admin.teams.microsoft.com.

---

##### Étape 2 : Activer la fonctionnalité de rappel
Dans le menu de gauche, cliquez sur *<u>Voice</u>*, puis sur *<u>Call queues</u>*, et éditez la file d'attente sur laquelle vous voulez ajouter la fonctionnalité de rappel.

![image](/images/blog/teams/tuto/teams_callback_callqueue_001.png)

Cliquez sur le menu *Callback* et activez l'interrupteur *Callback*.

![image](/images/blog/teams/tuto/teams_callback_callqueue_002.png)

---

##### Étape 3 : Définir les conditions
Il est possible de configurer 3 conditions pour déclencher le rappel.
- Temps d'attente : Le rappel devient éligible lorsque le temps d'attente défini est atteint.
- Nombre d'appels en attente : Le rappel devient éligible lorsque atteint le nombre d'appels défini est atteint.
- Ratio entre le nombre d'agents et le nombre d'appels en attente : Le rappel devient éligible lorsque le ratio défini est atteint.

Dans mon exemple, je choisis de configurer 2 minutes.<br/>
À noter que la musique par défaut dure 2 minutes, donc même si j'avais configuré 1 minute, le rappel n'aurait été offert qu'après la fin de la musique.

![image](/images/blog/teams/tuto/teams_callback_callqueue_003.png)

---

##### Étape 4 : Définir le message audio
Lorsque l'une des conditions est atteinte, le message que vous avez défini va être joué. Il peut être en fichier audio (mp3, wav ou wma) ou en text-to-speech.

![image](/images/blog/teams/tuto/teams_callback_callqueue_004.png)

---

##### Étape 5 : Définir la touche de rappel
Choisissez la touche du pavé téléphonique qui devra être saisie par l'appelant.

![image](/images/blog/teams/tuto/teams_callback_callqueue_005.png)

---

##### Étape 6 : Définir le groupe de notifications
Il est possible de notifier des personnes par courriel lorsqu'un rappel arrive à expiration. Entrez le nom du groupe M365 à notifier

![image](/images/blog/teams/tuto/teams_callback_callqueue_006.png)

---

##### Étape 7 : Appliquer une voice policy
Puisque la file d'attente fait un appel sortant, il est important de ne pas oublier d'appliquer une voice policy sur le compte de ressource (comme pour un utilisateur).

Dans le menu de gauche, cliquez sur *<u>Voice</u>*, puis sur *<u>Resource Accounts</u>*, et éditez le compte de ressource de la file d'attente sur laquelle vous venez d'ajouter la fonctionnalité de rappel. Ajoutez la voice policy qui convient le mieux à votre besoin.

![image](/images/blog/teams/tuto/teams_callback_callqueue_007.png)

---

##### Configuration en mode PowerShell
Vous pouvez aussi vous y configurer la fonctionnalité de rappel via les commandes PowerShell suivantes :
```powershell
Connect-MicrosoftTeams

$ITSupport = (Get-Team -DisplayName "Support IT Callback").GroupID

New-CsCallQueue -Name "IT Support" -UseDefaultMusicOnHold $true -LanguageID fr-CA -IsCallbackEnabled $true -CallbackRequestDtmf "Tone1" -WaitTimeBeforeOfferingCallbackInSecond 120 -CallbackOfferTextToSpeechPrompt "All our agents are currently busy. If you want to be called back, press 1." -CallbackEmailNotificationTarget $ITSupport

Grant-CsOnlineVoiceRoutingPolicy -Identity CQ_ITSupport@hiez.ca -PolicyName "Canada and USA" 
```

---

##### Expérience pour l'agent
Dès qu'un agent devient disponible, un appel Teams se présente dans son client de la même manière qu'un appel mais un message audio lui sera joué expliquant qu'il s'agit d'un rappel et de demander la personne (ce qui a été prononcé par l'appelant est joué).<br/>
L'appel est ensuite transféré à l'appelant.

---

##### Expérience pour l'appelant
L'appelant entend la musique dans la file d'attente. Si l'appel n'est répondu par aucun agent, la fonctionnalité de rappel va se déclencher après le délai défini. L'appelant devra alors appuyer sur la touche annoncé par le message. Le système demandera également à l'appelant de prononcer son nom pour que l'agent sache qui demander lors du rappel. Il sera automatiquement rappelé par le prochain agent disponible.

---

##### Conclusion
Vous savez maintenant comment activer le rappel sur une file d'attente Teams.

---

##### Sources
[Microsoft Learn - New-CsCallQueue](https://learn.microsoft.com/fr-ca/powershell/module/teams/new-cscallqueue?view=teams-ps)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.