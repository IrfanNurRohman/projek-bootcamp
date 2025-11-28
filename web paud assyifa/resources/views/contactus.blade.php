@extends('layouts.app')
@section('content')
<!-- Start contact  -->
<section id="mu-contact">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="mu-contact-area">
         <!-- start title -->
         <div class="mu-title">
           <h2>Hubungi Kami</h2>
           <p>Tek statis</p>
           @if(session('success'))
               <div class="alert alert-success">
                 {!! session('success') !!}
               </div>
           @endif
         </div>
         <!-- end title -->
         <!-- start contact content -->
         <div class="mu-contact-content">
           <div class="row">
             <div class="col-md-6">
               <div class="mu-contact-left">
                 <form class="contactform" action="{{ route('contact.send') }}" method="POST">
                   @csrf
                   <p class="comment-form-author">
                     <label for="author">Name <span class="required">*</span></label>
                     <input type="text" name="name" required="required" size="30" value="" name="author">
                   </p>
                   <p class="comment-form-email">
                     <label for="email">Email <span class="required">*</span></label>
                     <input type="email" name="email" required="required" aria-required="true" value="" name="email">
                   </p>
                   <p class="comment-form-url">
                     <label for="subject">Subject</label>
                     <input type="text" name="subject">
                   </p>
                   <p class="comment-form-comment">
                     <label for="comment">Message</label>
                     <textarea required="required" aria-required="true" rows="8" cols="45" name="message"></textarea>
                   </p>
                   <p class="form-submit">
                     <input type="submit" value="Send Message" class="mu-post-btn" name="submit">
                   </p>
                 </form>
               </div>
             </div>
             <div class="col-md-6">
               <div class="mu-contact-right">
                   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109268.84973066079!2d108.75895643256206!3d-7.527608199999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6579186d5a920f%3A0x434d54944acaee2f!2sPAUD%20ASSYIFA!5e1!3m2!1sid!2sid!4v1647173887821!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
               </div>
             </div>
           </div>
         </div>
         <!-- end contact content -->
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End contact  -->
@endsection
