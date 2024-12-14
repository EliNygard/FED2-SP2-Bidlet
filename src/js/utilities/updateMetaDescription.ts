export function updateMetaDescription(content: string) {
    let metaTag = document.querySelector('meta[name="description"]') as HTMLMetaElement
    if (!metaTag) {
        metaTag = document.createElement("meta") as HTMLMetaElement
        metaTag.name = "description"
        document.head.appendChild(metaTag)
    }
    metaTag.content = content
} 