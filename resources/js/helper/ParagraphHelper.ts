import { Paragraph } from '../store/types/paragraphTypes'

const ASCENDING: number = 1
const DESCENDING: number = -1

export function SortParagraphsByUpdatedDate(array: Paragraph[], order: number): Paragraph[] {

  if (order == DESCENDING) {
    return array.sort(function (a: Paragraph, b: Paragraph) {
      return compareDate(a.updated_at, b.updated_at)
    });
  }
  if (order == ASCENDING) {
    return array.sort(function (a: Paragraph, b: Paragraph) {
      return compareDate(a.updated_at, b.updated_at) * -1
    });
  }

}

export function SortParagraphsByCreatedDate(array: Paragraph[], order: number): Paragraph[] {
  
  if (order == DESCENDING) {
    return array.sort(function (a: Paragraph, b: Paragraph) {
      return compareDate(a.created_at, b.created_at)
    });
  }
  if (order == ASCENDING) {
    return array.sort(function (a: Paragraph, b: Paragraph) {
      return compareDate(b.created_at, a.created_at)
    });
  }

}

function compareDate(date1: Date, date2: Date) {
  if (date1 > date2) {
    return -1;
  } else {
    return 1;
  }
}

export function ReplaceParagraphInArray(array: Paragraph[], p: Paragraph) {

  var index;
  for (var i = 0; i < array.length; i++) {
    if (array[i].id == p.id) {
      index = i;
      break
    }
  }
  array.splice(index, 1, p)
}