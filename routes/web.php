<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('ingredients','IngredientController@index');
Route::post('ingredient','IngredientController@store');
Route::patch('ingredient/{id}','IngredientController@update');
Route::delete('ingredient/{id}','IngredientController@destroy');
