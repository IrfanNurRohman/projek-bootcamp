<?php

namespace App\Http\Controllers;

use App\Blogs;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdminblogsController extends Controller
{
  public function create(Request $request)
  {
    return view('admin.ablogs.create');
  }

  public function store(Request $request)
  {
    $this->validate($request, [
			'title' => 'required|min:5|max:150',
      'category' => 'required|min:1|max:15',
      'content' => 'required|min:5',
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408',
		]);

    $photo = $request->file('photo');
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'blogs';
    $photo->move($feed_upload, $file);

		Blogs::create([
			'title' => $request->title,
      'category' => $request->category,
      'content' => $request->content,
      'photo' => $file,
		]);

    return redirect()->route('admin.blogs')->with(['success.up' => 'event: '.$request->title.' Added']);
  }

  public function edit($id)
  {
    $blogs = Blogs::find($id);

    return view('admin.ablogs.edit', compact('blogs'));
  }

  public function update(Request $request, $id)
  {
    //dd(1);
    $this->validate($request, [
      'title' => 'required|min:5|max:150',
      'category' => 'required|min:5|max:15',
      'content' => 'required|min:1',
      'photo' => 'image|mimes:jpeg,png,jpg,gif|max:5408',
    ]);

    $blogs = Blogs::findOrFail($id);

    $photo = $request->file('photo');
    // dd($photo->getClientOriginalName());
    if (!$photo) {
        abort(405);
    }
    $file = time()."_".$photo->getClientOriginalName();

    $feed_upload = 'blogs';
    $photo->move($feed_upload, $file);

    $event->update([
      'title' => $request->title,
      'category' => $request->category,
      'content' => $request->content,
      'photo' => $file,
    ]);

    return redirect()->route('admin.blogs')->with(['success.up' => 'event: '.$request->title.' Added']);
  }

  public function delete($id)
  {
    $delete = Blogs::findOrFail($id);
  	$delete->delete();

  	return redirect()->back()->with(['success.down' => 'success.up: '.$delete->title.' Deleted!']);
  }

}
