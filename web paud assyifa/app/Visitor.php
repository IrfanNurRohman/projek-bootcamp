<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
  protected $fillable = [
    'ip_address', 'url', 'user_agent',
  ];

  protected $hidden = [
    'ip_address', 'url', 'user_agent',
  ];
}
