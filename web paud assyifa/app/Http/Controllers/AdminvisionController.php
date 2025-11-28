<?php

namespace App\Http\Controllers;

use App\Visions;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdminvisionController extends Controller
{
  public function create(Request $request)
  {
    return view('admin.vision.create');
  }

  public function store(Request $request)
  {
    $this->validate($request, [
			'vision' => 'required|min:5|max:255',
      'mision' => 'required|min:5|max:255',
		]);

		Visions::create([
			'vision' => $request->vision,
      'mision' => $request->mision,
		]);

    return redirect()->route('admin.vision')->with(['success.up' => 'Sukses: '.$request->vision.' Added']);
  }

  public function edit($id)
  {
    $vision = Visions::find($id);

    return view('admin.vision.edit', compact('vision'));
  }

  public function update(Request $request, $id)
  {
    //dd(1);
    $this->validate($request, [
			'vision' => 'required|min:5|max:255',
      'mision' => 'required|min:5|max:255',
		]);

    $vision = Visions::findOrFail($id);

    $vision->update([
      'vision' => $request->vision,
      'mision' => $request->mision,
    ]);

    return redirect()->route('admin.vision')->with(['success.up' => 'Sukses: '.$request->vision.' Added']);
  }

  public function delete($id)
  {
    $delete = Visions::findOrFail($id);
  	$delete->delete();

  	return redirect()->back()->with(['success.down' => 'success.up: '.$delete->vision.' Deleted!']);
  }

}
