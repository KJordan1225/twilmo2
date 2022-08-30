<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\TransactionRequest;
use App\Traits\StripeHelperTrait;


class TransactionController extends Controller
{
  
    use StripeHelperTrait;
  
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TransactionRequest $request)
    {
        $validated = $request->validated();

        $user_from = User::find(auth()->user()->id);
        $user_to = User::firstWhere('email', $validated['email']);

        // If the balance is low, use a card. Otherwise, use balance
        if ($user_from->account->balance < $validated['amount']){
            $this->useCard($user_from->account->customer_id, $validated['amount']);
            $balance_from = $user_from->account->balance;
        }
        else {
            $balance_from = $user_from->account->balance - $validated['amount'];
        }

        Transaction::create([
            'user_from' => auth()->user()->id,
            'user_to' => $user_to->id,
            'amount' => $validated['amount']
        ]);

        // Update balances
        $user_from->account->balance = $balance_from;
        $user_to->account->balance = $user_to->account->balance + $validated['amount'];

        if ($user_from->push() && $user_to->push()){
            return redirect()->back();
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
