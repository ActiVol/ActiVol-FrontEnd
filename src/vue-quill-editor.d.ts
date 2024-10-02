// src/vue-quill-editor.d.ts

declare module 'vue-quill-editor' {
    import { Component } from 'vue'

    export const Quill: any
    export const quillEditor: Component
    export const QuillEditor: Component
    export const install: (app: any) => void

    export default {
        Quill,
        quillEditor,
        QuillEditor,
        install
    }
}