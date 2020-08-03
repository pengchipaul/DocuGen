export default function CopyToClipboard(str: string) {
    var content = document.createElement("input")
    content.value = str
    document.body.appendChild(content)
    content.select()
    document.execCommand("copy")
    document.body.removeChild(content)
}