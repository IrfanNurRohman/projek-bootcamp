<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Visitor;
use App\Contacts;
use App\Events;
use App\Principals;
use App\Visions;
use App\Abouts;
use App\Institutions;
use App\Gallerys;
use App\Blogs;
use App\Sliders;
use App\Teachers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdminController extends Controller
{
  public function adminform()
  {
    return view('admin.login');
  }

  public function adminLogin(Request $request)
  {
    $this->validate($request, [
      'email'   => 'required|email',
      'password' => 'required|min:6'
    ]);

    //$adminid = Auth::user()->id;
    $admin = Admin::where('email', $request->email)
            ->where('password', $request->password)->first();

    //dd($admin);
    if ($admin) {
      session(["login" => $admin->toArray()]);
      return redirect(route('admin.dashboard'));
    }

    else
    {
      return redirect(route('admin.login'))->with(['fail' => 'Gagal: Password atau email salah, silahkan cek kembali']);
    }
  }

  public function admin_dashboard()
  {
    $visitor = Visitor::latest()->paginate(5)->appends(request()->except('page'));
    $gallery_list = Gallerys::latest()->paginate(30)->appends(request()->except('page'));
    $artikel = Blogs::latest()->paginate(5)->appends(request()->except('page'));
    $tot_visitor = Visitor::count('id');
    $mailer = Contacts::latest()->paginate(5)->appends(request()->except('page'));
    $tot_mailer = Contacts::count('id');
    $tot_blogs = Blogs::count('id');
    $tot_gallery = Gallerys::count('id');

    return view('admin.dashboard', compact('artikel', 'visitor', 'gallery_list', 'tot_visitor', 'mailer',
    'tot_mailer', 'tot_blogs', 'tot_gallery'));
  }

  public function admin_visitor()
  {
    $visitor = Visitor::latest()->paginate(5)->appends(request()->except('page'));
    $tot_visitor = Visitor::count('id');
    return view('admin.visitor.index', compact('visitor', 'tot_visitor'));
  }

  public function admin_mailer()
  {
    $mailer = Contacts::latest()->paginate(5)->appends(request()->except('page'));
    $tot_mailer = Contacts::count('id');

    return view('admin.mailer.index', compact('mailer', 'tot_mailer'));
  }

  public function delete($id)
  {
    $delete = Contacts::findOrFail($id);
  	$delete->delete();

  	return redirect()->back()->with(['success.down' => 'success: '.$delete->desc.' Deleted!']);
  }

  public function admin_event()
  {
    $event = Events::latest()->paginate(5)->appends(request()->except('page'));

    return view('admin.event.index', compact('event'));
  }

  public function admin_principal()
  {
    $principal = Principals::latest()->paginate(5)->appends(request()->except('page'));

    return view('admin.principal.index', compact('principal'));
  }

  public function admin_vision()
  {
    $vision = Visions::latest()->paginate(5)->appends(request()->except('page'));

    return view('admin.vision.index', compact('vision'));
  }

  public function admin_about()
  {
    $about = Abouts::latest()->paginate(5)->appends(request()->except('page'));

    return view('admin.about.index', compact('about'));
  }

  public function admin_institutions()
  {
    $institutions = Institutions::latest()->paginate(5)->appends(request()->except('page'));

    return view('admin.institutions.index', compact('institutions'));
  }

  public function admin_gallery()
  {
    $galerys = Gallerys::latest()->paginate(5)->appends(request()->except('page'));

    return view('admin.galerys.index', compact('galerys'));
  }

  public function admin_blogs()
  {
    $blogs = Blogs::latest()->paginate(5)->appends(request()->except('page'));

    return view('admin.ablogs.index', compact('blogs'));
  }

  public function admin_slider()
  {
    $slider = Sliders::latest()->paginate(5)->appends(request()->except('page'));

    return view('admin.aslider.index', compact('slider'));
  }

  public function admin_teacher()
  {
    $teacher = Teachers::latest()->paginate(5)->appends(request()->except('page'));

    return view('admin.teacher.index', compact('teacher'));
  }

  public function logout(Request $request)
  {
    // Auth::logout();
    session(["login" => NULL]);
    return redirect()->route('index');
  }

}
