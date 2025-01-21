---
title: "Blocage de la capture d'écran pour iOS et iPadOS avec Intune"
meta_title: ""
description: ""
date: 2025-01-20T10:00:00-05:00
image: "/images/blog/intune/intune_block_screenshot_apple_thumbnail.png"
categories: ["Intune"]
author: "Maxime Hiez"
tags: ["MAM", "Apple", "iOS", "iPadOS", "iPhone", "iPad", "Capture d'écran"]
draft: false
---
---

##### Introduction
Microsoft Intune a récemment introduit (ENFIN !) une nouvelle fonctionnalité qui permet de bloquer la capture d'écran dans les applications protégées par la gestion des applications mobiles (MAM) pour iOS et iPadOS. Cette mise à jour comble une lacune de sécurité importante pour les organisations utilisant MAM sans inscription de l'appareil, en garantissant que les utilisateurs ne peuvent pas capturer ou partager des informations sensibles à partir de comptes gérés.

---

##### Fonctionnalités clés
- Blocage de la capture d'écran : Lorsque les utilisateurs tentent de capturer ou de partager leur écran à partir d'un compte géré dans une application protégée par MAM, ils recevront un écran blanc au lieu du contenu réel de l'application. Cette fonctionnalité renforce la politique de sécurité par défaut d'Intune et peut être personnalisée via les paramètres de protection des applications.
- Mise à jour des applications : Pour que le blocage de la capture d'écran soit effectif, l'application doit être mise à jour vers une version compatible avec les fonctionnalités de sécurité d'Intune. Les versions requises sont Intune App SDK v19.7.6 ou ultérieure pour Xcode 15 et v20.2.1 ou ultérieure pour Xcode 16.
- Configuration des politiques de protection des applications : L'application doit être configurée avec une politique de protection des applications dans Intune qui restreint le partage des données de l'entreprise avec d'autres applications. Cette configuration est essentielle pour garantir que la capture d'écran est bloquée en empêchant le partage d'informations sensibles à l'extérieur.
- Personnalisation des paramètres : Pour certains scénarios, il peut être nécessaire d'autoriser la capture d'écran tout en conservant la configuration existante de la politique de protection des applications. Microsoft a introduit une clé de configuration d'application gérée *com.microsoft.intune.mam.screencapturecontrol = Disabled* pour remplacer le comportement par défaut.

---

##### Avantages pour les organisations
- Sécurité renforcée : En bloquant la capture d'écran, les organisations peuvent mieux protéger leurs données sensibles contre les fuites potentielles.
- Contrôle accru : Les administrateurs peuvent personnaliser les paramètres de protection des applications pour répondre aux besoins spécifiques de leur organisation, offrant ainsi un contrôle accru sur la sécurité des données.
- Conformité : Cette fonctionnalité aide les organisations à se conformer aux réglementations de sécurité et de confidentialité en empêchant la divulgation non autorisée d'informations sensibles.

---

##### Conclusion
Le blocage de la capture d'écran pour iOS et iPadOS avec Microsoft Intune est une avancée significative pour améliorer la sécurité des applications mobiles gérées. En mettant à jour les applications et en configurant les politiques de protection appropriées, les organisations peuvent assurer une protection robuste de leurs données sensibles.
<br/><br/>
Je ferai un tuto bientôt pour cette fonctionnalité avec les appareils Apple et Android.

---

##### Sources
[Microsoft - Techcommunity](https://techcommunity.microsoft.com/blog/IntuneCustomerSuccess/new-block-screen-capture-for-iosipados-mam-protected-apps/4366312)

---


Avez-vous apprécié cet article ? Vous avez des questions, commentaires ou suggestions, n’hésitez pas à laisser un commentaire dans la section ci-dessous ou en m'envoyant un message depuis le formulaire de contact.

N'oubliez pas de nous suivre et de partager cet article.