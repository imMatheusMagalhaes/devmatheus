import { Post } from "../entities/Post"
import HttpStatusCode from "../utils/HttpStatusCode"
import { UserService } from "./UserService"

export class PostService {

    public static async findAll(): Promise<Post[]> {
        const allPosts = await Post.find()
        return allPosts
    }

    public static async findOne(): Promise<any> {
        const post = await Post.findOne()
        if (post)
            return post
        return Promise.reject().catch(() => HttpStatusCode.NOT_FOUND)
    }

    public static async save(postToSave: Post, idUser: string): Promise<any> {
        const author = await UserService.findOne(idUser)
        if (author === HttpStatusCode.NOT_FOUND)
            return Promise.reject().catch(() => HttpStatusCode.NOT_FOUND)
        const post = new Post()
        post.titulo = postToSave.titulo
        post.resumo = postToSave.resumo
        post.conteudo = postToSave.conteudo
        post.user = author
        const createdPost = await post.save()
        return createdPost

    }
    public static async delete(id: string): Promise<any> {
        const deletePost = await Post.delete(id)
        if (deletePost)
            return deletePost
        return Promise.reject().catch(() => HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
    public static async update(id: string, post: Post): Promise<any> {
        const updatedPost = await Post.update(id, post)
        if (updatedPost)
            return updatedPost
        return Promise.reject().catch(() => HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
}
