import { getItem, removeItem, setItem } from "../services/LocalStorage.ts";
import axios, { AxiosResponse } from "axios";
import { Book } from "../types/BooksTypes.ts";

export const useBooksStore = defineStore("books", () => {
    const booksList = ref<Book[]>(getItem("booksList") || []),
        isLoading = ref<boolean>(false),
        authStore = useAuthStore(),
        { userInfo } = storeToRefs(authStore);

    const getBooksList = async (): Promise<void> => {
        try {
            const response: AxiosResponse<any> = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=''`);
            removeItem("booksList");
            booksList.value = response.data.items.map(item => ({
                id: item.id,
                title: item.volumeInfo.title,
                description: item.volumeInfo.description,
                authors: item.volumeInfo.authors[item.volumeInfo.authors.length - 1] || 'Невідомий автор',
                publishedDate: item.volumeInfo.publishedDate || 'Невідомий рік',
                showDescription: false,
                authorRole: "admin"
            }));
            setItem("booksList", booksList.value);
        } catch (error) {
            console.error(error);
        }
    }
    const createBook = (values: Book): void => {
        isLoading.value = true;
        removeItem("booksList");
        values.id = crypto.randomUUID();
        values.authorId = userInfo.value.id;
        booksList.value.push(values);
        setItem("booksList", booksList.value);
        isLoading.value = false;
    }
    const updateBook = (values: Book): void => {
        isLoading.value = true;
        const bookIndex: number = booksList.value.findIndex(book => book.id === values.id);
        if (bookIndex != -1) {
            removeItem("booksList");
            booksList.value[bookIndex] = values;
            setItem("booksList", booksList.value);
        }
        isLoading.value = false;
    }

    const deleteBook = (id: string): void => {
        const bookIndex: number = booksList.value.findIndex(book => book.id === id);
        if (bookIndex != -1) {
            removeItem("booksList");
            booksList.value.splice(bookIndex, 1);
            setItem("booksList", booksList.value);
        }
    }

    return {
        isLoading,
        booksList,
        getBooksList,
        updateBook,
        createBook,
        deleteBook
    }
});
