<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Teachers extends Model
{
  protected $fillable = [
      'name', 'course', 'facebook', 'instagram', 'twitter', 'email', 'linkedin', 'youtube', 'photo',
  ];
}
