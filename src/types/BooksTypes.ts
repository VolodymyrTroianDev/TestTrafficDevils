export interface Book {
    id: string;
    title: string;
    description: string;
    authors: string;
    publishedDate: string;
    showDescription: boolean;
    authorId?: string;
}
