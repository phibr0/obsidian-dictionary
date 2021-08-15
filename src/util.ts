export function copy(string: string): void {
    navigator.clipboard.writeText(string);
}