const textKeys = [
    // Login
    'Login.Username',
    'Login.Password', 
    'Login.SignIn'
] as const

export type TextKey = typeof textKeys[number]