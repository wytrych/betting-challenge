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

export function addSpareLines (input) {
    const lines = input.slice()

    if (lines.length === 3)
        return lines

    lines.push('\u00a0')
    lines.unshift('\u00a0')

    return lines
}

export function limit (input, min, max) {
    return Math.min(Math.max(input, min), max)
}
