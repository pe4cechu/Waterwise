import React, { createContext, useContext, useState } from 'react';

type User = {
    id: string;
    fname: string;
    lname: string;
    email: string;
    age: number;
    gender: string;
};

type UserContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>({
        id: '1',
        fname: 'Trần',
        lname: 'Anh T',
        email: 'john.doe@example.com',
        age: 30,
        gender: 'male',
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
