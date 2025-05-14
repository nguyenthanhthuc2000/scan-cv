import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface PageProps {
    auth: {
        user: User;
    };
}

export interface Education {
    school: string;
    degree: string;
    graduation_year: number;
    gpa: number;
}

export interface Experience {
    company: string;
    position: string;
    duration: string;
}

export interface Resume {
    id: number;
    user_id: number;
    title: string;
    file_path: string;
    file_name: string;
    mime_type: string;
    file_size: number;
    status: 'pending' | 'reviewing' | 'approved' | 'rejected';
    skills: string | null;
    education: Education | string | null;
    experience: Experience[] | string | null;
    summary: string | null;
    rejection_reason: string | null;
    ai_overall_score: number | null;
    ai_category_scores: Record<string, number> | null;
    ai_feedback: {
        strengths: string[];
        weaknesses: string[];
        suggestions: string[];
    } | null;
    ai_scored_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    status_badge: string;
    formatted_file_size: string;
    user?: User;
}
