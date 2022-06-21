import { DateTime } from "luxon"
import { browser } from "$app/env"

export function getFullDateAndTime(date: string) {
    return browser ? DateTime.fromISO(date).toFormat("yyyy-MM-dd HH:mm") : ""
}

export function getFullDate(date: string) {
    return browser ? DateTime.fromISO(date).toFormat("LLLL d, yyyy") : ""
}
