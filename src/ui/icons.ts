import { addIcon } from 'obsidian';

export const icons: Record<string, string> = {
    copy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" fill-opacity="0.0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    synonyms: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" fill-opacity="0.0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
};

export const addIcons = (): void => {
    Object.keys(icons).forEach((key) => {
        addIcon(key, icons[key]);
    });
};
