# ISDK

<p align="center">
    <img src="logo_TimeOneGroup_blanc_jaune_Jpeg_RVB.jpg" alt="Ibis logo" width="480">
</p>

---

[![GitHub Super-Linter](https://github.com/TimeOne-Group/isdk/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)
[![GitHub Super-Linter](https://github.com/TimeOne-Group/isdk/workflows/Test%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)

Le SDK [TimeOne](https://timeone.io) est une solution _Privacy By Design_ d'analyse du consentement et d'attribution de conversions au trafic généré par le réseau des affiliés TimeOne.

Notre solution implémente les principes du [Privacy By Design](https://fr.wikipedia.org/wiki/Protection_de_la_vie_priv%C3%A9e_d%C3%A8s_la_conception) en respectant le [règlement général sur la protection des données](https://fr.wikipedia.org/wiki/R%C3%A8glement_g%C3%A9n%C3%A9ral_sur_la_protection_des_donn%C3%A9es) depuis sa conception.

Cet outil est réservé aux clients du groupe [TimeOne](https://timeone.io), si vous êtes interessé, n'hésitez pas à nous contacter via ce [formulaire](https://www.timeonegroup.com/contact/).

---

## Les fonctionnalités principales du SDK TimeOne

- **pas de cookies tiers**.
- **pas de suivi** de la navigation de l'internaute de site en site
- **pas d'identifiant de l'internaute**
- approche centrée uniquement sur le site (**first-part cookies**)
- gestion **native** du consentement aux traceurs de l'internaute
- analyse statistique et **anonyme** des données de consentement et de l'attribution

---

## Les étapes de mise en place

1. Intégration du SDK sur l'ensemble des pages du site **sans conditionnement** de source de trafic ou d'acceptation des cookies par l'internaute. Le SDK TimeOne **n'est pas un traceur** . Il met à disposition un ensemble de fonctionnalités de gestion de consentement et d'attribution.
1. Interconnection du module de consentement avec la [Consent Management Platform (CMP)](https://www.cnil.fr/fr/definition/consent-management-platform-cmp-ou-plateforme-de-gestion-du-consentement).
1. Intégration du module d'attribution sur les pages de conversions du site.

---

## Les cookies utilisés par le SDK TimeOne

| Nom                 | Description                                                      | Finalité                           | Durée    | Conditionnement                                                                         | Consentement                                     |
| ------------------- | ---------------------------------------------------------------- | ---------------------------------- | -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------ |
| to_consent          | Conserve le choix de consentement de l'internaute                | Enregistrement du consentement     | 13 mois  | Lors du choix du consentement de l'internaute via le CMP                                | Strictement nécessaire                           |
| to_event_consent_id | Conserve l'identifiant de l'acte de consentement de l'internaute | Enregistrement du consentement     | 13 mois  | Lors de l'acte de consentement de l'internaute via le CMP                               | Consentement                                     |
| to_subid            | Conserve la source du trafic TimeOne sur le site                 | Mesure de performance publicitaire | 40 jours | Uniquement dans le cas d'un trafic provenant du réseau TimeOne et d'un internaute Optin | Consentement                                     |
| to_cashback         | Conserve la source du trafic cashbacker TimeOne sur le site      | Mesure de performance publicitaire | 30 jours | Uniquement dans le cas d'un trafic provenant d'un cashbacker du réseau TimeOne          | Exempté de consentement (strictement necessaire) |

### Intégration du SDK

Intégration du SDK sur **toutes les pages du site sans conditionnement** de source de trafic ou d'acceptation des cookies par l'internaute.

```html
<script
  async
  type="text/javascript"
  id="__ISDK_ASSETS"
  data-progids="[PROGID]"
  src="https://cdn.jsdelivr.net/gh/TimeOne-Group/isdk@main/dist/isdk.min.js"
></script>
```

- `PROGID` : identifiant de la campagne chez TimeOne

Ce code peut être intégré, aussi bien dans l'en-tête (`<header>`) que dans le corps de la page (`<body>`).

### Interconnection du module de consentement avec la CMP

Le SDK TimeOne doit pouvoir récupérer le consentement par le biais de code à intégrer lors du choix de l'internaute.

Cette fonctionnalité doit être activée lorsque l'internaute a **accepté ou refusé** les traceurs de la catégorie **mesure de performance publicitaire (ou équivalent)**.

- Dans le cas de l'**acceptation** de l'internaute

```html
<script>
  window.__ISDK = window.__ISDK || [];
  window.__ISDK.push(["_setOptin"]);
</script>
```

- Dans le cas du **refus** de l'internaute

```html
<script>
  window.__ISDK = window.__ISDK || [];
  window.__ISDK.push(["_setOptout"]);
</script>
```

### Intégration du module d'attribution

Le SDK TimeOne **conservant le choix du consentement** de l'internaute, le code suivant **ne doit pas être conditionné par la CMP.**

- Code à intégrer sur toutes les pages de confirmation d'une conversion **sans conditionnement à la source de trafic TimeOne**

```html
<script>
  window.__ISDK = window.__ISDK || [];
  window.__ISDK.push(["addConversion", "PROGID"]);
</script>
```

- Code à intégrer sur la page de confirmation de commande pour une **vente**

```html
<script>
  window.__ISDK = window.__ISDK || [];
  window.__ISDK.push([
    "_setSale",
    {
      progid: "PROGID",
      comid: "COMID",
      iu: "IU",
      uniqid: "UNIQUE ID", // transaction ID - required
      price: "DUTY-FREE PRICE", // total : does not include tax and shipping - required
      additionalData: "ADDITIONAL DATA", // additional data
    },
  ]);
</script>
```

- Code à intégrer sur la page de confirmation d'un **lead**

```html
<script>
  window.__ISDK = window.__ISDK || [];
  window.__ISDK.push([
    "_setLead",
    {
      progid: "PROGID",
      comid: "COMID",
      iu: "IU",
      uniqid: "UNIQUE ID", // transaction ID - required
      additionalData: "ADDITIONAL DATA", // additional data
    },
  ]);
</script>
```

Fournis par TimeOne :

- `PROGID` : identifiant de la campagne
- `COMID` : identifiant de la commission
- `IU` : clé sécurisée

A compléter pour chacune des conversions :

- `UNIQUE ID` : identifiant unique de la conversion
- `DUTY-FREE PRICE` : montant de la conversion sans les frais de port et hors taxe
- `ADDITIONAL DATA` : toutes informations supplémentaires relatives à la conversion

## License

Soumis à la [GPL-3.0 license](LICENSE).
