export type TrustedMerchant = {
  name: string;
  category: string;
  city: string;
  quote: string;
};

export const siteConfig = {
  brandName: "Carte Google Avis",
  price: 40,
  whatsappNumber: "33651743783",
  email: "tombonh@gmail.com",
  orderSubject: "Commande Carte Google Avis",
  seo: {
    title: "Carte Google Avis · Cartes NFC et QR codes pour avis Google",
    description:
      "Vendez plus de confiance avec une carte NFC personnalisée qui ouvre directement la page d’avis Google de votre commerce.",
    image: "/opengraph-image",
  },
};

export const trustedMerchants: TrustedMerchant[] = [
  {
    name: "La Table de Camille",
    category: "Restaurant",
    city: "Lyon",
    quote: "Une carte posée au comptoir, simple à expliquer et utilisée dès le premier service.",
  },
  {
    name: "Atelier Maison Claire",
    category: "Décoration",
    city: "Bordeaux",
    quote: "Nos clients satisfaits peuvent laisser un avis en quelques secondes après leur achat.",
  },
  {
    name: "Studio Belle Coupe",
    category: "Coiffure",
    city: "Nantes",
    quote: "Un petit support physique qui rend la demande d’avis beaucoup plus naturelle.",
  },
];

export const faqItems = [
  {
    question: "Est-ce que le client doit installer une application ?",
    answer:
      "Non. Le client approche simplement son téléphone de la carte NFC ou scanne le QR code. La page d’avis Google s’ouvre dans son navigateur.",
  },
  {
    question: "Puis-je modifier le lien Google après impression ?",
    answer:
      "Oui. La carte contient une URL courte de la plateforme, pas le lien Google direct. Vous pouvez modifier la destination depuis le dashboard.",
  },
  {
    question: "La carte fonctionne-t-elle avec tous les téléphones ?",
    answer:
      "La plupart des smartphones récents lisent le NFC. Le QR code imprimé sert d’alternative universelle pour les téléphones plus anciens.",
  },
  {
    question: "Que comprend le prix de 40 € ?",
    answer:
      "Le prix comprend la carte NFC personnalisée, la programmation du lien court et une carte prête à être utilisée dès réception.",
  },
];

export function getWhatsappUrl(message = "Bonjour, je souhaite commander une Carte Google Avis.") {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
}
