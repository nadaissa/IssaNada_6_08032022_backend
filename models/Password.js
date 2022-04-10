require('dotenv').config();
const passwordValidation = require('password-validator');

const passwordSchema = new passwordValidation();

passwordSchema
.is().min(10)                                    
.is().max(64)                                  
.has().uppercase()                              
.has().lowercase()                             
.has().digits()                                
.has().not().spaces()                    

module.exports = passwordSchema;