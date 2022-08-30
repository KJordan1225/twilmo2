<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class RegisterRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'address1' => 'required|string',
            'address2' => 'nullable|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip' => 'required|numeric|digits:5'
        ];
    }
}
