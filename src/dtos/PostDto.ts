import FormData from "form-data"

export type PostDto = {
    file: FormData
    titulo: string
    conteudo: string
}