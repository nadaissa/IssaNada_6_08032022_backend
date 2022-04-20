//general imports
require('dotenv').config();
//password-validaton method to prevent non-secure passwords
const passwordValidation = require('password-validator');

//Creating and defining password model and conditions
const passwordSchema = new passwordValidation();

passwordSchema
.is().min(10)   // Minimum length 10                                 
.is().max(64)     // Maximum length 64                             
.has().uppercase()    // Must have uppercase letters                          
.has().lowercase()      // Must have lowercase letters                        
.has().digits()      // Must have digits                       
.has().not().spaces()     // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values               

//password model export
module.exports = passwordSchema;