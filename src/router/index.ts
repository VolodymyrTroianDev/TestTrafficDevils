import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Home from "../views/Home.vue";
import LoginForm from "../views/login/LoginForm.vue";
import UsersPage from "../views/manage-users/UsersPage.vue";
import UserForm from "../views/manage-users/UserForm.vue";
import BookForm from "../views/manage-books/BookForm.vue";
import BooksPage from "../views/manage-books/BooksPage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        components: {
            header: Header,
            default: Home,
            footer: Footer,
        }
    },
    {
        path: "/login",
        name: "Login",
        components: {
            header: Header,
            default: LoginForm,
            footer: Footer
        }
    },
    {
        path: "/users",
        name: "Users",
        children: [
            {
                path: "/users",
                name: "Users",
                components: {
                    header: Header,
                    default: UsersPage,
                    footer: Footer,
                },
            },
            {
                path: "/users/create",
                name: "CreateUsers",
                components: {
                    header: Header,
                    default: UserForm,
                    footer: Footer,
                },
            },
            {
                path: "/users/edit/:id",
                name: "EditUsers",
                components: {
                    header: Header,
                    default: UserForm,
                    footer: Footer,
                },
            }
        ]
    },
    {
        path: "/books",
        name: "Books",
        children: [
            {
                path: "/books",
                name: "Books",
                components: {
                    header: Header,
                    default: BooksPage,
                    footer: Footer,
                },
            },
            {
                path: "/books/create",
                name: "CreateBooks",
                components: {
                    header: Header,
                    default: BookForm,
                    footer: Footer,
                },
            },
            {
                path: "/books/edit/:id",
                name: "EditBooks",
                components: {
                    header: Header,
                    default: BookForm,
                    footer: Footer,
                },
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
