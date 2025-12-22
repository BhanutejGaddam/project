import { loginData } from "./login_data";
import { Injectable } from '@angular/core';
import { Observable, of, defer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class AuthenticationService{
    login$(role:string,email:string,password:string):Observable<boolean>{
        const normalizedEmail = String(email).trim().toLowerCase();
        const normalizedRole = String(role);
        const normalizedPassword = String(password);
        const matched=loginData.find((user)=>user.email===normalizedEmail && user.password===normalizedPassword && user.role===normalizedRole);
        return of(Boolean(matched)).pipe(
            tap((ok)=>{
                if(ok){
                    console.log("Credentials matched");
                    return true;
                }
                else{
                    console.log("Credentials not matched")
                    return false;
                }
            })
        );
    }

    // login(role:string,email:string,password:string){
    //     const normalizedEmail = String(email).trim().toLowerCase();
    //     const normalizedRole = String(role);
    //     const normalizedPassword = String(password);
    //     const matched=loginData.find((user)=>user.email===normalizedEmail && user.password===normalizedPassword && user.role===normalizedRole);
    //     if(matched){
    //         //console.log(matched);
    //         return true;
    //     }
    //     else{
    //         console.log("data not matched");
    //         return false;
    //     }
    // }
}