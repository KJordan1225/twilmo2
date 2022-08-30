<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Traits\StripeHelperTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TransactionRequest extends FormRequest
{
    use StripeHelperTrait;

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => [
                'required',
                'email',
                'exists:App\Models\User,email',
                Rule::notIn([auth()->user()->email])
            ],
            'amount' => ['required','numeric']
        ];
    }

    public function messages()
    {
        return [
            'email.exists' => 'This user doesn\'t exist.',
            'email.not_in' => 'You can\'t send money to yourself.'
        ];
    }

    protected function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->lowBalance()){
                $validator->errors()->add(
                    'amount', 
                    'Your balance is too low to send this amount.'
                );
            }
        });
    }

    private function lowBalance()
    {
        $account = User::find(auth()->user()->id)->account;

        if (count($this->getPaymentMethods($account->customer_id)->data) > 0){
            return false;
        }
        else {
            return $account->balance < request('amount') ? true : false;
        }
    }
}
