---
title: "Comment arrêter une machine virtuelle inactive dans Azure"
meta_title: ""
description: ""
date: 2025-02-12T10:00:00-05:00
image: "/images/blog/azure/tuto/azure_stop_vm_with_alert_thumbnail.png"
categories: ["Azure", "Tutoriel"]
author: "Maxime Hiez"
tags: ["Azure monitor", "Alerte", "Machine virtuelle"]
draft: false
---
---

##### Définition
La gestion efficace des coûts du cloud est cruciale pour les entreprises. L'un des principaux facteurs de coût dans le cloud est la présence de machines virtuelles (VM) inactives qui continuent de fonctionner même lorsqu'elles ne sont pas nécessaires. Au lieu d'arrêter manuellement ces VM, vous pouvez utiliser Azure Automation et les alertes pour les arrêter automatiquement lorsqu'elles sont inactives. Voici comment configurer cette automatisation dans Azure.

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

##### Étape 2 : Créer un compte d'automatisation
Dans la barre de recherche en haut de l'écran, écrivez sur *<u>Automation account</u>* et cliquez sur le menu proposé.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_001.png)

Remplissez les informations basiques (abonnement, groupe de ressource, nom et région) pour votre compte.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_002.png)

Cochez la case *System assigned*.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_003.png)

Cochez la case *Public access*.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_004.png)

Optionnellement, vous pouvez attacher des tags. Voir l'article de Janvier 2025 [ICI](https://maxime.hiez.ca/blog/2025-01-24-azure-add-tags-vm) dans lequel je parlais des tags.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_005.png)

Votre compte est maintenant créé.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_006.png)

---

##### Étape 3 : Créer une alerte pour détecter les VM inactives
Dans la barre de recherche en haut de l'écran, écrivez sur *<u>Virtual machines</u>* et cliquez sur le menu proposé.<br/>
Toutes vos machines virtuelle vont être affichées ; dans mon cas, il n'y en a qu'une seule (un PC Windows 10).

Dans le menu de gauche, cliquez sur *<u>Monitoring</u>*, puis *<u>Alerts</u>* et *<u>Create custom alert rule</u>*.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_007.png)

Choisissez *Percentage CPU* comme signal, définissez le seuil (j'ai mis 2% pour l'exemple) et la fréquence de vérification (15 minutes dans mon cas).

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_008.png)

---

##### Étape 4 : Créer une action pour éteindre les VM
Cliquez sur l'onglet *<u>Actions</u>*, puis sur *<u>Create action group</u>*.<br/>
Remplissez les informations basiques (abonnement, groupe de ressource, région et nom de l'action) pour votre action.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_009.png)

Choisissez le type de notification. J'ai configuré la notification par courriel, mais il est possible de le faire via un SMS.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_010.png)

Choisissez l'action *Stop VM* et le compte *automationaccount01* créé dans l'étape 2.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_011.png)

---

##### Étape 5 : Compléter l'alerte de détection
Remplissez les informations basiques (abonnement, groupe de ressource, sévérité, alerte et description) pour votre alerte.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_012.png)

La configuration est maintenant complétée.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_013.png)

---

##### Où voir le résultat ?
On voit ici que ma VM est allumée (*running*) car le signal (CPU inférieur à 2% pendant 15 minutes) n'est pas encore atteint. Azure surveille l'utilisation du CPU de la VM.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_014.png)

Dès que le signal est atteint, je reçois le courriel de notification (ou le SMS).

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_015.png)

Et je peux voir que ma VM est maintenant éteinte (*deallocated*).

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_016.png)

Cliquez sur *<u>Alerts</u>* pour valider que l'action programmée est bien la cause de l'arrêt de la VM.

![image](/images/blog/azure/tuto/azure_stop_vm_with_alert_017.png)

---

##### Conclusion
Utiliser *Azure Monitor Alerts & Automation* pour arrêter automatiquement les VM inactives permet de réaliser des économies dynamiques sans effort manuel. Cette méthode est particulièrement utile pour les environnements où l'utilisation des VM est imprévisible. En suivant ces étapes, vous pouvez optimiser vos coûts cloud et améliorer l'efficacité de votre gestion des ressources.<br/><br/>
Vous savez maintenant comment programmer une alerte pour arrêter une machine virtuelle inactive.

---

##### Sources
[Microsoft - Techcommunity](https://techcommunity.microsoft.com/blog/startupsatmicrosoftblog/how-to-automatically-shut-down-idle-vms-in-azure/4376055)

[Microsoft Learn - Azure Monitor](https://learn.microsoft.com/fr-ca/azure/azure-monitor/alerts/alerts-overview)

[Microsoft - Tarification Azure Monitor](https://azure.microsoft.com/fr-ca/pricing/details/monitor)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.