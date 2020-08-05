import { Paragraph } from '../store/types/paragraphTypes'

export function SortParagraphsByDate(array: Paragraph[]): Paragraph[]{
    return array.sort(function(a: Paragraph, b: Paragraph) {
      return compareDate(a.updated_at, b.updated_at)
    });
}

function compareDate(date1: Date, date2: Date){
    if(date1 > date2) {
        return -1;
    } else {
        return 1;
    }
}

export function ReplaceParagraphInArray(array: Paragraph[], p: Paragraph) {
    
    var index;
    for(var i = 0; i < array.length; i++) {
        if(array[i].id == p.id){
            index = i;
            break
        }
    }
    array.splice(index, 1, p)
}