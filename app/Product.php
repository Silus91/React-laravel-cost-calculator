<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];

     public function components()
     {
         return $this->hasMany(\App\Component::class);
     }
}
