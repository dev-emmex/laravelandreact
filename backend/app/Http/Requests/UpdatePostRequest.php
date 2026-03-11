<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'status' => 'required|string|max:255|in:draft,published,archived',
            'content' => 'required|string',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'title.max' => 'The title must not exceed 255 characters.',
            'author.required' => 'The author field is required.',
            'author.max' => 'The author must not exceed 255 characters.',
            'category.required' => 'The category field is required.',
            'category.max' => 'The category must not exceed 255 characters.',
            'status.required' => 'The status field is required.',
            'status.in' => 'The status must be draft, published, or archived.',
            'content.required' => 'The content field is required.',
        ];
    }
}
