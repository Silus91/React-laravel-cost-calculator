<?php

namespace App\Http\Controllers;

use App\Component;
use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Product $product, Component $component)
    {
        $product= Product::with('components')->get();
        return $product;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Component $component)
    {
        $product = new Product([
            'productName' => $request->get('productName'),
        ]);

        $product->save();

        $product->components()->createMany($request->get('components'));

        return $product->load('components');
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return 204;
    }
}
