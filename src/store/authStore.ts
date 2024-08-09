import bcrypt from 'bcryptjs';
import { hashPassword } from "@/services/HashPassword.ts";
import { getItem, removeItem, setItem } from "@/services/LocalStorage.ts";
import type { User } from "@/types/UsersTypes";

export const useAuthStore = defineStore("auth", () => {
    const usersList = ref<User[]>(getItem('usersList') || []),
        userInfo = ref<User>(getItem('userInfo') || {}),
        statusAuth = ref<boolean>(!!getItem('userInfo'));

    const initializeUsersList = async (): Promise<void> => {
        usersList.value.push({
                login: 'admin',
                password: await hashPassword('admin'),
                role: 'admin',
                id: crypto.randomUUID()
            },
            {
                login: 'user',
                password: await hashPassword('user'),
                role: 'user',
                id: crypto.randomUUID()
            },
            {
                login: 'mentor',
                password: await hashPassword('mentor'),
                role: 'mentor',
                id: crypto.randomUUID()
            }
        );
        setItem("usersList", usersList.value);
    }

    const createUser = async (user: User): void => {
        usersList.value.push(
            {
                login: user.login,
                password: await hashPassword(user.password),
                role: user.role,
                id: crypto.randomUUID()
            }
        )
        setItem("usersList", usersList.value);
    }

    const updateUser = async (values): Promise<void> => {
        const userIndex = usersList.value.findIndex(book => book.id === values.id);
        if (userIndex != -1) {
            values.password = await hashPassword(values.password);
            removeItem("usersList");
            usersList.value[userIndex] = values;
            setItem("usersList", usersList.value);
        }
    }

    const login = async (user: User): Promise<void> => {
        try {
            const foundUser: User | undefined = usersList.value.find(u => u.login === user.login);
            if (foundUser) {
                const isPasswordCorrect = await bcrypt.compare(user.password, foundUser.password);
                if (isPasswordCorrect) {
                    statusAuth.value = true;
                    userInfo.value = foundUser;
                    setItem("userInfo", foundUser);
                } else {
                    statusAuth.value = false;
                    throw new Error('Invalid password');
                }
            } else {
                statusAuth.value = false;
                throw new Error('User not found');
            }
        } catch (error) {
            throw error;
        }
    };



    const logout = (): void => {
        statusAuth.value = false;
        userInfo.value = {};
        removeItem("userInfo");
    }

    return {
        usersList,
        userInfo,
        statusAuth,
        createUser,
        updateUser,
        login,
        logout,
        initializeUsersList
    }
});
