<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class SummernoteController extends Controller
{
    public function store(Request $request)
    {
    	$validation = $request->validate([
			'file' => 'image|mimes:jpeg,png,jpg|max:2048',
		]);
		if($request->hasFile('file')){
            $file = time().'.'.$request->file->extension();
            $request->file->move(public_path('images/content'), $file);
            echo url('images/content/'.$file);
        }
    }

    public function destroy(Request $request)
    {
    	$src = $request->src;
        $name = explode("/", $src);
        $file = end($name);

        if(unlink('/images/content/'.$file)){
	        echo $src;
	    }
    }
}
