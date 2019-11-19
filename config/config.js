let config = {
  title: 'Gamers Assembly : Winter Edition 2019',
  logo: `/static/img/logo-100x100.png`,
  description: 'L\'édition 2019 de la Gamers Assembly Winter Edition aura lieu du 7 au 8 décembre. À la salle des fêtes Améthyste - Saint-Georges-Les-Baillargeaux (86).',
  metaImagePath: `/static/img/logo-200x200.png`,
  gaTrackingId: 'UA-128777022-9',
  mainPartner: {
    logo: '/static/img/logoJM106.png',
    url: 'http://www.saint-georges-les-baillargeaux.fr'
  },
  home: {
    banner: '/static/img/bg-winter-2019.png',
    twitterAccount: 'GamersAssembly',
    partners: {
      active: false,
      delay: 10,
      count: 6
    }
  },
  news: {
    title: 'Actualités',
    description: 'Retrouvez toutes les actualités de la Gamers Assembly Winter Edition 2019',
    link: '/news'
  },
  partners: {
    title: 'Partenaires',
    description: 'Retrouvez la liste de tous nos partenaires',
    link: '/partenaires'
  },
  tournaments: {
    title: 'Tournois',
    description: 'Tous les tournois de la Gamers Assembly Winter Edition 2019',
    link: '/tournois'
  },
  info: {
    title: 'Informations pratiques',
    description: 'Toutes les informations sur cet évènement',
    link: '/infos'
  },
  schedule: {
    title: 'Programme',
    description: 'Le programme heure par heure pour tout l\'évènement',
    link: '/schedule'
  },
  live: {
    title: 'Live',
    description: 'Tous les streams et résultats en direct',
    link: '/live'
  },
  tickets: {
    title: 'Billetterie',
    description: 'Achetez vos places pour la Gamers Assembly',
    link: '/billetterie',
    pass: {
      title: 'Pass "Manager/Accompagnateur"',
      text: 'Pour obtenir des pass "Manager/Accompagnateur", les équipes inscrites aux tournois peuvent réaliser une demande via le lien ci-dessous.',
      button: 'Obtenir un pass'
    },
    minor: {
      title: 'Informations pour les mineurs',
      text: 'Vous devez télécharger l\'autorisation parentale, l\'imprimer, la remplir et l\'apporter le jour de votre venue avec votre billet.',
      button: 'Télécharger l\'autorisation parentale (format pdf)'
    },
    rules: {
      title: 'Règlement intérieur',
      text: 'L\'acquisition d\'un ticket entraîne l\'adhésion au règlement intérieur disponible ci-dessous.',
      button: 'Télécharger le règlement intérieur (format pdf)'
    }
  },
  exhibitors: {
    title: 'Exposants',
    description: 'Les exposants que vous pourrez retrouver à la Gamers Assembly',
    link: '/exposants'
  },
  family: {
    title: 'Espace Famille',
    description: 'Les activités à faire en famille durant la Gamers Assembly',
    link: '/espace-famille'
  },
  influencers: {
    title: 'VIPs',
    description: 'Les personnalités qui seront présentes pour la Gamers Assembly',
    link: '/vips'
  },
  contact: {
    active: true,
    pageId: 6
  },
  press: {
    active: false,
    pageId: 7
  },
  legals: {
    active: true,
    pageId: 8
  },
  recruit: {
    active: false,
    title: 'Recrutement',
    description: 'Devenir bénévole pour la GAMERS ASSEMBLY, c\'est par ici !!!',
    formUrl: 'https://goo.gl/forms/84pHQfSp50RcuUel2'
  },
  social: {
    twitter: 'https://twitter.com/GamersAssembly',
    facebook: 'https://www.facebook.com/GamersAssembly',
    twitch: 'https://www.flickr.com/photos/futurolan',
    youtube: 'https://twitch.tv/gamers_assembly',
    flickr: 'https://www.youtube.com/channel/UCbfhRIAsc4xdRACnDUwRfRw',
    discord: 'https://discordapp.com/invite/gamersassembly'
  }
}

module.exports = config
