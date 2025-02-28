---
title: "Email sending limits for Exchange Online tenants"
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
Microsoft recently announced the introduction of new outgoing email sending limits for Exchange Online tenants. These new limits, called *Tenant External Recipient Rate Limit* (*TERRL*), aim to prevent misuse of Exchange Online resources and ensure the service is available to all users.

---

##### Why these new limits ?
Until now, Exchange Online primarily used a daily limit per mailbox (*Recipient Rate Limit* or *RRL*) to control the sending of emails. However, this method was not sufficient to prevent the mass sending of unsolicited emails. With the introduction of TERRL, Microsoft wants to establish base limits for all tenants, based on the number of email licenses available, for 24 hours.

---

##### Details of the new limits
The new TERRL limits are calculated based on the number of email licenses available per tenant (24-hour rolling window).<br />
Here is an overview of the new limits :
- Tenants in trial period : Limit of 5000 external recipients per day, regardless of the number of licenses.
- Production tenants : The daily limit is based on the number of email licenses available. The more licenses a tenant has, the more external recipients it can send per day, but at a decreasing rate per license.

![image](/images/blog/exchange/exchange_outbound_email_limits_001.png)

---

##### Additional information
External recipients are those whose email address domains are not accepted domains in the tenant. TERRL limits establish base limits for all tenants, but additional restrictions may also arise due to suspicious sending behavior, spamming, fraudulent or excessively late payments, etc. <br /><br />

| Number of licenses | Sending limit  |
| :----------------: | -------------: |
| 1                  | 10000          |
| 2                  | 10312          |
| 10                 | 12006          |
| 25                 | 14259          |
| 100                | 22059          |
| 1000               | 72446          |
| 10000              | 324979         |
| 100000             | 1590639        |

<u>Note:</u> The calculation formula is 500 * (Licenses^0.7) + 9500

---

##### Deployment schedule
The deployment of the new TERRL limits will be done in 4 phases :

| Phase |         Tenant type         |     Date      |
| :---: | --------------------------: | ------------: |
| 1     | Tenants with ≤ 25 licenses  | 3 March 2025  |
| 2     | Tenants with ≤ 200 licenses | 10 March 2025 |
| 3     | Tenants with ≤ 500 licenses | 17 March 2025 |
| 4     | All other tenants           | 31 March 2025 |

---

##### Impact on users
According to service telemetry data, the majority of Exchange Online customers will not be impacted by these new limits. A new report, titled *Tenant Outbound External Recipients*, will be available in the Exchange admin center (EAC) by the end of February 2025. This report will allow administrators to see their tenant limit.

![image](/images/blog/exchange/exchange_outbound_email_limits_002.png)

---

##### Alternative solutions
For organizations that need to send more emails than the allowed limit, Microsoft recommends using Azure Communication Services for mass or high-volume sends.

---

##### Conclusion
Microsoft's introduction of TERRL limits is an important step in ensuring fair and secure use of Exchange Online resources. These new measures will help prevent abusive email sending and maintain quality of service for all users.

---

##### Sources
[Microsoft - Techcommunity](https://techcommunity.microsoft.com/blog/exchange/introducing-exchange-online-tenant-outbound-email-limits/4372797)

[Microsoft Learn - High volume of emails](https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits)

[Microsoft Learn - Exchange Online limits](https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits)

[Microsoft Learn - Azure Communication Services](https://learn.microsoft.com/en-us/azure/communication-services/concepts/email/email-overview)

---


Did you enjoy this post ? If you have any questions, comments or suggestions, please leave a comment in the section below or by sending me a message from the contact form.

Don't forget to follow us and share this post.