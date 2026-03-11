<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    // Get all posts
    public function index(Request $request)
    {
        $posts = Post::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $posts
        ]);
    }

    // Get single post
    public function show(Request $request, $id)
    {
        $post = Post::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$post) {
            return response()->json([
                'message' => 'Post not found'
            ], 404);
        }

        return response()->json([
            'data' => $post
        ]);
    }

    // Create new post
    public function createnewpost(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255|in:technology,health,travel,food,lifestyle,business',
            'status' => 'required|string|max:255|in:published,draft,archived',
            'content' => 'required|string|min:50|max:5000',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors()->first()
            ], 422);
        }

        // ✅ Add user_id to the post
        $post = Post::create(array_merge($validate->validated(), [
            'user_id' => $request->user()->id
        ]));

        return response()->json([
            'message' => 'Post created successfully',
            'data' => $post
        ], 201);
    }

    // Update post
    public function update(Request $request, $id)
    {
        // ✅ Check ownership
        $post = Post::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$post) {
            return response()->json([
                'message' => 'Post not found or unauthorized'
            ], 404);
        }

        $validate = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255|in:technology,health,travel,food,lifestyle,business',
            'status' => 'required|string|max:255|in:published,draft,archived',
            'content' => 'required|string|min:50|max:5000',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors()->first()
            ], 422);
        }

        $post->update($validate->validated());

        return response()->json([
            'message' => 'Post updated successfully',
            'data' => $post
        ]);
    }

    // Delete post
    public function destroy(Request $request, $id)
    {
        // ✅ Check ownership
        $post = Post::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$post) {
            return response()->json([
                'message' => 'Post not found or unauthorized'
            ], 404);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ]);
    }
}