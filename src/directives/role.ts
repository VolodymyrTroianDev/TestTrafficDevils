import { PermissionEnum } from "@/enums/PermissionsEnum";
export default {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const authStore = useAuthStore();
        const { userInfo } = storeToRefs(authStore);

        const { allowedRoles, role, book } = binding.value;

        const updateVisibility = () => {
            const userRole = userInfo.value.role;
            const userId = userInfo.value.id;

            const roleAllowed = allowedRoles.includes(userRole);
            const conditionMet =
                (userRole === PermissionEnum.MENTOR && (role === PermissionEnum.USER || role === PermissionEnum.MENTOR)) ||
                (userRole === PermissionEnum.USER && role === PermissionEnum.USER && (!book || book.authorId === userId) ||
                userRole === PermissionEnum.ADMIN);

            if (!roleAllowed || !conditionMet) {
                el.style.display = 'none';
            } else {
                el.style.display = '';
            }
        };

        watchEffect(() => {
            updateVisibility();
        });

        watch(userInfo, () => {
            updateVisibility();
        });
    }
};
