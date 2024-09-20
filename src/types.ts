// types.ts
export interface BreadcrumbItem {
    label: string;
    path: string;
}

export interface ListBoxItem {
    icon: string;
    title: string;
    content: string;
    path: string;
    color: string;
}

export namespace LanguageTypes {
    export interface Option {
        code: string;
        name: string;
    }
}

export interface ActivityType {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    volunteersNeeded: number;
    duration: number;
    status: 'open' | 'full' | 'closed';
    posterUrl?: string;
    gradientColor?: string;
}

export interface User {
    id: number;
    username: string;
    uid: string;
    first_name: string;
    last_name: string;
    graduation_year: number;
    interior_email: string;
    exterior_email: string;
    isAdmin: number;
    latest_ip: string;
    device_UA: string;
    device_lang: string;
    device_screen_size: string;
    created_at: string;
    updated_at: string;
}