import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class DateValidator extends Validators{

  static dobValidator(fdValue: FormControl){
     const date = fdValue.value;
     //console.log('x : ' + date );
     if (date === null || date ===''){
        console.log('x : ' + date );
         return true;
     }else{
        console.log('x : ' + date );
        return false;
     } 

   
   }
 
    static ToDateValidator(todValue: FormControl) {
     const date = todValue.value;
    
     if (date ===null || date===''){
         return true;
     } 
     return false;
   
   }
 }