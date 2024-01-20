export function createElements(type, content, parent, attributes){
    let element = document.createElement(type);
    element.textContent = content;
    if(parent){
        parent.appendChild(element)
    }
    for (const attributes of Object.keys(attributes)) {
    element.setAttribute(attribute, attributes[attribute])
    }
    return element;
}