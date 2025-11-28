<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'MenuController@index')->name('index');
Route::get('/vision-mission', 'MenuController@visi')->name('vision');
Route::get('/principals', 'MenuController@principals')->name('principals');
Route::get('/news', 'MenuController@news')->name('artikel');
Route::get('/read_news/{id}', 'MenuController@detail_news')->name('news.detail');
Route::get('/read_event/{id}', 'MenuController@detail_event')->name('event.detail');
Route::get('/gallery', 'MenuController@gallery')->name('gallery');
Route::get('/activities', 'MenuController@activities')->name('activities');
Route::get('/teacher', 'MenuController@teacher')->name('teacher');
Route::get('/contact', 'MenuController@contact')->name('contact');
Route::post('/contact', 'MenuController@send')->name('contact.send');

//lOGIN ADMIN ROUTES
Route::get('/login/admin', 'AdminController@adminform')->name('admin.login');
Route::post('/login/admin', 'AdminController@adminLogin')->name('admin.login');
Route::post('/logout', 'AdminController@logout')->name('admin.logout');

Route::get('/dummy', 'MenuController@dummy')->name('dummy');
// Route admin
Route::group(["middleware" => [\App\Http\Middleware\LoginSession::class]], function () {
    Route::get('/admin/dashboard', 'AdminController@admin_dashboard')->name('admin.dashboard');
    Route::get('/admin/visitor', 'AdminController@admin_visitor')->name('admin.visitor');
    Route::get('/admin/mailer', 'AdminController@admin_mailer')->name('admin.mailer');
    Route::delete('/admin/mailer/{id}', 'AdminController@delete')->name('admin.mailer.hapus');
    Route::get('/admin/event', 'AdminController@admin_event')->name('admin.event');
    Route::get('/admin/principal', 'AdminController@admin_principal')->name('admin.principal');
    Route::get('/admin/vision', 'AdminController@admin_vision')->name('admin.vision');
    Route::get('/admin/about', 'AdminController@admin_about')->name('admin.about');
    Route::get('/admin/institutions', 'AdminController@admin_institutions')->name('admin.institutions');
    Route::get('/admin/galerry', 'AdminController@admin_gallery')->name('admin.galery');
    Route::get('/admin/blogs', 'AdminController@admin_blogs')->name('admin.blogs');
    Route::get('/admin/sliders', 'AdminController@admin_slider')->name('admin.slider');
    Route::get('/admin/teacher', 'AdminController@admin_teacher')->name('admin.teacher');

    //CRUD EVENT
    Route::get('/admin/create-event', 'AdmineventController@create')->name('admin.event.create');
    Route::post('/admin/create-event', 'AdmineventController@store')->name('admin.event.store');
    Route::get('/admin/create-event-edit/{event:id}', 'AdmineventController@edit')->name('admin.event.edit');
    Route::post('/admin/create-event-edit/{event:id}', 'AdmineventController@update')->name('admin.event.update');
    Route::delete('/admin/create-event-delete/{id}', 'AdmineventController@delete')->name('admin.event.hapus');
    //END

    //CRUD principal
    Route::get('/admin/create-principal', 'AdminprincipalsController@create')->name('admin.principal.create');
    Route::post('/admin/create-principal', 'AdminprincipalsController@store')->name('admin.principal.store');
    Route::get('/admin/create-principal-edit/{principal:id}', 'AdminprincipalsController@edit')->name('admin.principal.edit');
    Route::post('/admin/create-principal-edit/{principal:id}', 'AdminprincipalsController@update')->name('admin.principal.update');
    Route::delete('/admin/create-principal-delete/{id}', 'AdminprincipalsController@delete')->name('admin.principal.hapus');
    //END

    //CRUD visi dan misi
    Route::get('/admin/create-vision-mission', 'AdminvisionController@create')->name('admin.vision.create');
    Route::post('/admin/create-vision-mission', 'AdminvisionController@store')->name('admin.vision.store');
    Route::get('/admin/create-vision-mission-edit/{principal:id}', 'AdminvisionController@edit')->name('admin.vision.edit');
    Route::post('/admin/create-vision-mission-edit/{principal:id}', 'AdminvisionController@update')->name('admin.vision.update');
    Route::delete('/admin/create-vision-mission-delete/{id}', 'AdminvisionController@delete')->name('admin.vision.hapus');
    //END

    //CRUD about
    Route::get('/admin/create-about', 'AdminaboutController@create')->name('admin.about.create');
    Route::post('/admin/create-about', 'AdminaboutController@store')->name('admin.about.store');
    Route::get('/admin/create-about-edit/{principal:id}', 'AdminaboutController@edit')->name('admin.about.edit');
    Route::post('/admin/create-about-edit/{principal:id}', 'AdminaboutController@update')->name('admin.about.update');
    Route::delete('/admin/create-about-delete/{id}', 'AdminaboutController@delete')->name('admin.about.hapus');
    //END

    //CRUD lembaga
    Route::get('/admin/create-institutions', 'AdmininstitutionsController@create')->name('admin.institutions.create');
    Route::post('/admin/create-institutions', 'AdmininstitutionsController@store')->name('admin.institutions.store');
    Route::get('/admin/create-institutions-edit/{principal:id}', 'AdmininstitutionsController@edit')->name('admin.institutions.edit');
    Route::post('/admin/create-institutions-edit/{principal:id}', 'AdmininstitutionsController@update')->name('admin.institutions.update');
    Route::delete('/admin/create-institutions-delete/{id}', 'AdmininstitutionsController@delete')->name('admin.institutions.hapus');
    //END

    //CRUD Gallerys
    Route::get('/admin/create-gallerys', 'AdmingalleryController@create')->name('admin.gallerys.create');
    Route::post('/admin/create-gallerys', 'AdmingalleryController@store')->name('admin.gallerys.store');
    Route::get('/admin/create-gallerys-edit/{gallerys:id}', 'AdmingalleryController@edit')->name('admin.gallerys.edit');
    Route::post('/admin/create-gallerys-edit/{gallerys:id}', 'AdmingalleryController@update')->name('admin.gallerys.update');
    Route::delete('/admin/create-gallerys-delete/{id}', 'AdmingalleryController@delete')->name('admin.gallerys.hapus');
    //END

    //CRUD Blogs
    Route::get('/admin/create-blogs', 'AdminblogsController@create')->name('admin.blogs.create');
    Route::post('/admin/create-blogs', 'AdminblogsController@store')->name('admin.blogs.store');
    Route::get('/admin/create-blogs-edit/{blogs:id}', 'AdminblogsController@edit')->name('admin.blogs.edit');
    Route::post('/admin/blogs-edit/{blogs:id}', 'AdminblogsController@update')->name('admin.blogs.update');
    Route::delete('/admin/create-blogs-delete/{id}', 'AdminblogsController@delete')->name('admin.blogs.hapus');

    Route::post('/summernote_upload', 'SummernoteController@store')->name('upload.image');
    Route::post('/summernote/delete', 'SummernoteController@destroy')->name('delete.image');
    //END

    //CRUD sldier
    Route::get('/admin/create-sliders', 'AdminsliderController@create')->name('admin.sliders.create');
    Route::post('/admin/create-sliders', 'AdminsliderController@store')->name('admin.sliders.store');
    //Route::get('/admin/create-blogs-edit/{sliders:id}', 'AdminblogsController@edit')->name('admin.blogs.edit');
    //Route::post('/admin/blogs-edit/{sliders:id}', 'AdminblogsController@update')->name('admin.blogs.update');
    Route::delete('/admin/create-sliders-delete/{id}', 'AdminsliderController@delete')->name('admin.sliders.hapus');
    //END

    //CRUD guru
    Route::get('/admin/create-teacher', 'AdminteacherController@create')->name('admin.teacher.create');
    Route::post('/admin/create-teacher', 'AdminteacherController@store')->name('admin.teacher.store');
    Route::get('/admin/create-teacher-edit/{teacher:id}', 'AdminteacherController@edit')->name('admin.teacher.edit');
    Route::post('/admin/create-teacher-edit/{teacher:id}', 'AdminteacherController@update')->name('admin.teacher.update');
    Route::delete('/admin/create-teacher-delete/{id}', 'AdminteacherController@delete')->name('admin.teacher.hapus');
    //END

});

