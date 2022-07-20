import {MemberService} from '../../service/member.service';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export function checkUsername(userName: MemberService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userName.checkUsername(control.value).pipe( map (
      (account: Account[]) => {
        return (account && account.length > 0) ? {checkUsername: true} : null;
      }
    ));
  };
}
