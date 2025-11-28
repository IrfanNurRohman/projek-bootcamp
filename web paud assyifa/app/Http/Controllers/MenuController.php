<?php

namespace App\Http\Controllers;

use App\Visitor;
use App\Contacts;
use App\Admin;
use App\Events;
use App\Principals;
use App\Visions;
use App\Abouts;
use App\Institutions;
use App\Gallerys;
use App\Blogs;
use App\Sliders;
use App\Teachers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use App\Mail\ContactUs;
use Illuminate\Support\Facades\Mail;

use Illuminate\Support\Facades\App;

class MenuController extends Controller
{

  public function index()
  {
    $slider = Sliders::latest()->paginate(10)->appends(request()->except('page'));
    $tot_visitor = Visitor::count('id');
    $tot_gallery = Gallerys::count('id');
    $tot_blogs = Blogs::count('id');
    $tot_teacher = Teachers::count('id');
    $principal = Principals::latest()->paginate(10)->appends(request()->except('page'));
    $vision = Visions::latest()->paginate(10)->appends(request()->except('page'));
    $institutions = Institutions::latest()->paginate(10)->appends(request()->except('page'));

    $event = Events::latest()->paginate(5)->appends(request()->except('page'));

    $ip = $_SERVER['REMOTE_ADDR'];
		$ua = $_SERVER['HTTP_USER_AGENT'];

		Visitor::firstOrCreate([
    		'ip_address' => $ip,
    		'url' => URL::current(),
    		'user_agent' => $ua,
	  ]);

    return view("index", compact('event', 'slider', 'tot_visitor', 'tot_gallery',
    'tot_blogs', 'tot_teacher', 'principal', 'institutions', 'vision'));
  }

  public function principals()
  {
    $principal = Principals::latest()->paginate(10)->appends(request()->except('page'));

    $ip = $_SERVER['REMOTE_ADDR'];
		$ua = $_SERVER['HTTP_USER_AGENT'];

		Visitor::firstOrCreate([
    		'ip_address' => $ip,
    		'url' => URL::current(),
    		'user_agent' => $ua,
	  ]);

    return view("principals", compact('principal'));
  }

  public function visi()
  {
    $visimisi = Visions::latest()->paginate(5)->appends(request()->except('page'));

    $ip = $_SERVER['REMOTE_ADDR'];
		$ua = $_SERVER['HTTP_USER_AGENT'];

		Visitor::firstOrCreate([
    		'ip_address' => $ip,
    		'url' => URL::current(),
    		'user_agent' => $ua,
	  ]);

    return view("visi", compact('visimisi'));
  }
  public function about()
  {
    $about = Abouts::latest()->paginate(5)->appends(request()->except('page'));

    $ip = $_SERVER['REMOTE_ADDR'];
		$ua = $_SERVER['HTTP_USER_AGENT'];

		Visitor::firstOrCreate([
    		'ip_address' => $ip,
    		'url' => URL::current(),
    		'user_agent' => $ua,
	  ]);

    return view("about", compact('about'));
  }

  public function news()
  {
    $blog = Blogs::latest()->paginate(10)->appends(request()->except('page'));

    $ip = $_SERVER['REMOTE_ADDR'];
		$ua = $_SERVER['HTTP_USER_AGENT'];

		Visitor::firstOrCreate([
    		'ip_address' => $ip,
    		'url' => URL::current(),
    		'user_agent' => $ua,
	  ]);

    return view("news", compact('blog'));
  }

  public function detail_news($id)
  {
    $blog = Blogs::find($id)->where('id', $id)->first();
    $related = Blogs::inRandomOrder()->limit(5)->get();

    $ip = $_SERVER['REMOTE_ADDR'];
		$ua = $_SERVER['HTTP_USER_AGENT'];

		Visitor::firstOrCreate([
    		'ip_address' => $ip,
    		'url' => URL::current(),
    		'user_agent' => $ua,
	  ]);

    return view("read", compact('blog', 'related'));
  }

  public function gallery()
  {
    $random_gallery = Gallerys::inRandomOrder()->paginate(10)->appends(request()->except('page'));

    $ip = $_SERVER['REMOTE_ADDR'];
		$ua = $_SERVER['HTTP_USER_AGENT'];

		Visitor::firstOrCreate([
    		'ip_address' => $ip,
    		'url' => URL::current(),
    		'user_agent' => $ua,
	  ]);

    return view("gallery", compact('random_gallery'));
  }

  public function activities()
  {
    $activities = Events::latest()->paginate(10)->appends(request()->except('page'));
    
    $ip = $_SERVER['REMOTE_ADDR'];
		$ua = $_SERVER['HTTP_USER_AGENT'];

		Visitor::firstOrCreate([
    		'ip_address' => $ip,
    		'url' => URL::current(),
    		'user_agent' => $ua,
	  ]);

    return view("activities", compact('activities'));
  }

  public function detail_event($id)
  {
    $event = Events::find($id)->where('id', $id)->first();
    $related = Events::inRandomOrder()->limit(5)->get();

    $ip = $_SERVER['REMOTE_ADDR'];
		$ua = $_SERVER['HTTP_USER_AGENT'];

		Visitor::firstOrCreate([
    		'ip_address' => $ip,
    		'url' => URL::current(),
    		'user_agent' => $ua,
	  ]);

    return view("readevent", compact('event', 'related'));
  }

  public function teacher()
  {
    $teacher = Teachers::latest()->paginate(20)->appends(request()->except('page'));

    $ip = $_SERVER['REMOTE_ADDR'];
		$ua = $_SERVER['HTTP_USER_AGENT'];

		Visitor::firstOrCreate([
    		'ip_address' => $ip,
    		'url' => URL::current(),
    		'user_agent' => $ua,
	  ]);

    return view("teacher", compact('teacher'));
  }

  public function contact()
  {
    $ip = $_SERVER['REMOTE_ADDR'];
		$ua = $_SERVER['HTTP_USER_AGENT'];

		Visitor::firstOrCreate([
    		'ip_address' => $ip,
    		'url' => URL::current(),
    		'user_agent' => $ua,
	  ]);

    return view("contactus");
  }

  public function send(Request $request)
  {
    $sender = [
  		'name' => $request->name,
  		'email' => $request->email,
  		'subject' => $request->subject,
  		'message' => $request->message,
	  ];

    Contacts::firstOrCreate([
      'name' => $request->name,
      'email' => $request->email,
      'subject' => $request->subject,
      'message' => $request->message,
	  ]);

    Mail::to("admin@paudassyifa.my.id")->send(new ContactUs($sender));

    return back()->with('success', 'Thank you for contact us!');
  }

  public function dummy() {
    return view('dummy');
  }

}
