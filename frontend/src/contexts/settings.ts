import { makeAutoObservable } from 'mobx'

// const DARKTHEME_STORAGE_KEY = 'isDarkTheme'

export class SettingsContext {
  isDarkTheme: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  swithTheme = () => {
    this.isDarkTheme = !this.isDarkTheme
  }
}
