function Validate(value){
    let spec_chars = ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", "\\", "|", 
                    ":", ";", "'", '""', "'", "<", ",", ">", "?", "/", "1","2","3","4","5","6","7","8","9","0"];
    for(let i=0; i < value.length; i++){
        for(let j=0; j < spec_chars.length; j++){
            if(value[i] === spec_chars[j]){
                return "Invalid input: no special characters or numbers allowed";
            }      
        }
    }
    return '';
}
export default Validate;