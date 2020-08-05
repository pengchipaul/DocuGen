export interface Paragraph {
    id: BigInt,
    content: string,
    note: string,
    tags: ParagraphTag[],
    updated_at: Date
}

interface ParagraphTag {
    id: BigInt,
    name: string
}

export interface ParagraphInputModel {
    id: BigInt,
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

export const UPDATE_PARAGRAPH = "UPDATE_PARAGRAPH"

interface UpdateParagraphAction {
    type: typeof UPDATE_PARAGRAPH,
    payload: Paragraph
}

export const DELETE_PARAGRAPH = "DELETE_PARAGRAPH"

interface DeleteParagraphAction {
    type: typeof DELETE_PARAGRAPH,
    payload: BigInt
}

export const ADD_TAG_TO_PARAGRAPH = "ADD_TAG_TO_PARAGRAPH"

interface AddTagToParagraph {
    type: typeof ADD_TAG_TO_PARAGRAPH,
    payload: Paragraph
}

export const REMOVE_TAG_FROM_PARAGRAPH = "REMOVE_TAG_FROM_PARAGRAPH"

interface RemoveTagFromParagraph {
    type: typeof REMOVE_TAG_FROM_PARAGRAPH,
    payload: Paragraph
}

export type ParagraphActionTypes = GetParagraphsAction | AddParagraphAction
    | UpdateParagraphAction | DeleteParagraphAction | AddTagToParagraph 
    | RemoveTagFromParagraph
