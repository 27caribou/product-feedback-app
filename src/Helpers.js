
export function processText(text) {
    switch (text) {
        case "all":
            return "All"
        case "ui":
            return "UI"
        case "ux":
            return "UX"
        case "enhancement":
            return "Enhancement"
        case "bug":
            return "Bug"
        case "feature":
            return "Feature"
        case "planned":
            return "Planned"
        case "in-progress":
            return "In-Progress"
        case "live":
            return "Live"
        default:
            return "Not found"
    }
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