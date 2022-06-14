import type { ParamMatcher } from "@sveltejs/kit"

export const match: ParamMatcher = param => !!/^\d+$/.exec(param)
