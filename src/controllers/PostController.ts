import express from 'express'
import { Post } from '../entities/Post'
import { PostService } from '../services/PostService'
import ErrorMessages from '../utils/ErrorMessages'
import HttpStatusCode from '../utils/HttpStatusCode'
const postRoute = express.Router()

postRoute.get("/posts", async (req, res) => {
    const allPosts = await PostService.findAll()
    return res.status(HttpStatusCode.OK).send(allPosts);
})

postRoute.post("/posts/user/:id", async (req, res) => {
    const post: Post = req.body
    const createdPost = await PostService.save(post, req.params.id)
    if (createdPost === HttpStatusCode.NOT_FOUND)
        return res.status(HttpStatusCode.NOT_FOUND).send("Autor não encontrado!")
    return res.status(HttpStatusCode.CREATED).send(createdPost)
})

postRoute.delete("/posts/:id", async (req, res) => {
    const postToDelete = req.params.id
    const postDelete = await PostService.delete(postToDelete)
    if (postDelete === HttpStatusCode.INTERNAL_SERVER_ERROR)
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(ErrorMessages.INTERNAL_SERVER_ERROR)
    return res.status(HttpStatusCode.CREATED).send(postDelete)
})

postRoute.patch("/posts/:id", async (req, res) => {
    const post: Post = req.body
    const updatedPost = await PostService.update(req.params.id, post)
    if (updatedPost === HttpStatusCode.INTERNAL_SERVER_ERROR)
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(ErrorMessages.INTERNAL_SERVER_ERROR)
    return res.status(HttpStatusCode.CREATED).send(updatedPost)
})

export default postRoute