<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserMeeting;
use Illuminate\Support\Facades\Hash;
use DB;
class UserController extends Controller
{
    //
    function register(Request $req){

        $user = new User;
        $user -> name = $req->input('name');
        $user -> userid = $req->input('userid');
        $user -> password = Hash::make($req->input('password'));
        $user -> save();
        return $user;
    }

    function login(Request $req){

        $user = User::where('userid',$req->userid)->first();
        if(!$user || !Hash::check($req->password,$user->password)){
            return response([
                'error' => ["Invalid Credentials"]
            ]);
        }
        return $user;
    }

    function userList(){
        return User::all();
    }
    
    function schedulecall(Request $req){
        $userMeeting = new UserMeeting;
        $userMeeting -> useridA = $req -> input('useridA'); 
        $userMeeting -> useridB = $req -> input('useridB');
        $userMeeting -> meetingdate = $req -> input('meetingdate');
        $userMeeting -> meetingtime = $req -> input('meetingtime');
        $userMeeting -> save();
        return $userMeeting;
    }

    function getusermeetings($useridA){

        return UserMeeting::where('useridA',$useridA)->get();
    }

    function cancelmeeting($meetingid){
        $result= UserMeeting::where('meetingid',$meetingid)-> delete() ;
        if($result){
            return ["result"=> "Meeting cancelled successfully"];
        }

    }

    function getusermeetingsbymeetingid($meetingid){
        return UserMeeting::where('meetingid',$meetingid)->get();
    }

    function updateusermeeting($meetingid, Request $req){
   
        $userMeeting = DB :: table('user_meetings')
                    ->where('meetingid',$meetingid)
                    ->update(['meetingdate'=>  $req -> input('meetingdate'),
                    'meetingtime'=>  $req -> input('meetingtime')
                    ]);

    return $userMeeting;

    }

}
