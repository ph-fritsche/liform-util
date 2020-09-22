const { getIndicesOfDescendant } = require('../../src/dom/indicesOfDescendant')

const container = document.createElement('div')
container.innerHTML = `
    <div id='a'>
        <div id='a-0'></div>
        <div id='a-1'>
            <div id='a-1-0'></div>
            <div id='a-1-1'></div>
        </div>
    </div>
`

it('Return indices', () => {
    expect(getIndicesOfDescendant(container, container.querySelector('#a-1-1'))).toEqual([0, 1, 1])
    expect(getIndicesOfDescendant(container.querySelector('#a-1'), container.querySelector('#a-1-1'))).toEqual([1])
})

it('Return undefined if element is not a descendant', () => {
    expect(getIndicesOfDescendant(container.querySelector('#a-0'), container.querySelector('#a-1-1'))).toEqual(undefined)
})
