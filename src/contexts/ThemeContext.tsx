import React, {
    ReactNode,
    createContext,
    useContext,
    useMemo,
    useState,
} from 'react';

// Define the shape of the theme, including the toggle function and colors
interface ThemeColors {
    background: string;
    sub_background: string;
    nav_background: string;
    nav_text: string;
    text: string;
    card: string;
    primary: string;
    item: string;
    status: 'light-content' | 'dark-content';
}

interface ThemeContextType {
    isDarkTheme: boolean;
    toggleTheme: () => void;
    colors: ThemeColors;
}

// Create context with an explicit type or null as default
const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
    children: ReactNode; // ReactNode ensures we can pass any valid JSX
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    // Use `useMemo` to memoize the theme object, recalculating it only if `isDarkTheme` changes
    const theme: ThemeContextType = useMemo(
        () => ({
            isDarkTheme,
            toggleTheme,
            colors: isDarkTheme
                ? {
                      background: '#001c31',
                      sub_background: '#002949',
                      nav_background: '#002949',
                      nav_text: '#a2d5ff',
                      text: '#a2d5ff',
                      card: '#001c31',
                      primary: '#0ea6e9',
                      optionBox: '#37474F',
                      item: '#37474F',
                      status: 'light-content',
                  }
                : {
                      background: '#f5f4fa',
                      sub_background: '#d0eaff',
                      nav_background: '#fff',
                      nav_text: '#bcbcbc',
                      text: '#121212',
                      card: '#f5f4fa',
                      primary: '#0ea6e9',
                      item: '#F4F8FB',
                      status: 'dark-content',
                  },
        }),
        [isDarkTheme],
    );

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
