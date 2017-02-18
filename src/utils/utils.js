const ERROR_MARK = '[***]'
const REGEX_SAFE_ERROR_MARK = '\\[\\*\\*\\*\\]'

export function markErroredLines (text, erroredLinesList) {
    return text
        .split('\n')
        .map((line, i) => {
            if (erroredLinesList.includes(i))
                return `${line} ${ERROR_MARK}`

            return line
        })
        .join('\n')
}

export function stripErrorMarks (text) {
    const markRegex = new RegExp(` ${REGEX_SAFE_ERROR_MARK}`, 'g')
    return text.replace(markRegex, '')
}
