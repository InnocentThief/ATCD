import { makeAutoObservable } from "mobx"

export class SettingsContext {
    
    isDarkTheme: boolean = true

    constructor() {
        makeAutoObservable(this)        
    }

    swithTheme = () => {
        this.isDarkTheme = !this.isDarkTheme
    }
}