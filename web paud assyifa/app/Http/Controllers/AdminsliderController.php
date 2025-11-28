<?php

namespace App\Http\Controllers;

use App\Sliders;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdminsliderController extends Controller
{
  public function create(Request $request)
  {
    return view('admin.aslider.create');
  }

  public function store(Request $request)
  {
    $this->validate($request, [
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408',
		]);

    $photo = $request->file('photo');
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'sliders';
    $photo->move($feed_upload, $file);

		Sliders::create([
      'photo' => $file,
		]);

    return redirect()->route('admin.slider')->with(['success.up' => 'event: '.$request->title.' Added']);
  }

  public function delete($id)
  {
    $delete = Sliders::findOrFail($id);
  	$delete->delete();

  	return redirect()->back()->with(['success.down' => 'success.up: '.$delete->title.' Deleted!']);
  }

}
