<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Principals extends Model
{
  protected $fillable = [
    'name', 'desc', 'photo',
  ];
}
