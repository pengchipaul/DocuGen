import { AnyAction } from 'redux';

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