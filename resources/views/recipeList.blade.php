@extends("layouts.recipeLayout")
@section("content")
<div class = "main-wrapper">
    <div class="recipe-search-bar">
        <input type="text" action=>Search recipe</input>
    </div>
    <div class="recipe-search-results">
        <div class="recipe-card">
            <div class="recipe-card-title">
                <p>{{$cardTitle}}</p>
            </div>
            <div class="recipe-card-image">
                <img src={{$imageSource}} alt="">
            </div>
            <div class="recipe-card-text">
                <p>{{$cardText}}</p>
                @if($cardText == "123")
                    <p>123</p>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection