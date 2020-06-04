export interface Paragraph {
    id: BigInt,
    content: string, 
    note: string,
    tags: ParagraphTag[]
}

interface ParagraphTag {
    id: BigInt,
    name: string
}

export interface ParagraphInputModel {
    content: string,
    note: string,
    tagIds: BigInt[]
}

export interface ParagraphState {
    data: Paragraph[]
}

export const GET_PARAGRAPHS = "GET_PARAGRAPHS"

interface GetParagraphsAction {
    type: typeof GET_PARAGRAPHS,
    payload: Paragraph[]
}

export const ADD_PARAGRAPH = "ADD_PARAGRAPH"

interface AddParagraphAction {
    type: typeof ADD_PARAGRAPH,
    payload: Paragraph
}

export type ParagraphActionTypes = GetParagraphsAction | AddParagraphAction