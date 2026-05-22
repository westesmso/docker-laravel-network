<?php

use App\Http\Controllers\ToyController;
use Illuminate\Support\Facades\Route;

Route::get('/toys', [ToyController::class, 'index']);

Route::middleware('toy.auth')->group(function (): void {
	Route::post('/toys', [ToyController::class, 'store']);
	Route::delete('/toys/{toy}', [ToyController::class, 'destroy']);
});
