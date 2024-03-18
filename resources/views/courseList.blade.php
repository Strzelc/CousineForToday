@extends("layouts.layout")
@section("content")
<div class = "main-wrapper">
    <div class="course-card">
        <div class="course-card-title">
            <p>{{$cardTitle}}</p>
        </div>
        <div class="course-card-image">
            <img src={{$imageSource}} alt="">
        </div>
        <div class="course-card-text">
            <p>{{$cardText}}</p>
            @if($cardText == "123")
                <p>123</p>
            @endif
        </div>
    </div>
</div>
@endsection