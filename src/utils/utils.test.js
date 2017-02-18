import { markErroredLines, stripErrorMarks } from './utils'

describe('markErroredLines', () => {
    
    it('should take a text and line numbers and return the text with marked lines', () => {
        const inputText = 'Line 0\n' +
            'Line 1\n' +
            'Line 2'

        const erroredLines = [0, 2]

        const outputText = 'Line 0 [***]\n' +
            'Line 1\n' +
            'Line 2 [***]'

        expect(markErroredLines(inputText, erroredLines)).toBe(outputText)
    })
    
})

describe('stripErrorMarks', () => {
    
    it('should remove the error marks', () => {
        const inputText = 'Line 0 [***]\n' +
            'Line 1\n' +
            'Line 2 [***]'

        const outputText = 'Line 0\n' +
            'Line 1\n' +
            'Line 2'

        expect(stripErrorMarks(inputText)).toBe(outputText)
    })
    
})

