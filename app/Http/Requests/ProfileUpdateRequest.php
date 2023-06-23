<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255'],
            'bio' => ['string','nullable'],
            'username' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9._]+$/',
                'unique:users',
                Rule::notIn($this->reservedUsernames()),
            ],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'file'=>['mimes:jpg,bmp,png','nullable'],
        ];
    }
}
