
// This is a capitalize function mostly relevant to this project, as it considers extra cases only relevant here
export function capitalize(word) {
    if ( word.length == 2 ){
        return word.toUpperCase()
    }
    if ( word.includes("-") ){
        return word.split("-").map( subtext => subtext[0].toUpperCase() + subtext.slice(1).toLowerCase() ).join("-")
    }

    return word[0].toUpperCase() + word.slice(1).toLowerCase() // Normal base case
}

export function countComments(item) {
    if ( item.comments == null )
        return 0

    let count = 0
    item.comments.forEach( comment => {
        count += 1

        if ( comment.replies != null ){
            count += comment.replies.length
        }
    })

    return count
}