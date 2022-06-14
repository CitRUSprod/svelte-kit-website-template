import { derived } from "svelte/store"
import { writable } from "svelte-local-storage-store"

interface Post {
    id: number
    title: string
    content: string
}

type Posts = Array<Readonly<Post>>

const writablePosts = writable<Array<Post>>("posts", [])
const { subscribe } = derived(writablePosts, l => l as Readonly<Posts>)

const { update } = writablePosts

function add(title: string, content: string) {
    update(posts => {
        const post: Post = {
            id: Date.now(),
            title: title.trim(),
            content: content.trim()
        }
        posts.push(post)

        return posts
    })
}

function edit(id: number, title: string, content: string) {
    update(posts => {
        const post = posts.find(p => p.id === id)

        if (post) {
            post.title = title
            post.content = content
        }

        return posts
    })
}

function remove(id: number) {
    update(posts => {
        const index = posts.findIndex(p => p.id === id)
        if (index >= 0) posts.splice(index, 1)
        return posts
    })
}

export const posts = { subscribe, add, edit, remove }
