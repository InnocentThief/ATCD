import { makeAutoObservable } from 'mobx'
import 'moment/locale/de'
import 'moment/locale/en'
import queryString from 'query-string'
import { createQueryWritter } from '../helpers/queryParams'
import { Text } from '../models/Text'

type Language = 'de' | 'en'
const languages: Language[] = ['de', 'en']

const SELECTED_LANG_KEY_STORAGE_KEY = 'selected-lang'

export class TextContext {
  private repo: Record<Language, Text> = { de: {}, en: {} }
  selectedLang: Language = 'de'

  constructor() {
    makeAutoObservable(this)
    this.initLanguage()
    this.fetchTexts()
  }

  txt = (key: string) => {
    return this.repo[this.selectedLang][key] ?? `{${key}}`
  }

  switchLang = () => {
    this.selectedLang = this.selectedLang === 'de' ? 'en' : 'de'
    localStorage.setItem(SELECTED_LANG_KEY_STORAGE_KEY, this.selectedLang)
  }

  fetchTexts = async () => {
    languages.forEach(async lang => {
      const response = await fetch(`/texts/${lang}.json`)
      this.repo[lang] = await response.json()
    })
  }

  private initLanguage = () => {
    let lang = queryString.parse(window.location.search).lang
    if (!lang || typeof lang !== 'string') {
      lang = localStorage.getItem(SELECTED_LANG_KEY_STORAGE_KEY)
      if (!lang) return
    }
    createQueryWritter('lang', () => undefined)()

    const isValid = languages.includes(lang as Language)
    if (!isValid) return
    this.selectedLang = lang as Language
    localStorage.setItem(SELECTED_LANG_KEY_STORAGE_KEY, lang)
  }
}
