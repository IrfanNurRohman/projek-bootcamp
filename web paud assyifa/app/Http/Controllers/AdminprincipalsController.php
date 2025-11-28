<?php

namespace App\Http\Controllers;

use App\Principals;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdminprincipalsController extends Controller
{
  public function create(Request $request)
  {
    return view('admin.principal.create');
  }

  public function store(Request $request)
  {
    $this->validate($request, [
			'name' => 'required|min:5|max:150',
      'desc' => 'required|min:5|max:255',
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408',
		]);

    $photo = $request->file('photo');
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'principal';
    $photo->move($feed_upload, $file);

		Principals::create([
			'name' => $request->name,
      'desc' => $request->desc,
      'photo' => $file,
		]);

    return redirect()->route('admin.principal')->with(['success.up' => 'Principals: '.$request->name.' Added']);
  }

  public function edit($id)
  {
    $principal = Principals::find($id);

    return view('admin.principal.edit', compact('principal'));
  }

  public function update(Request $request, $id)
  {
    //dd(1);
    $this->validate($request, [
			'name' => 'required|min:5|max:150',
      'desc' => 'required|min:5|max:255',
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408',
		]);

    $principal = Principals::findOrFail($id);

    $photo = $request->file('photo');
    // dd($photo->getClientOriginalName());
    if (!$photo) {
        abort(405);
    }
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'principal';
    $photo->move($feed_upload, $file);

    $principal->update([
      'name' => $request->name,
      'desc' => $request->desc,
      'photo' => $file,
    ]);

    return redirect()->route('admin.principal')->with(['success.up' => 'Principals: '.$request->name.' Added']);
  }

  public function delete($id)
  {
    $delete = Principals::findOrFail($id);
  	$delete->delete();

  	return redirect()->back()->with(['success.down' => 'success.up: '.$delete->name.' Deleted!']);
  }

}
