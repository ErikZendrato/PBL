<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('pengguna', App\Http\Controllers\Api\penggunaController::class);
