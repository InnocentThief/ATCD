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
    'Songs.Action.CopyAtr',
    'Songs.Action.Preview',
    'Songs.Action.DownloadZip',

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
    'auth.Error.Authentication'
    
] as const

export type TextKey = typeof textKeys[number]