const textKeys = [
  // Global
  'Global.Yes',
  'Global.No',

  // Login
  'Login.Title',
  'Login.Username',
  'Login.Password',
  'Login.SignIn',
  'Login.ForgotPassword',
  'Login.SignUpNewAccount',
  'Login.Success',
  'Login.ShowAccount',

  // AppBar
  'AppBar.Songs',
  'AppBar.Mappers',
  'AppBar.Playlists',

  // Songs page
  'Songs.SongInfo.MappedBy',
  'Songs.Action.CopyAtr',
  'Songs.Action.Preview',
  'Songs.Action.DownloadZip',

  // Song search
  'SongSearch.SearchBox.Placeholder',
  'SongSearch.AdvancedSearch.Show',
  'SongSearch.AdvancedSearch.Hide',
  'SongSearch.Exclude.Label',
  'SongSearch.Exclude.Placeholder',
  'SongSearch.Genre.Label',
  'SongSearch.Genre.Placeholder',
  'SongSearch.ChoreographyType.Label',
  'SongSearch.ChoreographyType.Placeholder',
  'SongSearch.GemSpeed.Label',
  'SongSearch.Published.Label',
  'SongSearch.Published.Start.Placeholder',
  'SongSearch.Published.End.Placeholder',

  // Song page
  'Song.Detail.Key',
  'Song.Detail.Mapper',
  'Song.Detail.Published',
  'Song.Detail.Genre',
  'Song.Detail.SongLenght',
  'Song.Detail.AverageBpm',
  'Song.Detail.Explicit',
  'Song.Detail.Challenge',
  'Song.Detail.ContentStrike',

  // Authentication Context
  'auth.Error.Server',
  'auth.Error.UsernamePassword',
  'auth.Error.Authentication',
] as const

export type TextKey = (typeof textKeys)[number]
