<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('ingredients','IngredientController@index');
Route::post('ingredient','IngredientController@store');
Route::patch('ingredient/{id}','IngredientController@update');
Route::delete('ingredient/{id}','IngredientController@destroy');


Route::get('products','ProductController@index');
Route::post('product','ProductController@store');
Route::delete('product/{id}','ProductController@destroy');


// Route::get('product/{id}/components','ComponentController@index');
// Route::post('product/{id}/component','ComponentController@store');



