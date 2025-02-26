---
title: "Limites d'envoi de courriels pour les tenants Exchange Online"
meta_title: ""
description: ""
date: 2025-02-24T10:00:00-05:00
image: "/images/blog/exchange/exchange_outbound_email_limits_thumbnail.png"
categories: ["Exchange"]
author: "Maxime Hiez"
tags: ["TERRL"]
draft: false
---
---

##### Introduction
Microsoft a récemment annoncé l'introduction de nouvelles limites d'envoi de courriels sortants pour les tenants Exchange Online. Ces nouvelles limites, appelées *Tenant External Recipient Rate Limit* (*TERRL*), visent à prévenir l'utilisation abusive des ressources Exchange Online et à garantir la disponibilité du service pour tous les utilisateurs.

---

##### Pourquoi ces nouvelles limites ?
Jusqu'à présent, Exchange Online utilisait principalement une limite quotidienne par boîte aux lettres (*Recipient Rate Limit* ou *RRL*) pour contrôler l'envoi de courriels. Cependant, cette méthode n'était pas suffisante pour empêcher l'envoi massif de courriels non sollicités. Avec l'introduction de TERRL, Microsoft souhaite établir des limites de base pour tous les tenants, en fonction du nombre de licences courriel disponibles, pour 24 heures.

---

##### Détails des nouvelles limites
Les nouvelles limites TERRL sont calculées en fonction du nombre de licences courriel disponibles par tenant (fenêtre glissante de 24 heures).<br />
Voici un aperçu des nouvelles limites :
- Tenants en période d'essai : Limite de 5000 destinataires externes par jour, quel que soit le nombre de licences.
- Tenants en production : La limite quotidienne est basée sur le nombre de licences courriel disponibles. Plus un tenant possède de licences, plus le nombre de destinataires externes qu'il peut envoyer par jour est élevé, mais à un taux décroissant par licence.

![image](/images/blog/exchange/exchange_outbound_email_limits_001.png)

---

##### Informations supplémentaires
Les destinataires externes sont ceux dont les domaines d'adresse courriels ne sont pas des domaines acceptés dans le tenant. Les limites TERRL établissent des limites de base pour tous les tenant, mais des restrictions supplémentaires peuvent également survenir en raison de comportements d'envoi suspects, d'envoi de spam, de paiements frauduleux ou excessivement tardifs, etc <br /><br />

| Nombre de licences | Limite d'envoi |
| :----------------: | -------------: |
| 1                  | 10000          |
| 2                  | 10312          |
| 10                 | 12006          |
| 25                 | 14259          |
| 100                | 22059          |
| 1000               | 72446          |
| 10000              | 324979         |
| 100000             | 1590639        |

<u>Note :</u> La formule de calcul est 500 * (Licences^0.7) + 9500

---

##### Calendrier de déploiement
Le déploiement des nouvelles limites TERRL se fera en 4 phases :

| Phase |       Type de tenant        |     Date     |
| :---: | --------------------------: | -----------: |
| 1     | Tenants avec ≤ 25 licences  | 3 Mars 2025  |
| 2     | Tenants avec ≤ 200 licences | 10 Mars 2025 |
| 3     | Tenants avec ≤ 500 licences | 17 Mars 2025 |
| 4     | Tous les autres tenants     | 31 Mars 2025 |

---

##### Impact sur les utilisateurs
Selon les données de télémétrie de service, la majorité des clients Exchange Online ne seront pas impactés par ces nouvelles limites. Un nouveau rapport, intitulé *Tenant Outbound External Recipients*, sera disponible dans le Centre d'administration Exchange (EAC) d'ici fin Février 2025. Ce rapport permettra aux administrateurs de voir la limite de leur tenant.

![image](/images/blog/exchange/exchange_outbound_email_limits_002.png)

---

##### Solutions alternatives
Pour les organisations ayant besoin d'envoyer plus de courriels que la limite autorisée, Microsoft recommande d'utiliser les services de communication Azure pour les envois massifs ou à volume élevé.

---

##### Conclusion
L'introduction des limites TERRL par Microsoft est une étape importante pour garantir une utilisation équitable et sécurisée des ressources Exchange Online. Ces nouvelles mesures aideront à prévenir l'envoi abusif de courriels et à maintenir la qualité du service pour tous les utilisateurs.

---

##### Sources
[Microsoft - Techcommunity](https://techcommunity.microsoft.com/blog/exchange/introducing-exchange-online-tenant-outbound-email-limits/4372797)

[Microsoft Learn - Limites d’Exchange Online](https://learn.microsoft.com/fr-ca/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits)

[Microsoft Learn - Azure Communication Services](https://learn.microsoft.com/fr-ca/azure/communication-services/concepts/email/email-overview)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.