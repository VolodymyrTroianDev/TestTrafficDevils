import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { storeToRefs } from "pinia";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        components: {
            header: import("../components/Header.vue"),
            default: () => import("../views/Home.vue"),
            footer: () => import("../components/Footer.vue"),
        }
    },
    {
        path: "/login",
        name: "Login",
        components: {
            header: import("../components/Header.vue"),
            default: () => import("../views/login/LoginForm.vue"),
            footer: () => import("../components/Footer.vue"),
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
                    header: import("../components/Header.vue"),
                    default: () => import("../views/manage-users/UsersPage.vue"),
                    footer: () => import("../components/Footer.vue"),
                },
            },
            {
                path: "/users/create",
                name: "CreateUsers",
                components: {
                    header: import("../components/Header.vue"),
                    default: () => import("../views/manage-users/UserForm.vue"),
                    footer: () => import("../components/Footer.vue"),
                },
            },
            {
                path: "/users/edit/:id",
                name: "EditUsers",
                components: {
                    header: import("../components/Header.vue"),
                    default: () => import("../views/manage-users/UserForm.vue"),
                    footer: () => import("../components/Footer.vue"),
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
                    header: import("../components/Header.vue"),
                    default: () => import("../views/manage-books/BooksPage.vue"),
                    footer: () => import("../components/Footer.vue"),
                },
            },
            {
                path: "/books/create",
                name: "CreateBooks",
                components: {
                    header: import("../components/Header.vue"),
                    default: () => import("../views/manage-books/BookForm.vue"),
                    footer: () => import("../components/Footer.vue"),
                },
            },
            {
                path: "/books/edit/:id",
                name: "EditBooks",
                components: {
                    header: import("../components/Header.vue"),
                    default: () => import("../views/manage-books/BookForm.vue"),
                    footer: () => import("../components/Footer.vue"),
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
