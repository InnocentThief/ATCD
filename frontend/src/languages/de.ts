import { TextRepo } from '../models/TextRepo'

export const deTextRepo: TextRepo = {
  // Global
  'Global.Yes': 'Ja',
  'Global.No': 'Nein',

  // Login
  'Login.Title': 'Anmelden',
  'Login.Username': 'Benutzername',
  'Login.Password': 'Passwort',
  'Login.SignIn': 'Anmelden',
  'Login.ForgotPassword': 'Passwort vergessen?',
  'Login.SignUpNewAccount': 'Neuen Account erstellen',
  'Login.Success': 'Erfolgreich angemeldet',
  'Login.ShowAccount': 'Account anzeigen',

  // AppBar
  'AppBar.Songs': 'Songs',
  'AppBar.Mappers': 'Mappers',
  'AppBar.Playlists': 'Playlists',

  // Songs page
  'Songs.SongInfo.MappedBy': 'Gemappt von',
  'Songs.Action.CopyAtr': 'ATR kopieren',
  'Songs.Action.Preview': 'Vorschau',
  'Songs.Action.DownloadZip': 'Zip herunterladen',

  // Song search
  'SongSearch.SearchBox.Placeholder': 'Song Name / Artis / Mapper',
  'SongSearch.AdvancedSearch.Show': 'Erweiterte Suche einblenden',
  'SongSearch.AdvancedSearch.Hide': 'Erweiterte Suche ausblenden',
  'SongSearch.Exclude.Label': 'Ausschliessen',
  'SongSearch.Exclude.Placeholder': 'Einen oder mehrere auswählen',
  'SongSearch.Genre.Label': 'Genre',
  'SongSearch.Genre.Placeholder': 'Eines oder mehrere auswählen',
  'SongSearch.ChoreographyType.Label': 'Choreographie Typ',
  'SongSearch.ChoreographyType.Placeholder': 'Einen oder mehrere auswählen',
  'SongSearch.GemSpeed.Label': 'Gem Geschwindigkeit',
  'SongSearch.Published.Label': 'Publiziert',
  'SongSearch.Published.Start.Placeholder': 'Startdatum',
  'SongSearch.Published.End.Placeholder': 'Enddatum',

  // Song page
  'Song.Detail.Key': 'Schlüssel',
  'Song.Detail.Mapper': 'Mapper',
  'Song.Detail.Published': 'Publiziert',
  'Song.Detail.Genre': 'Genre',
  'Song.Detail.SongLenght': 'Songlänge',
  'Song.Detail.AverageBpm': 'Durchschnittliche BPM',
  'Song.Detail.Explicit': 'Explicit',
  'Song.Detail.Challenge': 'Challenge',
  'Song.Detail.ContentStrike': 'Content Strike',

  // Authentication Context
  'auth.Error.Server': 'Fehler bei der Server-Anfrage aufgetreten',
  'auth.Error.UsernamePassword': 'Benutzername oder Passwort nicht korrekt',
  'auth.Error.Authentication':
    'Fehler bei der Authentifizierung. Du wurdest ausgeloggt',
}
