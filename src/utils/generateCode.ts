export const generateConfirmCode = () =>{
    return Math.floor(100 + Math.random() * 900).toString();
}