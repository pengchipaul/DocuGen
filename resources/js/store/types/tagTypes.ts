export interface Tag {
    id: BigInt, 
    name: String,
    paragraphs: TagParagraph[]
}

interface TagParagraph {
    id: BigInt,
    content: String,
    note: String,
}

export interface TagInputModel {
    name: string
}

export interface TagState {
    data: Tag[]
}

export const GET_TAGS = "GET_TAGS"

interface GetTagsAction {
    type: typeof GET_TAGS,
    payload: Tag[]
}

export const ADD_TAG = "ADD_TAG"

interface AddTagAction {
    type: typeof ADD_TAG,
    payload: Tag
}

export type TagActionTypes = GetTagsAction | AddTagAction