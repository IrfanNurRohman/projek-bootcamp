<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallerys extends Model
{
  protected $fillable = [
    'title', 'desc', 'photo',
  ];
}
