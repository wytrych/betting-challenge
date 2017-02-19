import { markErroredLines, stripErrorMarks, addSpareLines, limit } from './utils'

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

describe('addSpareLines', () => {
    
    it('should surround one line with blanks so it has three lines', () => {
        const input = ['One line']
        const output = ['\u00a0', 'One line', '\u00a0']

        expect(addSpareLines(input)).toEqual(output)
    })
    
    it('should not change a three line input', () => {
        const input = ['One line', 'Second line', 'Third line']

        expect(addSpareLines(input)).toEqual(input)
    })
    
    it('should not mutate the input array', () => {
        const input = ['a']
        const inputCopy = ['a']

        addSpareLines(input)

        expect(input).toEqual(inputCopy)
    })
    
})

describe('limit', () => {
    
    it('should limit a number according to the passed in arguments', () => {
        expect(limit(-1, 0, 100)).toBe(0)
        expect(limit(199, 0, 50)).toBe(50)
        expect(limit(10, 0, 10)).toBe(10)
    })

})

