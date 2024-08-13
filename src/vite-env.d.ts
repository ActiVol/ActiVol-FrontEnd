/// <reference types="vite/client" />
declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>
    export default component
}

declare module "*.svg" {
    const content: string;
    export default content;
}