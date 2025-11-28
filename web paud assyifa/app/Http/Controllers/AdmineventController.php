<?php

namespace App\Http\Controllers;

use App\Events;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdmineventController extends Controller
{
  public function create(Request $request)
  {
    return view('admin.event.create');
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

    $feed_upload = 'events';
    $photo->move($feed_upload, $file);

		Events::create([
			'title' => $request->title,
      'desc' => $request->desc,
      'photo' => $file,
		]);

    return redirect()->route('admin.event')->with(['success.up' => 'event: '.$request->title.' Added']);
  }

  public function edit($id)
  {
    $event = Events::find($id);

    return view('admin.event.edit', compact('event'));
  }

  public function update(Request $request, $id)
  {
    //dd(1);
    $this->validate($request, [
			'title' => 'required|min:5|max:150',
      'desc' => 'required|min:5|max:255',
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408',
		]);

    $event = Events::findOrFail($id);

    $photo = $request->file('photo');
    // dd($photo->getClientOriginalName());
    if (!$photo) {
        abort(405);
    }
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'events';
    $photo->move($feed_upload, $file);

    $event->update([
      'title' => $request->title,
      'desc' => $request->desc,
      'photo' => $file,
    ]);

    return redirect()->route('admin.event')->with(['success.up' => 'event: '.$request->title.' Added']);
  }

  public function delete($id)
  {
    $delete = Events::findOrFail($id);
  	$delete->delete();

  	return redirect()->back()->with(['success.down' => 'success.up: '.$delete->title.' Deleted!']);
  }

}
