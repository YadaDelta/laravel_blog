<?php

namespace App\States\Post;

class Draft extends PostState
{
    protected static $name = 'draft';
}

class Published extends PostState
{
    protected static $name = 'published';
}
