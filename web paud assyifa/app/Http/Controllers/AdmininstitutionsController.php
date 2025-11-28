<?php

namespace App\Http\Controllers;

use App\Institutions;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class AdmininstitutionsController extends Controller
{
  public function create(Request $request)
  {
    return view('admin.institutions.create');
  }

  public function store(Request $request)
  {
    $this->validate($request, [
      'name' => 'required|min:5|max:255',
			'desc' => 'required|min:5|max:255',
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408',
		]);

    $photo = $request->file('photo');
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'institutions';
    $photo->move($feed_upload, $file);

		Institutions::create([
      'name' => $request->name,
			'desc' => $request->desc,
      'photo' => $file,
		]);

    return redirect()->route('admin.institutions')->with(['success.up' => 'Sukses: '.$request->name.' Added']);
  }

  public function edit($id)
  {
    $institutions = Institutions::find($id);

    return view('admin.institutions.edit', compact('institutions'));
  }

  public function update(Request $request, $id)
  {
    //dd(1);
    $this->validate($request, [
      'name' => 'required|min:5|max:255',
			'desc' => 'required|min:5|max:255',
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408',
		]);

    $institutions = Institutions::findOrFail($id);

    $photo = $request->file('photo');
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'institutions';
    $photo->move($feed_upload, $file);

    $institutions->update([
      'name' => $request->name,
			'desc' => $request->desc,
      'photo' => $file,
    ]);

    return redirect()->route('admin.institutions')->with(['success.up' => 'Sukses: '.$request->name.' Added']);
  }

  public function delete($id)
  {
    $delete = Institutions::findOrFail($id);
  	$delete->delete();

  	return redirect()->back()->with(['success.down' => 'success.up: '.$delete->name.' Deleted!']);
  }
}
