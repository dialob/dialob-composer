import { mount, shallow } from 'enzyme';
import produce from 'immer';
import React from 'react';
import { Format } from '../types';
import { TableEditor } from './TableEditor';

const translationsByKey = {
  table: {
    en: 'Table',
    et: 'Laud'
  },
  item: {
    en: 'Item',
    et: 'Toode'
  }
};

const translationsByLanguage = {
  en: {
    table: 'Table',
    item: 'Item'
  },
  et: {
    table: 'Laud',
    item: 'Toode'
  }
}

const byKeyProps = {
  initialTranslations: translationsByKey,
  format: 'keyToLanguage' as Format,
  initialLanguages: ['en', 'et']
};

const byLanguageProps = {
  initialTranslations: translationsByLanguage,
  format: 'languageToKey' as Format,
  initialLanguages: ['en', 'et']
};

describe.skip('onChange', () => {
  it('is called correctly when mapped by key', () => {
    const onChange = jest.fn();

    const wrapper = mount(<TableEditor {...byKeyProps} onChange={onChange}/>);

    wrapper.find('textarea').at(0).simulate('change', { value: 'new value' });
    expect(onChange).toBeCalled();

    let newTranslations = produce(translationsByKey, translations => {
      translations.table.en = 'new value';
    });

    expect(onChange.mock.calls[0][0]).toEqual(newTranslations);

    onChange.mockClear();
    wrapper.find('textarea').at(1).simulate('change', { value: 'new value' });

    newTranslations = produce(newTranslations, translations => {
      translations.item.et = 'new value';
    });

    expect(onChange.mock.calls[0][0]).toEqual(newTranslations);
  });

  it('is called correctly when mapped by language', () => {
    const onChange = jest.fn();

    const wrapper = mount(<TableEditor {...byLanguageProps} onChange={onChange}/>);

    wrapper.find('textarea').at(0).simulate('change', { value: 'new value' });
    expect(onChange).toBeCalled();

    let newTranslations = produce(translationsByLanguage, translations => {
      translations.en.table = 'new value';
    });
    expect(onChange.mock.calls[0][0]).toEqual(newTranslations);

    onChange.mockClear();
    wrapper.find('textarea').at(1).simulate('change', { value: 'new value' });

    newTranslations = produce(newTranslations, translations => {
      translations.et.item = 'new value';
    });

    expect(onChange.mock.calls[0][0]).toEqual(newTranslations);
  });
});

it.skip('calls onChangeItem when a translation changes', () => {
  const onChangeItem = jest.fn();
  const byKeyWrapper = shallow(<TableEditor {...byKeyProps} onChangeItem={onChangeItem}/>);

  byKeyWrapper.find('textarea').at(0).simulate('change', { value: 'new value' });

  expect(onChangeItem).toBeCalledWith('item', 'et', 'new value');
});

it('will throw if format is wrong', () => {
  const render = (format: any) => () => shallow(<TableEditor {...byKeyProps} format={format}/>);

  expect(render('random')).toThrow();
  expect(render(undefined)).toThrow();
  expect(render(null)).toThrow();
  expect(render('')).toThrow();
});

it('will not throw when translations are cleared', () => {
  const wrapper = shallow(<TableEditor {...byKeyProps}/>);
  expect(() => wrapper.setProps({ translations: {} })).not.toThrow();
});
