import { JsonObject } from "type-fest"

interface ItemsData {
    totalItems: number
    items: Array<JsonObject>
}

export async function getItemsPage(
    page: number,
    perPage: number,
    getItemsData: (skip: number, take: number) => Promise<ItemsData>
) {
    const skip = perPage * (page - 1)
    const take = perPage

    const { totalItems, items } = await getItemsData(skip, take)

    const pages = Math.ceil(totalItems / perPage)

    return { page, pages, perPage, totalItems, items }
}
