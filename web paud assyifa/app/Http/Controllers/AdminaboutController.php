<?php

namespace App\Http\Controllers;

use App\Abouts;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdminaboutController extends Controller
{
  public function create(Request $request)
  {
    return view('admin.about.create');
  }

  public function store(Request $request)
  {
    $this->validate($request, [
			'desc' => 'required|min:5|max:255',
		]);

		Abouts::create([
			'desc' => $request->desc,
		]);

    return redirect()->route('admin.about')->with(['success.up' => 'Sukses: '.$request->desc.' Added']);
  }

  public function edit($id)
  {
    $about = Abouts::find($id);

    return view('admin.about.edit', compact('about'));
  }

  public function update(Request $request, $id)
  {
    //dd(1);
    $this->validate($request, [
      'desc' => 'required|min:5|max:255',
    ]);

    $about = Abouts::findOrFail($id);

    $about->update([
      'desc' => $request->desc,
    ]);

    return redirect()->route('admin.about')->with(['success.up' => 'Sukses: '.$request->desc.' Added']);
  }

  public function delete($id)
  {
    $delete = Abouts::findOrFail($id);
  	$delete->delete();

  	return redirect()->back()->with(['success.down' => 'success.up: '.$delete->desc.' Deleted!']);
  }

}
