import fs from "fs";
import { Post } from "../entities/Post";
import HttpStatusCode from "../utils/HttpStatusCode";
import { UserService } from "./UserService";
import { v4 as uuidv4 } from "uuid";
import { PostDto } from "../dtos/PostDto";
import { title } from "process";
export class PostService {
  public static async findAll(): Promise<Post[]> {
    const allPosts = await Post.find();
    return allPosts;
  }

  public static async findById(id: string): Promise<any> {
    const post = await Post.findOne(id);
    if (post) return post;
    return Promise.reject().catch(() => HttpStatusCode.NOT_FOUND);
  }

  public static async save(postToSave: PostDto, idUser: string): Promise<any> {
    const opts = {
      level: 1,
      excerpt: 2,
    };
    const md = require("markdown-it")().use(require("markdown-it-title"), opts);
    const env = {
      title: "",
      excerpt: "",
    };
    md.render(postToSave.post.toString(), env);
    const author = await UserService.findOne(idUser);
    if (author === HttpStatusCode.NOT_FOUND)
      return Promise.reject().catch(() => HttpStatusCode.NOT_FOUND);
    const path = `./uploads/${uuidv4()}.md`;
    const post = new Post();
    fs.writeFile(path, postToSave.post, (error) => console.log(error));
    post.user = author;
    post.path = path;
    post.titulo = env.title;
    const createdPost = await post.save();
    return createdPost;
  }
  public static async delete(id: string): Promise<any> {
    const deletePost = await Post.delete(id);
    if (deletePost) return deletePost;
    return Promise.reject().catch(() => HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
  public static async update(id: string, post: Post): Promise<any> {
    const updatedPost = await Post.update(id, post);
    if (updatedPost) return updatedPost;
    return Promise.reject().catch(() => HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
  public static async downloadPost(id: string): Promise<any> {
    const post = await Post.findOne(id);
    if (post) return post;
    return Promise.reject().catch(() => HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
}
