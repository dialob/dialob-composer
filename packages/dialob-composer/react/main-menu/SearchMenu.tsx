import React, { useState, useEffect, useRef } from 'react';
import { Search, Ref } from 'semantic-ui-react';

import escapeRegexp from 'lodash.escaperegexp';
import { Dialob } from '../../global';


interface SearchResult {
  items?: { name: string, results: SearchResultItem[] }, 
  variables?: { name: string, results: SearchResultItem[] }
}

interface SearchResultItem {
  childKey: string,
  title: string,
  description: string,
  type: string,
  id?: string
}


function useDebounce(value: any, wait: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), wait);
    return () => clearTimeout(timer); // cleanup when unmounted
  }, [value, wait]);

  return debounceValue;
}

const SearchMenu: React.FC<{}> = () => {
  const form = Dialob.useForm();
  const editor = Dialob.useEditor();


  const items = form.state.data;
  const language = editor.state.activeLanguage;
  const variables = form.state.variables;


  const [value, setValue] = useState('');
  const [results, setResults] = useState<SearchResult>({});
  const searchTerm = useDebounce(value, 500);
  const componentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (componentRef && componentRef?.current?.firstChild) {
      (componentRef.current.firstChild as Element).classList.add('transparent');
    }
  });

  const navigate = (result: {type: string, id: string}) => {
    switch (result.type) {
      case 'item':
        editor.setActiveItem(result.id);
        break;
      case 'variable':
        editor.showVariables();
        break;
    }
  }

  useEffect(() => {
    if (!searchTerm || !items) {
      setResults({});
      return;
    }
    const rxp = new RegExp(escapeRegexp(searchTerm), 'i');
    const itemMatcher = (item: Dialob.DialobItem) =>
      rxp.test(item.id) ||
      rxp.test(item.description ? item.description[language]: '') ||
      rxp.test(item.label ? item.label[language] : '');

    const itemResults = Object.values(items)
      .filter(item => item.type !== 'questionnaire')
      .filter(itemMatcher)
      .map((item, i) => (
        {
          childKey: item.get('id'),
          title: item.getIn(['label', language]) || ('(Untitled)'),
          description: item.get('id'),
          type: 'item',
          id: item.get('id')
        }
      ));

    const variablesResult = variables ? variables.filter(v => rxp.test(v.name))
      .map((v: { name: string, context?: boolean }) => (
        {
          childKey: v.name,
          title: v.name,
          description: v.context ? 'Context' : 'Expression',
          type: 'variable'
        }
      )) : [];

    const resultCategories: SearchResult = {  };
    if (itemResults.length > 0) {
      resultCategories.items = {
        name: 'Items',
        results: itemResults
      };
    }
    if (variablesResult.length > 0) {
      resultCategories.variables = {
        name: 'Variables',
        results: variablesResult
      }
    }

    setResults(resultCategories);
  }, [searchTerm]);


  return (
    <Ref innerRef={componentRef}>
      <Search placeholder='Search' minCharacters={2} className='item' category
        value={value} results={results}
        onSearchChange={(e, { value }) => setValue(value as string)}
        onResultSelect={(e, { result }) => navigate(result)} />
    </Ref>
  );
}

export default SearchMenu;
