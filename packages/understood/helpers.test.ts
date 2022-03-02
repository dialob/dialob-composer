import { parseTranslations, parseAvailableLanguages } from './helpers';

const byKey = {
  item: {
    en: 'Item',
    de: 'Produkt',
    et: 'Toode'
  },
  price: {
    de: 'Preis',
    et: 'Hind'
  },
  chair: {
    en: 'Chair',
    de: 'Stuhl',
  },
  computer: {
    en: 'Computer',
    et: 'Arvuti'
  },
  website: {
    en: 'Website',
    de: 'Webseite',
    et: 'Veebileht',
    it: 'Sito web'
  }
};

const byLanguage = {
  en: {
    item: 'Item',
    chair: 'Chair',
    computer: 'Computer',
    website: 'Website'
  },
  de: {
    item: 'Produkt',
    price: 'Preis',
    chair: 'Stuhl',
    website: 'Webseite'
  },
  et: {
    item: 'Toode',
    price: 'Hind',
    computer: 'Arvuti',
    website: 'Veebileht'
  },
  it: {
    website: 'Sito web'
  }
};

describe('parseTranslations', () => {
  const expectedResult: ReturnType<typeof parseTranslations> = byKey;

  it('parses correctly if mapped by language', () => {
    expect(parseTranslations(byLanguage, 'languageToKey')).toEqual(expectedResult);
  });

  it('parses correctly if mapped by key', () => {
    expect(parseTranslations(byKey, 'keyToLanguage')).toEqual(expectedResult);
  });
});

describe('parseAvailableLanguages', () => {
  it('parses correctly if mapped by language', () => {
    expect(parseAvailableLanguages(byKey, 'keyToLanguage')).toEqual(['en', 'de', 'et', 'it']);
  });

  it('parses correctly if mapped by key', () => {
    expect(parseAvailableLanguages(byLanguage, 'languageToKey')).toEqual(['en', 'de', 'et', 'it']);
  });
});
