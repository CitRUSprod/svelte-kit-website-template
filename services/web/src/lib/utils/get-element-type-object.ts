import type { ElementBasicType, ElementType } from "$lib/types"

const basicTypes: Array<ElementBasicType> = ["success", "error", "warning", "info"]
const types: Array<ElementType> = ["default", "primary", ...basicTypes]

export function getElementBasicTypeObject(type: ElementBasicType) {
    const result = Object.fromEntries(basicTypes.map(t => [t, t === type]))
    return result as Record<ElementBasicType, boolean>
}

export function getElementTypeObject(type: ElementType) {
    const result = Object.fromEntries(types.map(t => [t, t === type]))
    return result as Record<ElementType, boolean>
}
