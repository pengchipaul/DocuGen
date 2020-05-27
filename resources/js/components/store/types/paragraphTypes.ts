export interface Paragraph {
    id: BigInt,
    content: String, 
    note: String,
    tags: ParagraphTag[]
}

interface ParagraphTag {
    id: BigInt,
    name: String
}

export interface ParagraphState {
    paragraphs: Paragraph[]
}

export const GET_PARAGRAPHS = "GET_PARAGRAPHS"

interface GetParagraphsAction {
    type: typeof GET_PARAGRAPHS,
    payload: Paragraph[]
}

export type ParagraphActionTypes = GetParagraphsAction