// src/vue-i18n.d.ts
import 'vue-i18n';

declare module 'vue-i18n' {
    export function useI18n(): {
        t: (key: string, ...args: any[]) => string;
        locale: { value: string }; // 明确 locale 的类型
    };
}