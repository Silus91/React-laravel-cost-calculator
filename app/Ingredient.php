<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $ingredientCost
 * @property int $ingredientWeight
 */
class Ingredient extends Model
{
    protected $guarded = [];

    public function getRatio(): float
    {
        return $this->ingredientCost / $this->ingredientWeight;
    }
}
