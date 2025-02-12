---
title: "Comment désactiver le libre service sur les licences Copilot"
meta_title: ""
description: ""
date: 2024-11-22T10:00:00-05:00
image: "/images/blog/copilot/tuto/copilot_disable_selfservice_thumbnail.png"
categories: ["Copilot", "Tutoriel"]
author: "Maxime Hiez"
tags: ["Licences", "IA", "Libre service", "PowerShell"]
draft: false
---
---

##### Introduction
Microsoft a activé un paramètre dans les tenants (par défaut) pour autoriser n'importe quel utilisateur à s'acheter une licence *Microsoft Copilot* au travers du portail *Microsoft 365 Copilot self-service purshases*. Copilot, c'est très cool, mais il faut que votre environnement soit correctement sécurisé avant de l'utiliser.

---

##### Étape 1 : Se connecter au Microsoft 365 Admin Center
Connectez vous au Microsoft 365 Admin Center en ouvrant votre navigateur web sur https://admin.microsoft.com/Adminportal.

---

##### Étape 2 : Désactiver le libre service
Dans le menu de gauche, cliquez sur *<u>Copilot</u>*, puis sur *<u>Settings</u>*, et désactivez le *self-service purshases* de la licence Copilot.

![image](/images/blog/copilot/tuto/copilot_disable_selfservice_001.png)

---

##### Allons plus loin en mode PowerShell
Copilot n'est pas la seule licence que vous devriez désactiver avec le libre service. Les commandes PowerShell suivantes vont vous permettre de lister quelles sont les licences concernées :
```powershell
Install-Module -Name MSCommerce -Scope CurrentUser
Import-Module -Name MSCommerce
Connect-MSCommerce
Get-MSCommerceProductPolicies -PolicyId AllowSelfServicePurchase
```

Le commande PowerShell suivante va vous permettre de toutes les désactiver :
```powershell
Get-MSCommerceProductPolicies -PolicyId AllowSelfServicePurchase | Where { $_.PolicyValue -eq “Enabled”} | forEach { Update-MSCommerceProductPolicy -PolicyId AllowSelfServicePurchase -ProductId $_.ProductID -Enabled $false }
```

---

##### Résultat
Le résultat est visible est allant dans le menu de gauche du Microsoft 365 Admin Center et en cliquant sur *<u>Settings</u>*, puis sur *<u>Org settings</u>* et *<u>Self-service trials and purchases</u>*.

![image](/images/blog/copilot/tuto/copilot_disable_selfservice_002.png)


---

##### Conclusion
Vous savez maintenant comment désactiver le libre service sur les licence Copilot (et autres).

---

##### Sources
[Microsoft Learn - Achat libre service](https://learn.microsoft.com/fr-ca/microsoft-365/commerce/subscriptions/allowselfservicepurchase-powershell?view=o365-worldwide)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.