# Carte Google Avis

Site vitrine + MVP Next.js pour vendre et piloter des cartes NFC et QR codes qui redirigent vers les pages Google Avis de commerçants.

La page d’accueil présente l’offre commerciale. Le dashboard `/admin` permet de gérer les commerçants, leurs liens Google Avis, les QR codes et les statistiques de scans.

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Renseignez ensuite les variables dans `.env.local` :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (serveur uniquement, jamais dans du code client)
- `NEXT_PUBLIC_SITE_URL` (par exemple `http://localhost:3000` ou le domaine Vercel)
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD` (mot de passe long et aléatoire)

## Base Supabase

1. Créez un projet Supabase.
2. Ouvrez le SQL Editor.
3. Exécutez [`supabase/schema.sql`](supabase/schema.sql).
4. Remplacez l’URL Google placeholder du commerçant de démonstration depuis `/admin`.

Le schéma active la Row Level Security sans politique publique. Les accès passent par le serveur Next.js avec la clé `service_role`, qui ne doit jamais être exposée au navigateur.

## Routes

- `/` : site vitrine responsive avec accueil, fonctionnement, offre, FAQ et contact.
- `/admin` : gestion protégée des commerçants, statuts, liens, QR codes et statistiques.
- `/admin/qr/[slug]` : aperçu PNG du QR code ; ajoutez `?download=1` pour le télécharger.
- `/c/[slug]` : enregistre un scan puis effectue une redirection HTTP 302 vers l’URL Google courante.

L’URL encodée dans la carte NFC doit toujours être `https://votre-domaine.fr/c/[slug]`, jamais l’URL Google directe.

## Modifier le site vitrine

Les contenus faciles à modifier sont centralisés dans [`src/data/site-content.ts`](src/data/site-content.ts).

### Modifier les commerçants affichés

Dans `trustedMerchants`, ajoutez, modifiez ou supprimez une carte :

```ts
{
  name: "Nom du commerce",
  category: "Restaurant",
  city: "Paris",
  quote: "Phrase courte affichée sur la carte.",
}
```

### Modifier le prix

Dans `siteConfig`, changez simplement :

```ts
price: 40
```

Le prix sera mis à jour automatiquement dans la section d’accueil, l’offre et l’image Open Graph.

### Modifier le numéro WhatsApp

Dans `siteConfig`, changez :

```ts
whatsappNumber: "33600000000"
```

Le format conseillé est le numéro international sans `+`, sans espace et sans point. Exemple : `33612345678`.

### Modifier l’adresse email

Dans `siteConfig`, changez :

```ts
email: "contact@cartegoogleavis.fr"
```

Le formulaire de contact ouvre l’application email du visiteur avec un message prérempli.

## Déploiement Vercel

1. Importez ce dépôt dans Vercel et conservez le preset Next.js.
2. Ajoutez toutes les variables de `.env.example` dans **Settings → Environment Variables**.
3. Définissez `NEXT_PUBLIC_SITE_URL` avec le domaine définitif, sans slash final, par exemple `https://cartegoogleavis.fr`.
4. Déployez puis ajoutez votre domaine dans **Settings → Domains**.
5. Vérifiez `/admin`, téléchargez un QR et confirmez qu’il contient bien le domaine de production.
6. Testez `/c/[slug]` avant d’encoder ou verrouiller une carte NFC.

### Configuration DNS OVH pour `cartegoogleavis.fr`

Dans Vercel, ajoutez ces deux domaines au projet :

- `cartegoogleavis.fr`
- `www.cartegoogleavis.fr`

Dans OVH, ouvrez **Domaines → cartegoogleavis.fr → Zone DNS**, puis ajoutez ou modifiez ces entrées :

| Type | Sous-domaine | Cible | TTL |
| --- | --- | --- | --- |
| `A` | `@` | `76.76.21.21` | Automatique |
| `CNAME` | `www` | `cname.vercel-dns-0.com.` | Automatique |

Si OVH refuse l’ajout, supprimez d’abord les anciennes entrées `A`, `AAAA` ou `CNAME` qui utilisent déjà `@` ou `www`.

Ensuite, dans Vercel, gardez un seul domaine principal. Recommandé :

- domaine principal : `cartegoogleavis.fr`
- redirection : `www.cartegoogleavis.fr` vers `cartegoogleavis.fr`

Pour la vitrine, pensez aussi à remplacer :

- le numéro WhatsApp dans [`src/data/site-content.ts`](src/data/site-content.ts) ;
- l’adresse email ;
- les exemples de commerçants ;
- `NEXT_PUBLIC_SITE_URL` par votre vrai domaine avant de générer les QR codes et cartes NFC définitives.

L’administration utilise une authentification HTTP Basic adaptée au MVP. Utilisez impérativement HTTPS en production et remplacez les identifiants locaux par de nouvelles valeurs Vercel.

> Ne déployez jamais `.env.local` et ne préfixez jamais la clé `service_role` avec `NEXT_PUBLIC_`.
