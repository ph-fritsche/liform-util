export function render(html) {
    const container = document.createElement('div')

    document.body.append(container)

    container.innerHTML = html

    return {
        container,
        element: container.firstChild,
        elements: container.children,
    }
}
