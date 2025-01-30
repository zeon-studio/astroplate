---
title: "Comment ajouter des tags sur une machine virtuelle Azure"
meta_title: ""
description: ""
date: 2025-01-24T10:00:00-05:00
image: "/images/blog/azure/tuto/azure_add_tags_vm_thumbnail.png"
categories: ["Azure"]
author: "Maxime Hiez"
tags: ["Tags", "Machine virtuelle"]
draft: false
---
---

##### Définition
Les tags dans Azure sont des étiquettes personnalisables (sous forme de metadata) que vous pouvez appliquer à vos ressources pour organiser et gérer vos environnements cloud de manière plus efficace. Ils jouent un rôle crucial dans la gestion des coûts, la gouvernance, et l'automatisation des tâches.

---

##### Prérequis
**<u>Licences nécessaires</u>**
- *Un abonnement Azure*.

**<u>Des ressources Azure</u>**
- Une machine virtuelle déployée.

**<u>Rôle d’administrateur</u>**
- Un compte avec le rôle *Contributeur* ou *Propriétaire* sur l'abonnement Azure.

---

##### Étape 1 : Se connecter au portail Microsoft Azure
Connectez vous au portail Microsoft Azure en ouvrant votre navigateur web sur https://portal.azure.com.

---

##### Étape 2 : Ajouter les tags
Dans la barre de recherche en haut de l'écran, écrivez sur *<u>Virtual machines</u>* et cliquez sur le menu proposé.<br/>
Toutes vos machines virtuelle vont être affichées ; dans mon cas, il n'y en a qu'une seule (un SBC pour de la téléphonie).

![image](/images/blog/azure/tuto/azure_add_tags_vm_001.png)

Cliquez sur la machine virtuelle sur laquelle vous souhaitez appliquer vos tags.

![image](/images/blog/azure/tuto/azure_add_tags_vm_002.png)

Dans le menu de gauche, cliquez sur *<u>Tags</u>*, inscrivez manuellement le nom et la valeur de chaque tag dans le formulaire et cliquez sur *Apply*.

![image](/images/blog/azure/tuto/azure_add_tags_vm_004.png)

Une fois validés, ils seront visibles après quelques secondes.

![image](/images/blog/azure/tuto/azure_add_tags_vm_005.png)

---

##### Configuration en mode PowerShell

Vous pouvez aussi ajouter les tags via les commandes PowerShell suivantes :
```powershell
$TagsToApply = @{"Environment" = "Telephony"; "Device" = "SBC"; "OS" = "Linux Rocky 8.8"; "Vendor" = "Audiocodes"}
$VirtualMachineName = "vm-sbcteams01"
$RgSbcName = "rg-sbc01"
$Resource = Get-AzResource -Name $VirtualMachineName -ResourceGroup $RgSbcName
New-AzTag -ResourceId $Resource.id -Tag $TagsToApply

Get-AzVM -Name $VirtualMachineName | Select -ExpandProperty Tags
```

---

##### Où voir le résultat ?
Dans la barre de recherche en haut de l'écran, écrivez sur *<u>Subscritption</u>* et cliquez sur le menu proposé. Si vous en avez plusieurs, cliquez sur l'abonnement de votre choix.<br/>
Il est possible de suivre les consommations de vos ressource dans Azure grâce aux tags. À noter qu'il est possible d'en mettre sur presque toutes les ressources Azure (les IP publiques, les interfaces réseau des machines virtuelles, les groupes de ressources, ...) ce qui permet d'avoir des résultats plus précis.

![image](/images/blog/azure/tuto/azure_add_tags_vm_006.png)

---

##### Conclusion
Vous savez maintenant comment ajouter des tags sur une machine virtuelle dans Azure.

---

##### Sources
[Microsoft Learn - Ajouter des tags via le portail web](https://learn.microsoft.com/fr-ca/azure/azure-resource-manager/management/tag-resources-portal)

[Microsoft Learn - Ajouter des tags via PowerShell](https://learn.microsoft.com/fr-ca/azure/azure-resource-manager/management/tag-resources-powershell)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.