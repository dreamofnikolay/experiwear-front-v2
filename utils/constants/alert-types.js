
import LINKS from 'utils/constants/links'

const ALERT_TYPES = {
  NEWS: {
    LABEL: 'News',
    VALUE: 'news',
    HREF: LINKS.NEWS.HREF
  },
  SURVEY: {
    LABEL: 'Survey',
    VALUE: 'survey',
    HREF: LINKS.SURVEY.HREF
  },
  SCORE: {
    LABEL: 'Score',
    VALUE: 'score',
    HREF: LINKS.SCORE.HREF
  },
  PROMO: {
    LABEL: 'Promo',
    VALUE: 'promo',
    HREF: LINKS.PROMO.HREF
  },
}

const ALERT_TYPES_ARRAY = [
  ALERT_TYPES.NEWS,
  ALERT_TYPES.SURVEY,
  ALERT_TYPES.SCORE,
  ALERT_TYPES.PROMO,
]

export {
  ALERT_TYPES,
  ALERT_TYPES_ARRAY
}