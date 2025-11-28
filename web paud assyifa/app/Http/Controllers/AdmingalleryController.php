<?php

namespace App\Http\Controllers;

use App\Gallerys;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdmingalleryController extends Controller
{
  public function create(Request $request)
  {
    return view('admin.galerys.create');
  }

  public function store(Request $request)
  {
    $this->validate($request, [
			'title' => 'required|min:5|max:150',
      'desc' => 'required|min:5|max:255',
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408',
		]);

    $photo = $request->file('photo');
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'gallerys';
    $photo->move($feed_upload, $file);

		Gallerys::create([
			'title' => $request->title,
      'desc' => $request->desc,
      'photo' => $file,
		]);

    return redirect()->route('admin.galery')->with(['success.up' => 'event: '.$request->title.' Added']);
  }

  public function edit($id)
  {
    $gallerys = Gallerys::find($id);

    return view('admin.galerys.edit', compact('gallerys'));
  }

  public function update(Request $request, $id)
  {
    //dd(1);
    $this->validate($request, [
			'title' => 'required|min:5|max:150',
      'desc' => 'required|min:5|max:255',
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408',
		]);

    $gallerys = Gallerys::findOrFail($id);

    $photo = $request->file('photo');
    // dd($photo->getClientOriginalName());
    if (!$photo) {
        abort(405);
    }
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'gallerys';
    $photo->move($feed_upload, $file);

    $gallerys->update([
      'title' => $request->title,
      'desc' => $request->desc,
      'photo' => $file,
    ]);

    return redirect()->route('admin.galery')->with(['success.up' => 'event: '.$request->title.' Added']);
  }

  public function delete($id)
  {
    $delete = Gallerys::findOrFail($id);
  	$delete->delete();

  	return redirect()->back()->with(['success.down' => 'success.up: '.$delete->title.' Deleted!']);
  }

}
