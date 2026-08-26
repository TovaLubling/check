import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    function getRegisteredUsers() {
        return JSON.parse(localStorage.getItem("software-engineering-users") || "[]");
    }

    function login(userData) {
        setUser(userData);
    }

    function authenticate(username, password, role) {
        const registeredUser = getRegisteredUsers().find(candidate =>
            candidate.username === username &&
            candidate.password === password &&
            candidate.role === role
        );

        if (!registeredUser) return false;

        setUser(registeredUser);
        return true;
    }

    function registerUser(userData) {
        const registeredUsers = getRegisteredUsers();
        const usernameTaken = registeredUsers.some(candidate => candidate.username === userData.username);

        if (usernameTaken) return false;

        const newUser = {
            ...userData,
            marks: [],
            personalTasks: []
        };

        localStorage.setItem(
            "software-engineering-users",
            JSON.stringify([...registeredUsers, newUser])
        );
        setUser(newUser);
        return true;
    }

    function logout() {
        setUser(null);
    }

    function updateProfile(profileData) {
        setUser(currentUser => {
            const updatedUser = { ...currentUser, ...profileData };
            updateStoredUser(updatedUser);
            return updatedUser;
        });
    }

    function updateStoredUser(updatedUser) {
        const users = getRegisteredUsers();
        const updatedUsers = users.map(candidate =>
            candidate.username === updatedUser.username ? updatedUser : candidate
        );
        localStorage.setItem("software-engineering-users", JSON.stringify(updatedUsers));
    }

    function addPersonalTask(task) {
        setUser(currentUser => ({
            ...currentUser,
            personalTasks: [...(currentUser.personalTasks || []), task]
        }));
    }

    function togglePersonalTask(taskId) {
        setUser(currentUser => ({
            ...currentUser,
            personalTasks: (currentUser.personalTasks || []).map(task =>
                task.id === taskId ? { ...task, done: !task.done } : task
            )
        }));
    }

    function addContactRequest(request) {
        setUser(currentUser => {
            const updatedUser = {
                ...currentUser,
                contactRequests: [...(currentUser.contactRequests || []), request]
            };
            updateStoredUser(updatedUser);
            return updatedUser;
        });
    }

    return (
        <UserContext.Provider value={{
            user,
            login,
            authenticate,
            registerUser,
            logout,
            updateProfile,
            addPersonalTask,
            togglePersonalTask,
            addContactRequest
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}