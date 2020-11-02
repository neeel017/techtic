<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\SurveyRequest;
use App\UserSurvey;
use Illuminate\Http\Request;
use Auth;

class SurveyController extends Controller
{
    //

    public function store(SurveyRequest $request)
    {
        try {
            $userId = Auth()->user()->id;
            $userSurvey = UserSurvey::where('user_id', $userId)->first();

            if ($userSurvey) {
                return response()->json(['message' => 'Your survey has already taken.'], 409);
            }
            
            $userSurvey = $request->all();
            $userSurvey['user_id'] = $userId;
            $userSurvey['next_seminar_on'] = json_encode($request->next_seminar_on);

            UserSurvey::create($userSurvey);

            return response()->json(['message' => 'Thank you for filling out information!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 501);
        }
    }
}
