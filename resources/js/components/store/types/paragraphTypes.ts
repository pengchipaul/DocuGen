export interface Paragraph {
    id: BigInt,
    content: string, 
    note: String,
    tags: ParagraphTag[]
}

interface ParagraphTag {
    id: BigInt,
    name: string
}

export interface ParagraphState {
    data: Paragraph[]
}

export const GET_PARAGRAPHS = "GET_PARAGRAPHS"

interface GetParagraphsAction {
    type: typeof GET_PARAGRAPHS,
    payload: Paragraph[]
}

export type ParagraphActionTypes = GetParagraphsAction