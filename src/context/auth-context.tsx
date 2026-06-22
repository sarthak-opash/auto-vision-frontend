import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type User = {
    name?: string
    role?: string
    [key: string]: unknown
}

type AuthContextValue = {
    user: User | null
    token: string | null
    login: (userData: User, token: string) => void
    logout: () => void
    loading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser && token) {
            setUser(JSON.parse(storedUser) as User)
        }
        setLoading(false)
    }, [token])

    const login = (userData: User, nextToken: string) => {
        setUser(userData)
        setToken(nextToken)
        localStorage.setItem('token', nextToken)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
