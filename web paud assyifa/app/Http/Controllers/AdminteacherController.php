<?php

namespace App\Http\Controllers;

use App\Teachers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdminteacherController extends Controller
{
  public function create(Request $request)
  {
    return view('admin.teacher.create');
  }

  public function store(Request $request)
  {
    $this->validate($request, [
	  'name' => 'required|min:5|max:150',
      'course' => 'required|min:1|max:150',
      'facebook' => 'max:255',
      'instagram' => 'max:255',
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408|nullable',
	]);

    $photo = $request->file('photo');
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'teachers';
    $photo->move($feed_upload, $file);

	Teachers::create([
	  'name' => $request->name,
      'course' => $request->course,
      'facebook' => $request->facebook,
      'instagram' => $request->instagram,
      'twitter' => $request->twitter,
      'email' => $request->email,
      'linkedin' => $request->linkedin,
      'youtube' => $request->youtube,
      'photo' => $file,
	]);

    return redirect()->route('admin.teacher')->with(['success.up' => 'Principals: '.$request->name.' Added']);
  }

  public function edit($id)
  {
    $teacher = Teachers::find($id);

    return view('admin.teacher.edit', compact('teacher'));
  }

  public function update(Request $request, $id)
  {
    //dd(1);
    $this->validate($request, [
      'name' => 'required|min:5|max:150',
      'course' => 'required|min:1|max:150',
      'facebook' => 'max:255',
      'instagram' => 'max:255',
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408|nullable',
	]);

    $teacher = Teachers::findOrFail($id);

    $photo = $request->file('photo');
    // dd($photo->getClientOriginalName());
    if (!$photo) {
        abort(405);
    }
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'teachers';
    $photo->move($feed_upload, $file);

    $teacher->update([
      'name' => $request->name,
      'course' => $request->course,
      'facebook' => $request->facebook,
      'instagram' => $request->instagram,
      'twitter' => $request->twitter,
      'email' => $request->email,
      'linkedin' => $request->linkedin,
      'youtube' => $request->youtube,
      'photo' => $file,
    ]);

    return redirect()->route('admin.teacher')->with(['success.up' => 'Principals: '.$request->name.' Added']);
  }

  public function delete($id)
  {
    $delete = Teachers::findOrFail($id);
  	$delete->delete();

  	return redirect()->back()->with(['success.down' => 'success.up: '.$delete->name.' Deleted!']);
  }
}
